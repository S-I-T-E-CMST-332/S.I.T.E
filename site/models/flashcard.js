let mongoose = require('mongoose');

let Schema = mongoose.Schema;


let FlashcardSchema = new Schema(
    {
        flashcard_id: {type: String, required: true},
        name: {type: String, required: true},
        form_id: {type: String, required: true},
        link: {type: String, required: true}
    }
);

module.exports = mongoose.model('flashcard', FlashcardSchema);