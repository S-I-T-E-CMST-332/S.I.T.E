let mongoose = require("mongoose");
let clinician = require("./clinician");

let Schema = mongoose.Schema;

let ClientSchema = new Schema({
    client_id: {type: Number, required: true},
    clinician_id: {type: Schema.objectId, required: true},
    dob: {type: String, required: true},
    fname: {type: String, required: true},
    lname: {type: String, required: true}
})