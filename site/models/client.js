let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ClientSchema = new Schema({
    client_id: {type: Number, required: true},
    user_id: {type: Schema.ObjectId, required: true},
    dob: {type: Date, required: true},
    fname: {type: String, required: true},
    lname: {type: String, required: true}
});

ClientSchema
.virtual('name')
.get(function(){
  return this.fname + " " + this.lname;
});

ClientSchema
.virtual('fname')
.get(function(){
  return this.fname;
});

ClientSchema
.virtual('lname')
.get(function(){
  return this.lname;
});

module.exports = mongoose.model('client', ClientSchema);