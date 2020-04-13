let passport = require('passport');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

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
    body('username').isLength({min: 1}).withMessage('Please enter your username').isAlphaNumeric().withMessage('Must be alphanumeric');
    body('password').isLength({min: 1}).withMessage('Please enter your password');
    sanitizeBody('username').trim().escape(),
    sanitizeBody('password').trim().escape(),
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