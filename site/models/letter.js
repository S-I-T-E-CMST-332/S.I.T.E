var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LetterSchema = new Schema(
    {
        letter_id: {type: Number, required: true},
        session_id: {type: Number, required: true}
    }
);

module.exports = mongoose.model('letter', LetterSchema);