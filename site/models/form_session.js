let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let SessFormSchema = new Schema(
    {
        form_id: {type: String, required: true},
        session_id: {type: String, required: true},
        correct: {type: Number, required: false},
        incorrect: {type: Number, required: false},
        kinda: {type: Number, required: false},
    }
);

SessFormSchema
.virtual('total')
.get(function(){
    return this.correct + this.incorrect + this.kinda;
});

module.exports = mongoose.model('sess_forms', SessFormSchema);