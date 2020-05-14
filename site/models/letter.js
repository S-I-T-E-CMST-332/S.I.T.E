let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let LetterSchema = new Schema(
    {
        letter_id: {type: String, required: true},
    }
);

LetterSchema
.virtual('name')
.get(function(){
  return this.letter_id;
});

module.exports = mongoose.model('letter', LetterSchema);