let Client = require('../models/client');
const sanitize = require("express-validator");

exports.login = function(req, res, next){
    res.redirect('/cients');
}

exports.get_clients = function(req, res, next){
    res.render('clients/clients');
}

exports.get_add_client = function(req, res, next){
    res.render('clients/add\ client/add');
}

exports.post_add_client = function(req, res, next){
    res.redirect('/clients');
}

exports.get_profile = function(req, res, next){
    res.render('clients/client\ profile/profile');
}

exports.get_edit = function(req, res, next){
    res.render('clients/client\ profile/edit/edit');
}

exports.post_edit = function(req, res, next){
    res.redirect('clients/client\ profile');
}

exports.get_delete = function(req, res, next){
    res.render('clients/client\ profile/delete/delete');
}

exports.post_delete = function(req, res, next){
    res.redirect('clients/client\ profile');
}

exports.get_session = function(req, res, next){
    res.render('clients/client\ profile/session/session');
}

exports.get_sounds = function(req, res, next){
    res.render('clients/client\ profile/session/sounds/sounds');
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

exports.create_client[
    body('dob').isLength({min:1}).trim().withMessage("Please enter your client's dob (eg. 08-15-2004"),//Ask how dates are stored in mongo
    body('fname').isLength({min: 1}).trim().withMessage("Please enter your client's first name").isAlphaNumeric().withMessage("No special characthers"),
    body('lname').isLength({min: 1}).trim().withMessage("Please enter your client's last name").isAlphaNumeric().withMessage("No special charachters"),
    sanitize('dob').escapee(),
    sanitize('fname').escape(),
    sanitize('lname').escape(),
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
                res.redirect('To be determined');
            });
        }
    }
];

exports.edit_client[
    body('dob').isLength({min:1}).trim().withMessage("Please enter your client's dob (eg. 08-15-2004"),//Ask how dates are stored in mongo
    body('fname').isLength({min: 1}).trim().withMessage("Please enter your client's first name").isAlphaNumeric().withMessage("No special characthers"),
    body('lname').isLength({min: 1}).trim().withMessage("Please enter your client's last name").isAlphaNumeric().withMessage("No special charachters"),
    sanitize('dob').escapee(),
    sanitize('fname').escape(),
    sanitize('lname').escape(),
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
                res.redirect("somewhere");
            });
        }
    }
];

exports.delete_client = function(req, res, next){
    async.parallel({
        client: function(callback){
            Client.findById(req.body.clientid).exec(callback);
        },
    }, function(err, results){
        if(err){return next(err);}
        Client.findByIdAndDelete(req.body.clientid, function deleteclient(err){
            if(err){return next(err);}
            res.redirect('somewhere');
        });
    }
    );
}