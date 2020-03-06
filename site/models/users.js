let mongoose = require("mongoose");
let clinician = require("./clinician");
let supervisor = require("./supervisor");

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    user_id: {type: Integer, required: true},
    supervisor_id: {type: Integer, required: false},
    username: {type: String, required: true},
    password: {type: String, required: true},
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    flag: {type: Boolean, required: true}
});

module.exports = mongoose.model('users', UserSchema);