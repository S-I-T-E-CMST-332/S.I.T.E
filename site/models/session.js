let mongoose = require("mongoose");
let client = require("./client");

let Schema = mongoose.Schema;

let SessionSchema = new Schema({
    session_id: {type: Number, required: true},
    client_id: {type: Schema.ObjectId, required: true},
    date: {type: String, required: true}
})