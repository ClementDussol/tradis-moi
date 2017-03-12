let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let wordSchema = new Schema({
	word : String,
	difficulty : Number,
})

let Word = mongoose.model('Word', wordSchema);

module.exports = Word;