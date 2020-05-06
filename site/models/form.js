let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let FormSchema = new Schema(
    {
        form_id: {type: Number, required: true},
        letter_id: {type: String, required: true},
        correct: {type: Number, required: false},
        incorrect: {type: Number, required: false},
        kinda: {type: Number, required: false}
    }
);

module.exports = mongoose.model('form', FormSchema);