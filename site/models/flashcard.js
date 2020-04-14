let mongoose = require('mongoose');

let Schema = mongoose.Schema;


let FlashcardSchema = new Schema(
    {
        flashcard_id: {type: Number, required: true},
        form_id: {type: Schema.Types.ObjectId, ref: 'form', required: true}
    }
);

module.exports = mongoose.model('flashcard', FlashcardSchema);