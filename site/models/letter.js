let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let LetterSchema = new Schema(
    {
        letter_id: {type: String, required: true},
        session_id: {type: String, required: false},
        correct: {type: Number, required: false},
        incorrect: {type: Number, required: false},
        kinda: {type: Number, required: false}
    }
);

LetterSchema
.virtual('name')
.get(function(){
  return this.letter_id;
});

LetterSchema
.virtual('total')
.get(function(){
  return this.correct + this.incorrect + this.kinda;
});

module.exports = mongoose.model('letter', LetterSchema);