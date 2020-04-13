let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let SessionSchema = new Schema({
    session_id: {type: Number, required: true},
    client_id: {type: Schema.ObjectId, required: true},
    date: {type: Date, required: true}
});

SessionSchema
.virtual('date')
.get(function(){
  return this.date;
});

module.exports = mongoose.model('session', SessionSchema);