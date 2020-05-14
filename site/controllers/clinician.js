let Client = require('../models/client');
const session = require('express-session');
const { check, validationResult } = require('express-validator');
let uniqid = require('uniqid');
let async = require('async');
let moment = require('moment');
let form = require('../models/form');
let Session = require('../models/session');
let letter = require('../models/letter');
let formsession = require('../models/form_session');

exports.get_clients = function(req, res, next){
    Client.find()
        .exec(function(err, client_list){
            if(err){return next(err);}
            res.render('clients/clients', {client_list:client_list});
        });
}

exports.get_add_client = function(req, res, next){
    res.render('clients/add\ client/add');
}

exports.get_profile = function(req, res, next){
    Client.findById(req.params.client_id)
        .exec(function(err, client){
            if(err){return next(err);}
            res.render('clients/client\ profile/profile', {client: client});
        });
}

exports.get_edit = function(req, res, next){
    Client.findById(req.params.client_id)
        .exec(function(err, client){
            if(err){return next(err);}
            res.render('clients/client\ profile/edit/edit', {client: client});
        });
}

exports.get_delete = function(req, res, next){
    Client.findById(req.params.client_id)
        .exec(function(err, client){
            if(err){return next(err);}
            res.render('clients/client\ profile/delete/delete', {client: client});
        });
}

exports.get_report = function(req, res, next){
    Client.findById(req.params.client_id).exec(function(err, client){
        Session.find({"client_id": client.client_id}).exec(function(err, sessions){
            if(err){return next(err);}
            res.render('clients/client\ profile/report/report', {sessions: sessions, client: client});
        });
    });
}

exports.get_details = function(req, res, next){
    Client.findById(req.params.client_id).exec(function(err, client){
        Session.find({"client_id": client.client_id}).exec(function(err, sess){
            formsession.find({"session_id": req.params.session_id})
            .exec(function(err, formsessions){
                if(err){return next(err);}
                res.render('clients/client\ profile/report/details/details', {formsessions: formsessions, client: client, session: sess});
            });
        });
    });
}

exports.get_session = function(req, res, next){
    Client.findById(req.params.client_id)
        .exec(function(err, client){
            if(err){return next(err);}
            res.render('clients/client\ profile/session/letter', {client: client});
        });
}

exports.get_sounds = function(req, res, next){
    form.find({"letter_id": 'r'})
        .exec(function(err, forms){
            res.render('clients/client\ profile/session/sounds/sounds', {form: forms});
        });
}

exports.create_client = [
    check('dob').isLength({min:1}).withMessage("Please enter your client's dob (eg. 08-15-2004"),//Ask how dates are stored in mongo
    check('fname').isLength({min: 1}).withMessage("Please enter your client's first name").isAlphanumeric().withMessage("No special characthers"),
    check('lname').isLength({min: 1}).withMessage("Please enter your client's last name").isAlphanumeric().withMessage("No special charachters"),
    check('dob').toDate().isISO8601(),
    check('fname').trim().escape(),
    check('lname').trim().escape(),
    (req, res, next) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty){
            res.render('clients/add\ client/add', {errors: errors.array()});
        }else{
            let client = new Client(
                {
                    client_id: uniqid(),
                    user_id: req.session.user_id,
                    dob: req.body.dob,
                    fname: req.body.fname,
                    lname: req.body.lname
                }
            );
            client.save(function (err){
                if (err){return next(err);}
                res.redirect('/clients');
            });
        }
    }
];

exports.edit_client = [
    check('dob').isLength({min:1}).withMessage("Please enter your client's dob (eg. 08-15-2004"),//Ask how dates are stored in mongo
    check('fname').isLength({min: 1}).withMessage("Please enter your client's first name").isAlphanumeric().withMessage("No special characthers"),
    check('lname').isLength({min: 1}).withMessage("Please enter your client's last name").isAlphanumeric().withMessage("No special charachters"),
    check('dob').toDate().isISO8601(),
    check('fname').trim().escape(),
    check('lname').trim().escape(),
    (req, res, next) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            //res.render('clients/client\ profile/edit/edit', {fname: req.body.fname, lname: req.body.lname, errors: errors.array()});
            console.log(errors);
            return;
        }else{
            let client = new Client(
                {
                    _id: req.params.client_id,
                    user_id: req.session.user_id,
                    dob: req.body.dob,
                    fname: req.body.fname,
                    lname: req.body.lname
                }
            );
            Client.findByIdAndUpdate(req.params.client_id, client, {new: true}, function(err){
                if (err){return next(err);}
                res.redirect("/clients");
            });
        }
    }
];

exports.delete_client = function(req, res, next){
    async.parallel({
        client: function(callback){
            Client.findById(req.params.client_id).exec(callback);
        },
    }, function(err, results){
        if(err){return next(err);}
        Client.findByIdAndDelete(req.params.client_id, function deleteclient(err){
            if(err){return next(err);}
            res.redirect('/clients');
        });
    }
    );
}

exports.clear_session = function(req, res, next){
    req.session.session_id = '';
    req.session.client_id = '';
    req.session.letter_id = '';
    req.session.form_id = '';
    next();
}