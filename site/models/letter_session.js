let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let SessLetterSchema = new Schema(
    {
        letter_id: {type: String, required: true},
        session_id: {type: String, required: true},
        correct: {type: Number, required: false},
        incorrect: {type: Number, required: false},
        kinda: {type: Number, required: false}
    }
);

SessLetterSchema
.virtual('total')
.get(function(){
  return this.correct + this.incorrect + this.kinda;
});

module.exports = mongoose.model('sess_letter', SessLetterSchema);