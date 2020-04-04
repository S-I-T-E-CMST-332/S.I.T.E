let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let FormSchema = new Schema(
    {
        form_id: {type: Number, required: true},
        letter_id: {type: Schema.objectId, required: true}
    }
);

module.exports = mongoose.model('form', FormSchema);