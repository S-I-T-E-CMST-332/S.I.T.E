const session = require('../models/session');
const letter = require('../models/letter');
const form = require('../models/form');
const flashcard = require('../models/flashcard');
const formsession = require('../models/form_session');
let client = require('../models/client');

let uniqid = require('uniqid');

exports.correct = function(req, res, next){
    let currentSess = session.findById(req.session.session_id);
    let currentLetter = letter.find({"letter_id": req.session.letter_id});
    let currentFormSess = formsession.find({"form_id": currentLetter[0].form_id});
    let Letter = new letter({
        letter_id: currentLetter[0].letter_id,
        correct: currentLetter[0].correct++
    });
    let Form = new formsession({
        form_id: currentFormSess[0].form_id,
        correct: currentFormSess[0].correct++
    });
    let Session = new session({
        session_id: currentSess.session_id,
        correct: currentSess.correct++
    });
    letter.findByIdAndUpdate(currentLetter[0]._id, Letter, function(err){
        if(err){return next(err);}
    }),
    form.findByIdAndUpdate(currentFormSess[0]._id, Form, function(err){
        if(err){return next(err);}
    }),
    session.findByIdAndUpdate(req.session.session_id, Session, function(err){
        if(err){return next(err);}
    });
    next();
}

exports.incorrect = function(req, res, next){
    let currentSess = session.findById(req.session.session_id);
    let currentLetter = letter.find({"session_id": req.session.letter_id});
    let currentFormSess = formsession.find({"letter_id": currentLetter[0].letter_id});
    let Letter = new letter({
        letter_id: currentLetter[0].letter_id,
        incorrect: currentLetter[0].incorrect++
    });
    let Form = new formsession({
        form_id: currentFormSess[0].form_id,
        incorrect: currentFormSess[0].incorrect++
    });
    let Session = new session({
        session_id: currentSess.session_id,
        incorrect: currentSess.incorrect++
    });
    letter.findByIdAndUpdate(currentLetter[0]._id, Letter, function(err){
        if(err){return next(err);}
    }),
    form.findByIdAndUpdate(currentFormSess[0]._id, Form, function(err){
        if(err){return next(err);}
    }),
    session.findByIdAndUpdate(req.session.session_id, Session, function(err){
        if(err){return next(err);}
    });
    next();
}

exports.kindof = function(req, res, next){
    let currentSess = session.findById(req.session.session_id);
    let currentLetter = letter.find({"letter_id": req.session.letter_id});
    let currentFormSess = form.find({"form_id": currentForm[0].form_id});
    let Letter = new letter({
        letter_id: currentLetter[0].letter_id,
        kinda: currentLetter[0].kinda++
    });
    let Form = new formsession({
        form_id: currentFormSess[0].form_id,
        kinda: currentFormSess[0].kinda++
    });
    let Session = new session({
        session_id: currentSess.session_id,
        kinda: currentSess.kinda++
    });
    letter.findByIdAndUpdate(currentLetter[0]._id, Letter, function(err){
        if(err){return next(err);}
    }),
    form.findByIdAndUpdate(currentFormSess[0]._id, Form, function(err){
        if(err){return next(err);}
    }),
    session.findByIdAndUpdate(req.session.session_id, Session, function(err){
        if(err){return next(err);}
    });
    next();
}

exports.start_session = function(req, res, next){
    client.findById(req.params.client_id).exec(function(err, client){
        if(err){return next(err);}
        let Session = new session({
            session_id: uniqid(),
            client_id: client.client_id,
            date: new Date(),//This needs to be momented
            correct: 0,
            incorrect: 0,
            kinda: 0
        });
        Session.save(function(err){
            if(err){return next(err);}
        });
        req.session.session_id = Session.session_id;
        req.session.client_id = req.params.client_id;
        next();
    });
}

exports.create_form_session = function(req, res, next){
    let FormSession = new formsession({
        form_id: req.params.sound_id,
        session_id: req.session.session_id,
        correct: 0,
        incorrect: 0,
        kinda: 0
    });
    FormSession.save(function(err){
        if(err){return next(err);}
        next();
    });
}

exports.get_card = function(req, res, next){
    flashcard.find({'form_id': req.params.sound_id})//sound_id is the form like ending ar (sound_id is form id)
        .exec(function(err, cards){
            if(err){return next(err);}
            res.render('clients/client\ profile/session/sounds/flashcard/flashcard', {flashcard: cards[Math.floor(Math.random()*cards.length)]});
        });//Should work. As long as the link is defined correctly, we can call flashcard.link
}

exports.send_card = function(req, res, next){
    flashcard.find({'form_id': req.params.sound_id})
        .exec(function(err, cards){
            if(err){return next(err);}
            return({newImage: cards[Math.floor(Math.random()*cards.length)].link});
        });//Try a return
}