let passport = require('passport');
let account = require('../models/users'); //Called this account because passport uses the term user
let Client = require('../models/client');
const { check, validationResult } = require('express-validator');
let bcrypt = require('bcrypt');
let uniqid = require('uniqid');

exports.get_clinicians = function(req, res, next){
  account.find()
    .exec(function(err, clinician_list){
      if(err){return next(err);}
      res.render('clinicians/clinicians', clinician_list);
    })
}

exports.get_add_user = function(req, res, next){
  res.render('clinicians/add-clinician/add_clinician');
}

exports.get_clinician_profile = function(req, res, next){
  res.render('clinicians/clinician\ profile/profile');
}

exports.get_edit_clinician = function(req, res, next){
  res.render('clinicians/clinician\ profile/edit/edit');
}

exports.get_delete_clinician = function(req, res, next){
  res.render('clinicians/clinician\ profile/delete/delete');
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
    if (!errors.isEmpty()){
      //we have to rerender the create page, as there were errors
      return;
    }else{
      let newUser = new account(
        {
          user_id: uniqid(),
          supervisor_id: req.body.flag ? uniqid() : supervisor_id,//This ideally checks if the person being created is a supervisor. If they aren't, they should inherit the supervisor_id. Otherwise, it creates a supervisor id for them.
          username: req.body.username,
          password: generatehash(req.body.password),
          fname: req.body.fname,
          lname: req.body.lname,
          phone: req.body.phone,
          email: req.body.email,
          flag: req.body.flag //Checkbox for supervisor or not
        });
      newUser.save(function (err){
        if (err){return next(err); }
        res.redirect('/clinicians/clinician-profile');
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
  (req, res, next) =>{
    let newUser = new account({
      username: req.body.username,
      fname: req.body.fname,
      lname: req.body.lname,
      phone: req.body.phone,
      email: req.body.email
    });
    account.findByIdAndUpdate(req.params.id, newUser, function(err){
      if (err){return next(err);}
      res.redirect('/clinicians/clinician-profile');
    });
  }
];

exports.delete_clinician = function(req, res, next){
  async.parallel({
    clinician: function(callback){
      account.findById(req.body.clinician_id).exec(callback);
    },
    clients: function(callback){
      Client.find({'user_id': req.body.clinician_id}).exec(callback);
    },
  }, function(err, results){
    if(err){return next(err);}
    Client.findByIdAndDelete({'user_id': req.body.clinician_id}, function deleteClient(err){
      if(err){return next(err);}
    }),
    account.findByIdAndDelete(req.body.clinician_id, function deleteClinician(err){
      if(err){return next(err);}
      res.redirect('/clinicians/clinician-profile');
    });
    }
  );
}