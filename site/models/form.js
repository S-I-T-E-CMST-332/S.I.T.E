var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FormSchema = new Schema(
    {
        form_id: {type: Number, required: true},
        letter_id: {type: Number, required: true}
    }
);

module.exports = mongoose.model('form', FormSchema);