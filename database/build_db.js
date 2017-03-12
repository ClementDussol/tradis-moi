let mongoose = require('mongoose');
let Word 	 = require('./../model/word.js');
let fs 		 = require('fs');
let async 	 = require('async');

// connect to database
mongoose.connect('mongodb://admin:admin@ds127730.mlab.com:27730/tradis-moi');

// drop collection content
Word.remove({}, (err) => { if (err) throw(err); });

// read file 'verbe.txt'
fs.readFile('./database/verbe.txt', 'utf8', function(err, data) {
	
	if (err) throw err;
	
	// split string into array
	let array = data.split('\n');
	let words = [];
	
	// format 500 first words
	for(let i = 0; i < 500; i++) {
		
		let str = array[i].trim();
		let dif = Math.ceil(Math.random()*5);
		
		let word = {word:str, difficulty:dif}

		words.push(word);
	}

	// save words
	Word.collection.insert(words, (err)=>{
		if (err) throw err; 
		console.log( words.length + ' elements saved !');
		process.exit();
	});

});
