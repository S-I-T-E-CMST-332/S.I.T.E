let mongoose = require('mongoose');
let session = require('session');
let Schema = mongoose.Schema;

let LetterSchema = new Schema(
    {
        letter_id: {type: Number, required: true},
        session_id: {type: Number, required: true}
    }
);

module.exports = mongoose.model('letter', LetterSchema);