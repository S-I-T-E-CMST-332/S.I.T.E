let account = require('../models/users');
let Client = require('../models/client');
const { check, validationResult } = require('express-validator');
let bcrypt = require('bcrypt');
let saltRounds = 10;
let uniqid = require('uniqid');
let salt = bcrypt.genSaltSync(saltRounds);
let session = require('express-session');
let async = require('async');

exports.get_clinicians = function(req, res, next){
  account.find({'flag':false})
    .exec(function(err, clinician_list){
      if(err){return next(err);}
      res.render('clinicians/clinicians', {clinician_list:clinician_list});
    });
}

exports.get_add_user = function(req, res, next){
  account.find({'flag':true})
    .exec(function(err, supervisor_list){
      if(err){return next(err);}
      res.render('clinicians/add-clinician/add_clinician', {supervisors: supervisor_list});
    });
}

exports.get_clinician_profile = function(req, res, next){
  account.findById(req.params.clinician_id)
    .exec(function(err, clinician){
      if(err){return next(err);}
      res.render('clinicians/clinician\ profile/profile', {clinician: clinician});
    });
}

exports.get_edit_clinician = function(req, res, next){
  account.findById(req.params.clinician_id)
    .exec(function(err, clinician){
      if(err){return next(err);}
      res.render('clinicians/clinician\ profile/edit/edit', {clinician: clinician});
    });
}

exports.get_delete_clinician = function(req, res, next){
  account.findById(req.params.clinician_id)
    .exec(function(err, clinician){
      if(err){return next(err);}
      Client.find({"user_id": clinician.user_id})
        .exec(function(err, client){
          if(err){return next(err);}
          console.log(client);
          res.render('clinicians/clinician\ profile/delete/delete', {clients: client, clinician: clinician});
        });
    });
}

exports.get_progress_overview = function(req, res, next){
  res.render('clients/client\ profile/progress/overview');
}

exports.create_user = [
  check('username').isLength({min: 1}).withMessage('Please enter your username').isAlphanumeric().withMessage('Must be alphanumeric'),
  check('password').isLength({min: 1}).withMessage('Please enter your password'),
  check('fname').isLength({min: 1}).withMessage('Please enter your first name').isAlphanumeric().withMessage('Must be alphanumeric'),
  check('lname').isLength({min: 1}).withMessage('Please enter your last name').isAlphanumeric().withMessage('Must be alphanumeric'),
  check('phone').isLength({min: 12, max: 12}).withMessage('Please enter your phone number (eg. 555-123-4567)'),
  check('email').isEmail().normalizeEmail().withMessage('Please enter your email (eg. example@domain.com)'),
  //sanitize
  check('username').trim().escape(),
  check('password').trim().escape(),
  check('fname').trim().escape(),
  check('lname').trim().escape(),
  check('phone').trim().escape(),
  check('email').trim().escape(),
  (req, res, next) =>{
    const errors = validationResult(req);

    account.find({"username": req.body.username})
      .exec(function(err, user){
        if(err){return next(err);}
        if(user !== null){res.render('clinicians/add-clinician/add_clinician'), {error: "Username is taken", supervisors: req.body.supervisors}}
      });
    if (!errors.isEmpty()){
      res.render('clinicians/add-clinician/add_clinician', {errors: errors.array()});
      return;
    }else{
      let newUser = new account(
        {
          user_id: uniqid(),
          supervisor_id: req.body.flag ? uniqid() : req.body.supervisor,//This ideally checks if the person being created is a supervisor. If they aren't, they should inherit the supervisor_id. Otherwise, it creates a supervisor id for them.
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password, salt),
          fname: req.body.fname,
          lname: req.body.lname,
          phone: req.body.phone,
          email: req.body.email,
          flag: req.body.flag ? true : false,//Checkbox for supervisor or not
        });
      newUser.save(function (err){
        if (err){return next(err); }
        next();
      });
    }
  }
];

exports.edit_user = [
  check('username').isLength({min: 1}).withMessage("Please enter a username").isAlphanumeric().withMessage("Letters or numbers only"),
  check('fname').isLength({min: 1}).withMessage("Please enter your first name").isAlphanumeric().withMessage("Letters or numbers only"),
  check('lname').isLength({min: 1}).withMessage("Please enter your last name").isAlphanumeric().withMessage("Letters or numbers only"),
  check('phone').isLength({min: 12, max: 12}).withMessage("Please enter your phone number (eg. 555-123-4567)"),
  check('email').isEmail().normalizeEmail().withMessage('Please enter your email (eg. example@domain.com)'),
  check('username').trim().escape(),
  check('fname').trim().escape(),
  check('lname').trim().escape(),
  check('phone').trim().escape(),
  check('email').trim().escape(),
  check('password').trim().escape(),
  (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.render('clinicians/clinician\ profile/edit/edit', {username: req.body.username, fname: req.body.fname, lname: req.body.lname, phone: req.body.phone, email: req.body.email, errors: errors.array()});
      return;
    }
    if(req.body.password == ''){
      let newUser = new account({
        _id: req.params.clinician_id,
        user_id: req.session.user_id,
        supervisor_id: req.session.supervisor_id,
        username: req.body.username,
        password: account.findById(req.params.clinician_id).password,
        fname: req.body.fname,
        lname: req.body.lname,
        phone: req.body.phone,
        email: req.body.email
      });
      account.findByIdAndUpdate(req.params.clinician_id, newUser, {new: true}, function(err){
        if (err){return next(err);}
        res.redirect('/clinicians');
      });
    }else{
      let newUser = new account({
        _id: req.params.clinician_id,
        user_id: req.session.user_id,
        supervisor_id: req.session.supervisor_id,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt),
        fname: req.body.fname,
        lname: req.body.lname,
        phone: req.body.phone,
        email: req.body.email
      });
      account.findByIdAndUpdate(req.params.clinician_id, newUser, {new: true}, function(err){
        if (err){return next(err);}
        res.redirect('/clinicians');
      });
    }
  }
];

exports.delete_clinician = function(req, res, next){
  account.findById(req.params.clinician_id)
    .exec(function(err, clinaccount){
      if(err){return next(err);}
      Client.find({"user_id": clinaccount.user_id})
        .exec(function(err, clients){
          if(err){return next(err);}
          if(clients.length > 0){
            res.render("clinicians/clinician\ profile/delete/delete", {error: "This person has clients. Please delete them first"});
          }else{
            account.findByIdAndDelete(req.params.clinician_id, function deleteClinician(err){
              if(err){return next(err);}
              res.redirect('/clinicians');
          });
        }
      });
    });
  }