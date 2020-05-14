let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let LetterSchema = new Schema(
    {
        letter_id: {type: String, required: true},
    }
);

module.exports = mongoose.model('letter', LetterSchema);