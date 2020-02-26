let mongoose = require("mongoose");
let supervisor = require("./supervisor");

let Schema = mongoose.Schema;

let ClinicianSchema = new Schema({
    clinician_id: {type: Number, required: true},
    supervisor_id: {type: Schema.ObjectId, required: true},
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true}
});