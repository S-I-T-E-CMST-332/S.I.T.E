let passport = require('passport');
const sanitize = require('express-validator');

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