let express   = require('express');
let mongoose  = require('mongoose');
let Word 	  = require('./model/word.js');
let translate = require('google-translate-api');

let app = express();

mongoose.connect('mongodb://user:user@ds127730.mlab.com:27730/tradis-moi');

app.listen(8080);
app.use(express.static(__dirname + '/public'));

console.log("App listening on port 8080");

// requête pour récupérer un mot aléatoire dans la base et le traduire.
app.get('/getword/:dif', (req, res) => {
	
	let d = req.params.dif;

	Word.count({difficulty : d}).exec((err, count) => {

		var random = Math.floor(Math.random() * count);

		Word.findOne({difficulty : d}).skip(random).exec((err, result) => {

			let r = {
				french : result.word.toUpperCase(),
				difficulty : result.difficulty
			}
			
			
	    	translate(result.word, {to: 'en'}).then(translation => {
				
				r.english = translation.text.toUpperCase();
				res.send(r);
			
			}).catch(err => {
			    console.error(err);
			});

		});
	});
});