let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let SupervisorSchema = new Schema({
    supervisor_id: {type: Number, required: true},
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true}
});

module.exports = mongoose.model('supervisor', SupervisorSchema);