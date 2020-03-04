let passport = require('passport');

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