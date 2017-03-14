let App = {
	
	ready : false,

	score : 10,
	
	currentDifficulty : 2,
	maxDiffulty : 5,

	currentRound : null,
	roundHistory : [],

	init(){
		this.UI.init();
	},

	start(){

		this.newRound(this.currentDifficulty);
	},

	// lorsque l'utilisateur saisis quelque chose
	onInputChange(){
		
		// gestion de l'UI
		this.UI.onInputChange();
		
		let round  = this.currentRound;
		let input  = this.getInput();
		let answer = round.english;
		
		// si la taille de la saisie correspond à la taille de la réponse
		if (input.length == answer.replace(/\s+/g, '').length) {

			// on compare les resultats, si ils sont égaux : le round est gagné; sinon : le round est perdu
			if (this.isInputValid()) this.onRoundWin(round);
			else this.onRoundLoose(round);

			// fin du round
			this.onRoundEnd();
			
			// si le score est égal à 20 ou 0 : fin du jeu
			if (this.score == 20 || this.score == 0) {
				this.onGameEnd();
			// sinon : nouveau round
			} else {
				this.newRound(this.currentDifficulty);
			}
		}
	},

	newRound(difficulty){
		
		// requête et instanciation du round
		this.fetchWord(difficulty, (data)=>{
			
			let round = new Round(data.french, data.english, data.difficulty);
			this.currentRound = round;
			this.onRoundReady(round);
		})
		// déclenchement de l'évènement 'onNewRound'
		this.onNewRound();

	},

	// requête ajax pour récupérer un mot aléatoire et sa traduction
	fetchWord(difficulty, callback) {
		$.get('/getword/'+difficulty, (data) => {
			callback(data);
		})
	},

	onNewRound(){
		this.ready = false;
		this.UI.onNewRound();
	},

	onRoundReady(round){
		this.currentRound = round;
		this.UI.onRoundReady(round);
	},

	onRoundEnd(round){
		// ajout du round à l'historique
		this.roundHistory.push(this.currentRound);
		this.UI.onRoundEnd();
	},

	// quand le round est gagné : gestion du score et de la difficulté
	onRoundWin(round){
		
		this.score ++;
		
		if (this.currentDifficulty < this.maxDiffulty) {
			this.currentDifficulty ++;
		}

		round.resolve(true, this.getInput());
		this.UI.onRoundWin();
	},
	
	// quand le round est gagné : gestion du score et de la difficulté
	onRoundLoose(round){
		
		this.score --;
		
		if (this.currentDifficulty > 1) {
			this.currentDifficulty --;
		}

		round.resolve(false, this.getInput());
		this.UI.onRoundLoose();
	},

	// manipulation et renvoi de la saisie utilisateur
	getInput(){
		let r = this.currentRound.english.charAt(0) + this.UI.$inputElement.val();
		let len = this.currentRound.english.length;
		r = r.substring(0, len);
		return r.toUpperCase();
	},

	// compare la saisie à la réponse et revoie true si elle est correcte, sinon false
	isInputValid(){
		return this.getInput().replace(/\s+/g, '') == this.currentRound.english.replace(/\s+/g, '');
	},

	// fin du jeu
	onGameEnd(){
		this.ready = false;
		this.currentRound = null;
		this.UI.onGameEnd();
	},

	// Objet séparé pour la gestion de l'interface
	UI : {

		init(){
			
			// au clic sur le bouton "play"
			$('#play').on('click', ()=>{

				// cache les règles du jeu et le bouton "play"
				$('#rules').fadeOut(200); 
				$('#play' ).fadeOut(200, ()=>{
					// affiche l'interface
					$('#word' ).fadeIn();
					$('#score').fadeIn();
					$('#input').fadeIn(()=>{
						// lance le jeu quand les animations sont terminées
						App.start();
					});
				});
			});

			//affiche le score
			this.updateScore();
			
			// création d'une balise input cachée pour la gestion de la saisie utilisateur
			let $hiddenContainer = $('<div>').css(
				{
					'width':'0px', 
					'height':'0px', 
					'overflow':'hidden'
				}
			).appendTo('#input');

			this.$inputElement = $('<input>').attr('type', 'text').appendTo($hiddenContainer).focus();

			// gestion du focus
			this.$inputElement.on('focusout', (e)=>{
				$(this).focus();
			})
			$('body').on('keydown', (e)=>{
				this.$inputElement.focus()
			});

			// lorsque l'utilisateur saisis un caractère
			$('body').on('keyup', (e)=>{
				
				// si le jeu n'est pas prêt : annulation
				if (!App.ready) { this.$inputElement.val(''); return; }
				
				// sinon : traitement de la saisie
				this.$inputElement.val(this.$inputElement.val().replace(/\s+/g, ''));
				App.onInputChange();
			})

			// remove and save sample UI elements
			this.$sampleLetter  = $('#input .letter' ).detach();
			this.$sampleSpace   = $('#input .space'  ).detach();
			this.$sampleHistory = $('#history .entry').detach();
		},

		// traitement de la saisie
		onInputChange(){
			
			let len = $('#input .letter').length;
			let newInput = App.getInput().replace(/\s+/g, '');;
			
			for (let i = 1; i < len; i++) {
				
				let $letter = $('#input .letter').eq(i); 
				let newC = newInput.charAt(i) || null;
				let curC = $letter.text();

				if (newC != curC) {
					
					if (newC) $letter.text(newC);
					else $letter.html('&nbsp;');
				}
			}
		},

		// affichage du loader au début d'un round
		onNewRound(){
			$('#loader').fadeIn(100);
		},

		// quand le round est prêt
		onRoundReady(round){
			
			let fr = round.french;
			let en = round.english;

			this.$inputElement.focus();
			
			// on cache le loader
			$('#loader').fadeOut(100, () => {

				$('#word .content').text(fr);
			})

			// on cache les icones de feedback (correct ou incorrect)
			$('#win-icon, #loose-icon').fadeOut(1000).promise().done(() => {

				for (var i = 0; i < en.length; i++) {
					
					$letter = (en.charAt(i) == ' ') ? this.$sampleSpace.clone() : this.$sampleLetter.clone();
					$letter.css('display', 'none');
					$('#input').append($letter);
					$letter.fadeIn(100*i);

				};
				
				$('#input .letter').eq(0).text(round.english[0]);

				App.ready = true;
			});
			
			// cheat ;)
			console.log('Réponse : ' + round.english + ', Difficulté : ' + round.difficulty);
		},

		// affiche l'icone quand la réponse est correct
		onRoundWin(){
			$('#win-icon').show();
		},

		// affiche l'icone quand la réponse est incorrecte
		onRoundLoose(){
			$('#loose-icon').show();
		},

		// reinitialise l'interface en fin de round
		onRoundEnd(){
			
			$('#word .content').text('');
			$('#input .letter, #input .space').remove();
			this.$inputElement.val('');
			this.updateScore();

		},

		// affichage du score
		updateScore(){
			$('#score .content').text(App.score);
		},

		// quand le jeu est fini :
		onGameEnd(){

			// on cache le jeu
			$('#game').fadeOut(()=>{

				// on affiche le resultat (gagné ou perdu)
				if (App.score == 20) { $('.result.win').fadeIn(); }
				else if (App.score == 0) { $('.result.loose').fadeIn(); };

				// on affiche et remplit l'historique
				$('#history').fadeIn();
				
				for (let i = 0; i < App.roundHistory.length; i++) {
					
					let round  = App.roundHistory[i];
					let $entry = this.$sampleHistory.clone();

					$entry.children('.french').text(round.french);
					$entry.children('.english').text(round.english);
					$entry.children('.userInput').text(round.userInput).addClass(round.win ? 'green' : 'red');

					$entry.appendTo('#history');

					$entry.fadeIn(200*i);
				}
			});
		}
	}
}

App.init();