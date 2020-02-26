var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FlashcardSchema = new Schema(
    {
        flashcard_id: {type: Number, required: true},
        form_id: {type: Number, required: true}
    }
);

module.exports = mongoose.model('flashcard', FlashcardSchema);