let passport = require('passport');
const { check, validationResult } = require('express-validator');

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

exports.login = function(req, res, next) { 
    check('username').isLength({min: 1}).withMessage('Please enter your username').isAlphaNumeric().withMessage('Must be alphanumeric');
    check('password').isLength({min: 1}).withMessage('Please enter your password');
    check('username').trim().escape(),
    check('password').trim().escape(),
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