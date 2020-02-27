let mongoose = require("mongoose");
let clinician = require("./clinician");
let supervisor = require("./supervisor");

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    supervisor_id: {type: Schema.ObjectId, required: true},
    clinician_id: {type: Schema.ObjectId, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model('users', UserSchema);