let Client = require('../models/client');
const { check, validationResult } = require('express-validator');

exports.login = function(req, res, next){
    res.redirect('/clients');
}

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
    res.render('clients/client\ profile/profile');
}

exports.get_edit = function(req, res, next){
    res.render('clients/client\ profile/edit/edit');
}

exports.get_delete = function(req, res, next){
    res.render('clients/client\ profile/delete/delete');
}

exports.get_session = function(req, res, next){
    res.render('clients/client\ profile/session/letters');
}

exports.get_sounds = function(req, res, next){
    res.render('clients/client\ profile/session/sounds/sounds');
}

exports.get_card = function(req, res, next){
    res.render('clients/client\ profile/session/sounds/flashcard');
}

exports.get_progress = function(req, res, next){
    res.render('clients/client\ profile/progress/progress');
}

exports.get_progress_overview = function(req, res, next){
    res.render('clients/client\ profile/progress/progress\ overview/overview');
}

exports.get_progress_sessions = function(req, res, next){
    res.render('clients/client\ profile/progress/progress\ overview/sessions/sessions');
}

exports.create_client = [
    check('dob').isLength({min:1}).withMessage("Please enter your client's dob (eg. 08-15-2004"),//Ask how dates are stored in mongo
    check('fname').isLength({min: 1}).withMessage("Please enter your client's first name").isAlphanumeric().withMessage("No special characthers"),
    check('lname').isLength({min: 1}).withMessage("Please enter your client's last name").isAlphanumeric().withMessage("No special charachters"),
    check('dob').toDate(),
    check('fname').trim().escape(),
    check('lname').trim().escape(),
    (req, res, next) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty){
            //rerender the page
        }else{
            let client = new Client(
                {
                    user_id: user_id,
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
    check('dob').toDate(),
    check('fname').trim().escape(),
    check('lname').trim().escape(),
    (req, res, next) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            //We have to rerender the page, there were errors
            return;
        }else{
            let client = new Client(
                {
                    dob: req.body.dob,
                    fname: req.body.fname,
                    lname: req.body.lname
                }
            );
            Client.findByIdAndUpdate(req.params.id, client, function(err){
                if (err){return next(err);}
                res.redirect("/clients");
            });
        }
    }
];

exports.delete_client = function(req, res, next){
    async.parallel({
        client: function(callback){
            Client.findById(req.body.client_id).exec(callback);
        },
    }, function(err, results){
        if(err){return next(err);}
        Client.findByIdAndDelete(req.body.client_id, function deleteclient(err){
            if(err){return next(err);}
            res.redirect('/clients');
        });
    }
    );
}