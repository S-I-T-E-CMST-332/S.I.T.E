const session = require('../models/session');
const letter = require('../models/letter');
const form = require('../models/form');

exports.correct = function(req, res, next){
    let currentSess = session.findById(req.session.session_id);
    let currentLetter = session.findById(req.session.letter_id);
    let currentForm = form.findById(req.session.form_id);
    let Letter = new letter({
        correct: currentLetter.correct++
    });
    let Form = new form({
        correct:currentForm.correct++
    });
    let Session = new session({
        correct: currentSess.correct++
    });
    letter.findByIdAndUpdate(req.session.letter_id, Letter, function(err){
        if(err){return next(err);}
    }),
    form.findByIdAndUpdate(req.session.form_id, Form, function(err){
        if(err){return next(err);}
    }),
    session.findByIdAndUpdate(req.session.session_id, Session, function(err){
        if(err){return next(err);}
    });
}

exports.incorrect = function(req, res, next){
    let currentSess = session.findById(req.session.session_id);
    let currentLetter = session.findById(req.session.letter_id);
    let currentForm = form.findById(req.session.form_id);
    let Letter = new letter({
        incorrect: currentLetter.incorrect++
    });
    let Form = new form({
        incorrect:currentForm.incorrect++
    });
    let Session = new session({
        incorrect:currentSess.incorrect++
    });
    letter.findByIdAndUpdate(req.session.letter_id, Letter, function(err){
        if(err){return next(err);}
    }),
    form.findByIdAndUpdate(req.session.form_id, Form, function(err){
        if(err){return next(err);}
    }),
    session.findByIdAndUpdate(req.session.session_id, Session, function(err){
        if(err){return next(err);}
    });
}

exports.kindof = function(req, res, next){
    let currentSess = session.findById(req.session.session_id);
    let currentLetter = session.findById(req.session.letter_id);
    let currentForm = form.findById(req.session.form_id);
    let Letter = new letter({
        kinda: currentLetter.kinda++
    });
    let Form = new form({
        kinda:currentForm.kinda++
    });
    let Session = new session({
        kinda: currentSess.kinda++
    });
    letter.findByIdAndUpdate(req.session.letter_id, Letter, function(err){
        if(err){return next(err);}
    }),
    form.findByIdAndUpdate(req.session.form_id, Form, function(err){
        if(err){return next(err);}
    }),
    session.findByIdAndUpdate(req.session.session_id, Session, function(err){
        if(err){return next(err);}
    });
}