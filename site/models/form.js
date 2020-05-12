let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let FormSchema = new Schema(
    {
        form_id: {type: String, required: true},
        letter_id: {type: String, required: true}
    }
);

FormSchema
.virtual('name')
.get(function(){
    return this.form_id;
});

module.exports = mongoose.model('form', FormSchema);