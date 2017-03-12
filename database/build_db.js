let mongoose  = require('mongoose');
let Word 	  = require('./../model/word.js');
let fs 		  = require('fs');
let translate = require('google-translate-api');
let async	  = require('async');

// connect to database
mongoose.connect('mongodb://admin:admin@ds127730.mlab.com:27730/tradis-moi');

// drop collection content
Word.remove({}, (err) => { if (err) throw(err); });

// read file 'verbe.txt'
fs.readFile('./database/verbe.txt', 'utf8', function(err, data) {
	
	if (err) throw err;
	
	// sépare la chaine de caractère en un tableau contenant tous les mots
	let array = data.split('\n');
	let words = [];

	let i = 0;

	async.until(
		// while (moins de 500 mots dans le tableau words) :
		()=>{
			return words.length >= 500;
		},
		// appel asynchrone pour vérifier si le mot dispose d'une traduction valide (fr != en) :
		(next) => {
			
			let str = array[i].trim();
			
			translate(str, {to: 'en'}).then(res => {
			    
			    console.log(str + ' => ' + res.text);

			    if (res.text.toLowerCase() != str.toLowerCase()) {
			    	
			    	console.log('is valid');
			    	
			    	let diff = Math.ceil(Math.random()*5);
			    	let word = str;

			    	let wObj = {word : word, difficulty : diff};
			    	
			    	words.push(wObj);
			    
			    } else {
			    	
			    	console.log('is not valid');
			    }
			    
			    i++;
			    next();
			
			}).catch(err => {
			    
			    console.error(err);
			    next();
			});
		},
		// lorsque tous les appels asynchrones sont résolus :
		(err) => {

			console.log('all words handled');

			// enregistre les mots dans la base de données
			Word.collection.insert(words, (err)=>{
				
				if (err) throw err; 
				console.log( words.length + ' elements saved !');
				process.exit();
			
			});
		}
	);
});
