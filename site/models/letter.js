let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let LetterSchema = new Schema(
    {
        letter_id: {type: Number, required: true},
        session_id: {type: String, required: false},
        correct: {type: Number, required: false},
        incorrect: {type: Number, required: false},
        kinda: {type: Number, required: false}
    }
);

module.exports = mongoose.model('letter', LetterSchema);