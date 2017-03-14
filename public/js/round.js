class Round {
	
	constructor(fr, en, diff) {
			
		this.french 	= fr;
		this.english 	= en;
		this.difficulty = diff;

	};

/*	init(){
		this.timer = setInterval(()=>{
			this.timeLeft--;
		}, 1000);
	}

	getTimeLeft(){
		return this.timeLeft;
	}
*/
	resolve(win, input){
		this.win = win;
		this.userInput = input;
	}
}