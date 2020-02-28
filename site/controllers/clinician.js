//Model stuff

//New modules (like validators)

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