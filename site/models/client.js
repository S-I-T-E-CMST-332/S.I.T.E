let mongoose = require("mongoose");
let moment = require('moment');

let Schema = mongoose.Schema;

let ClientSchema = new Schema({
    client_id: {type: String, required: true},
    user_id: {type: String, required: true},//This should be equal to a user's id that we're passing as a session variable
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
.virtual('firstname')
.get(function(){
  return this.fname;
});

ClientSchema
.virtual('lastname')
.get(function(){
  return this.lname;
});

ClientSchema
.virtual('formdate')
.get(function(){
  return moment(this.dob).utc().format('YYYY-MM-DD');
});

ClientSchema
.virtual('reportdate')
.get(function(){
  return moment(this.dob).utc().format('MM-DD-YYYY');
});

module.exports = mongoose.model('client', ClientSchema);