let mongoose = require("mongoose");
let client = require("./client");

let Schema = mongoose.Schema;

let SessionSchema = new Schema({
    session_id: {type: Integer, required: true},
    client_id: {type: Schema.ObjectId, required: true},
    date: {type: Date, required: true}
});

module.exports = mongoose.model('session', SessionSchema);