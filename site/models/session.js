let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let SessionSchema = new Schema({
    session_id: {type: Number, required: true},
    client_id: {type: Schema.Types.ObjectId, ref: 'client', required: true},
    date: {type: Date, required: true}
});

SessionSchema
.virtual('day')
.get(function(){
  return this.date;
});

module.exports = mongoose.model('session', SessionSchema);