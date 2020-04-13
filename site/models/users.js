let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    user_id: {type: Number, required: true},
    supervisor_id: {type: Number, required: false},
    username: {type: String, required: true},
    password: {type: String, required: true},
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    flag: {type: Boolean, required: true}
});

UserSchema
.virtual('name')
.get(function(){
  return this.fname + " " + this.lname;
});

UserSchema
.virtual('username')
.get(function(){
  return this.username;
});

UserSchema
.virtual('fname')
.get(function(){
  return this.fname;
});

UserSchema
.virtual('lname')
.get(function(){
  return this.lname;
});

UserSchema
.virtual('phone')
.get(function(){
  return this.phone;
});

UserSchema
.virtual('email')
.get(function(){
  return this.email;
});

module.exports = mongoose.model('users', UserSchema);