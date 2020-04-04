let passport = require('passport');
let account = require('../models/users'); //Called this account because passport uses the term user
let Client = require('../models/client');
const sanitize = require('express-validator');
let bcrypt = require('bcrypt');
let uniqid = require('uniqid');//This and bcrypt did NOT show up on their own in the package json. Best of luck

exports.get_clinicians = function(req, res, next){
  res.render('clinicians/clinicians');
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

exports.create_user[
  body('username').isLength({min: 1}).trim().withMessage('Please enter your username').isAlphaNumeric().withMessage('Must be alphanumeric'),
  body('password').isLength({min: 1}).trim().withMessage('Please enter your password'),
  body('fname').isLength({min: 1}).trim().withMessage('Please enter your first name').isAlphaNumeric().withMessage('Must be alphanumeric'),
  body('lname').isLength({min: 1}).trim().withMessage('Please enter your last name').isAlphaNumeric().withMessage('Must be alphanumeric'),
  body('phone').isLength({min: 12, max: 12}).trim().withMessage('Please enter your phone number (eg. 555-123-4567)'),
  body('email').isLength({min: 1}).trim().withMessage('Please enter your email (eg. example@domain.com)'),
  //sanitize
  sanitize('username').escape(),
  sanitize('password').escape(),
  sanitize('fname').escape(),
  sanitize('lname').escape(),
  sanitize('phone').escape(),
  sanitize('email').escape(),
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

exports.edit_user[
  body('username').isLength({min: 1}).withMessage("Please enter a username").isAlphaNumeric().withMessage("Letters or numbers only"),
  body('fname').isLength({min: 1}).withMessage("Please enter your first name").isAlphaNumeric().withMessage("Letters or numbers only"),
  body('lname').isLength({min: 1}).withMessage("Please enter your last name").isAlphaNumeric().withMessage("Letters or numbers only"),
  body('phone').isLength({min: 12, max: 12}).withMessage("Please enter your phone number (eg. 555-123-4567)"),
  body('email').isLength({min: 1}).trim().withMessage('Please enter your email (eg. example@domain.com)'),
  sanitize('username').escape(),
  sanitize('fname').escape(),
  sanitize('lname').escape(),
  sanitize('phone').escape(),
  sanitize('email').escape(),
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