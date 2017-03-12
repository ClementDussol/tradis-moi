let express  = require('express');
let mongoose = require('mongoose');
let Word = require('./model/word.js');

let app = express();

mongoose.connect('mongodb://admin:admin@ds127730.mlab.com:27730/tradis-moi');

app.listen(8080);
app.use(express.static(__dirname + '/public'));

console.log("App listening on port 8080");

app.get('/words', (req, res) => {
	
	Word.find((err, words) => {
		if (err) req.send(err);
		let a = res.json(words);
	})
});