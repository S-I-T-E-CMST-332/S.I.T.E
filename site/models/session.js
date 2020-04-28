let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let SessionSchema = new Schema({
    session_id: {type: Number, required: true},
    client_id: {type: Schema.Types.ObjectId, ref: 'client', required: true},
    date: {type: Date, required: true},
    correct: {type: Number, required: false},
    incorrect: {type: Number, required: false},
    kinda: {type: Number, required: false}
});

SessionSchema
.virtual('day')
.get(function(){
  return this.date;
});

module.exports = mongoose.model('session', SessionSchema);