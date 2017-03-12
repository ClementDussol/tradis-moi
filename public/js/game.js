let Game = {
	
	input : {},
	answer : '',

	init(){

		

		this.input = document.createElement('input');
		
		let input = this.input;
		
		this.input.onkeypress = (e) => {
			console.log(input.value)
		}

		document.body.appendChild(this.input);
		this.input.focus();
	},
	
	update(){

	},

	isInputValid(){
		return (this.input.toUpperCase() == this.answer.toUpperCase());
	} 
}

Game.init();