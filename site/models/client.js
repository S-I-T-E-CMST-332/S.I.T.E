let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ClientSchema = new Schema({
    client_id: {type: Integer, required: true},
    user_id: {type: Schema.objectId, required: true},
    dob: {type: Date, required: true},
    fname: {type: String, required: true},
    lname: {type: String, required: true}
});

module.exports = mongoose.model('client', ClientSchema);