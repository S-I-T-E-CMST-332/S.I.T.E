let mongoose = require("mongoose");
let moment = require('moment');

let Schema = mongoose.Schema;

let SessionSchema = new Schema({
    session_id: {type: String, required: true},
    client_id: {type: String, required: true},
    date: {type: Date, required: true},
    correct: {type: Number, required: false},
    incorrect: {type: Number, required: false},
    kinda: {type: Number, required: false}
});

SessionSchema
.virtual('day')
.get(function(){
  return moment(this.date).utc().format('MM-DD-YYYY');
});

SessionSchema
.virtual('total')
.get(function(){
  return this.correct + this.incorrect + this.kinda;
});

module.exports = mongoose.model('session', SessionSchema);