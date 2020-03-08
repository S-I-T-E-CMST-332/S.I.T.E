let passport = require('passport');
let account = require('../models/users'); //Called this account because passport uses the term user
const sanitize = require('express-validator');
let bcrypt = require('bcrypt');
let uniqid = require('uniqid');//This and bcrypt did NOT show up on their own in the package json. Best of luck

exports.get_clinicians = function(req, res, next){
    res.render('clinicians/clinicians');
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
          res.redirect('To be determined');
        })
      }
    }
]