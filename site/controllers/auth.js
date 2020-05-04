let session = require('express-session');
let user = require('../models/users')
const { check, validationResult } = require('express-validator');
let bcrypt = require('bcrypt');
let saltRounds = 10;
let salt = bcrypt.genSaltSync(saltRounds);

exports.login = [
    check('username').isLength({min: 1}).withMessage('Please enter your username').isAlphanumeric().withMessage('Must be alphanumeric'),
    check('password').isLength({min: 1}).withMessage('Please enter your password'),
    check('username').trim().escape(),
    check('password').trim().escape(),
    (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      res.render('index', {errors: errors.array()});
      return;
    }
    user.find({'username': req.body.username})
      .exec(function(err, user){
        if(err){return next(err);}
        if(user == null){res.render('index', {error: "User does not exist"});}
        bcrypt.compare(req.body.password, user[0].password, function(err, succ, next){
          if(err){return next(err);}
          if(succ){
            if(user[0].flag === true){
              req.session.user_id = user[0].user_id;
              req.session.supervisor_id = user[0].supervisor_id;
              req.session.flag = true;
              res.redirect('/clinicians');
            }else{
              req.session.user_id = user[0].user_id;
              req.session.supervisor_id = user[0].supervisor_id;
              req.session.flag = false;
              res.redirect('/clients');
            }
          }else{
            res.render('index', {error:'password is incorrect'});
          }
      });
    }
  )}
]

exports.logout = function(req, res, next) {
  req.session.destroy((err) => {
	res.redirect('/');
  });
}

exports.home = function(req, res){
  req.session.flag == true ? res.redirect('/clinicians') : res.redirect('/clients');
}