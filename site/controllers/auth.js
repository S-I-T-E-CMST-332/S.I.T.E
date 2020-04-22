let session = require('express-session');
let user = require('../models/users')
const { check, validationResult } = require('express-validator');
let bcrypt = require('bcrypt');
let saltRounds = 10;
let salt = bcrypt.genSaltSync(saltRounds);

exports.login = function(req, res, next) { 
    check('username').isLength({min: 1}).withMessage('Please enter your username').isAlphanumeric().withMessage('Must be alphanumeric');
    check('password').isLength({min: 1}).withMessage('Please enter your password');
    check('username').trim().escape(),
    check('password').trim().escape(),
    user.find({'username': req.body.username})
      .exec(function(err, user){
        if(err){return next(err);}
        if(user == null){res.render('index', {error: "User does not exist"});}
        if(bcrypt.hashSync(req.body.password, salt) == user.password){
          if(user.flag === true){
            req.session.user = user.username;
            req.session.flag = true;
            res.redirect('/clinicians');
          }else{
            req.session.user = user.username;
            req.session.flag = false;
            res.redirect('/clients');
          }
        }else{
          res.render('index', {error:'password is incorrect'});
        }
      });
}

exports.logout = function(req, res, next) { 
    req.logout();
    req.session.destroy();
    res.redirect('/');
}