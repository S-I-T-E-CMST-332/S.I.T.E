let passport = require('passport');
let account = require('../models/users'); //Called this account because passport uses the term user
const sanitize = require('express-validator');
let bcrypt = require('bcrypt');
let uniqid = require('uniqid');//This and bcrypt did NOT show up on their own in the package json. Best of luck

exports.has_auth = function(req, res, next){
    passport.use(new LocalStrategy(
        function(username, password, done) {
          User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
          });
        }
      ));
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
            supervisor_id: uniqid(),
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

exports.login = function(req, res, next) { 
    body('username').isLength({min: 1}).trim().withMessage('Please enter your username').isAlphaNumeric().withMessage('Must be alphanumeric');
    body('password').isLength({min: 1}).trim().withMessage('Please enter your password');
    sanitize('username').escape(),
    sanitize('password').escape(),
    passport.authenticate('local', {
        successRedirect: "/clinicians",
        failureRedirect: "/"
    })(req, res, next);
}

exports.logout = function(req, res, next) { 
    req.logout();
    req.session.destroy();
    res.redirect('/');
}