let mongoose = require('mongoose');
let form = require('./form');
let Schema = mongoose.Schema;


let FlashcardSchema = new Schema(
    {
        flashcard_id: {type: Number, required: true},
        form_id: {type: Schema.objectId, required: true}
    }
);

module.exports = mongoose.model('flashcard', FlashcardSchema);