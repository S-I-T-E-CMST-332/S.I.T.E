let mongoose = require('mongoose');

let Schema = mongoose.Schema;


let FlashcardSchema = new Schema(
    {
        flashcard_id: {type: String, required: true},
        name: {type: String, required: true},
        form_id: {type: String, required: true},
        link: {type: String, required: true}//This needs to be the relative location of the image uploaded
    }
);

module.exports = mongoose.model('flashcard', FlashcardSchema);