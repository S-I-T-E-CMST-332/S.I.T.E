let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let LetterSchema = new Schema(
    {
        letter_id: {type: Number, required: true},
        session_id: {type: Schema.Types.ObjectId, ref: 'sessions', required: true}
    }
);

module.exports = mongoose.model('letter', LetterSchema);