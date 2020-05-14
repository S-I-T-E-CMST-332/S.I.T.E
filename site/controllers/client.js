const session = require('../models/session');
const letter = require('../models/letter');
const form = require('../models/form');
const flashcard = require('../models/flashcard');
const formsession = require('../models/form_session');
const client = require('../models/client');
const lettersession = require('../models/letter_session');

let uniqid = require('uniqid');
let async = require('async');
let moment = require('moment');

exports.correct = function(req, res, next){
    async.parallel({
        session: function(callback){
            session.find({"session_id": req.session.session_id}).exec(callback)
        },
        lettersession: function(callback){
            lettersession.find({"letter_id": req.session.letter_id, "session_id": req.session.session_id}).exec(callback)
        },
        formsession: function(callback){
            formsession.find({"form_id": req.session.form_id, "session_id": req.session.session_id}).exec(callback)
        },
    }, function(err, results){
        let Session = new session({
            _id: results.session[0]._id,
            session_id: req.session.session_id,
            client_id: req.session.client_id,
            correct: results.session[0].correct++
        });
        session.findByIdAndUpdate(results.session[0]._id, Session, {new: true}, function(err){
            if(err){return next(err);}
            console.log('updates session');
        });
        let Letter = new lettersession({
            _id: results.lettersession[0]._id,
            letter_id: results.lettersession[0].letter_id,
            session_id: req.session.session_id,
            correct: results.lettersession[0].correct++
        });
        lettersession.findByIdAndUpdate(results.lettersession[0]._id, Letter, {new: true}, function(err){
            if(err){return next(err);}
            console.log('updates letter');
        });
        let Form = new formsession({
            _id: results.formsession[0]._id,
            form_id: req.session.form_id,
            session_id: req.session.session_id,
            correct: results.formsession[0].correct++
        });
        formsession.findByIdAndUpdate(results.formsession[0]._id, Form, {new: true}, function(err){
            if(err){return next(err);}
            console.log('updates formsession');
        });
    },function(){
        console.log('calls next')
        next()
    }
    );
}

exports.incorrect = function(req, res, next){
    let currentSess = session.find({"session_id": req.session.session_id});
    let currentLetterSess = lettersession.find({"letter_id": req.session.letter_id});
    let currentFormSess = formsession.find({"form_id": req.session.form_id});
    let Letter = new lettersession({
        letter_id: currentLetterSess[0].letter_id,
        session_id: req.session.session_id,
        incorrect: currentLetterSess[0].incorrect++
    });
    letter.findByIdAndUpdate(currentLetter[0]._id, Letter, function(err){
        if(err){return next(err);}
    });
    let Form = new formsession({
        form_id: req.params.sound_id,
        session_id: req.session.session_id,
        incorrect: currentFormSess[0].incorrect++
    });
    form.findByIdAndUpdate(currentFormSess[0]._id, Form, function(err){
        if(err){return next(err);}
    });
    let Session = new session({
        session_id: req.session.session_id,
        client_id: req.session.client_id,
        incorrect: currentSess[0].incorrect++
    });
    session.findByIdAndUpdate(currentSess[0]._id, Session, function(err){
        if(err){return next(err);}
    });
    next();
}

exports.kindof = function(req, res, next){
    let currentSess = session.findById(req.session.session_id);
    let currentLetter = letter.find({"letter_id": req.session.letter_id});
    let currentFormSess = form.find({"form_id": req.session.form_id});
    let Letter = new letter({
        letter_id: currentLetter[0].letter_id,
        kinda: currentLetter[0].kinda++
    });
    let Form = new formsession({
        form_id: currentFormSess[0].form_id,
        session_id: req.session.session_id,
        kinda: currentFormSess[0].kinda++
    });
    let Session = new session({
        session_id: currentSess.session_id,
        client_id: req.session.client_id,
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
        let day = new Date()
        let Session = new session({
            session_id: uniqid(),
            client_id: client.client_id,
            date: moment(day).utc(),
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
    });
    req.session.letter_id = 'r';
    req.session.form_id = req.params.sound_id;
    next();
}

exports.create_letter_session = function(req, res, next){
    let LetterSession = new lettersession({
        letter_id: req.session.letter_id,
        session_id: req.session.session_id,
        correct: 0,
        incorrect: 0,
        kinda: 0
    });
    LetterSession.save(function(err){
        if(err){return next(err);}
    });
    next();
}

exports.get_card = function(req, res, next){
    flashcard.find({'form_id': req.params.sound_id})//sound_id is the form like ending ar (sound_id is form id)
        .exec(function(err, cards){
            if(err){return next(err);}
            res.render('clients/client\ profile/session/sounds/flashcard/flashcard', {flashcard: cards[Math.floor(Math.random()*cards.length)]});
        });//Should work. As long as the link is defined correctly, we can call flashcard.link
}

exports.send_card = function(req, res, next){
    flashcard.find({'form_id': req.session.form_id})
        .exec(function(err, cards){
            if(err){return next(err);}
            res.send(cards[Math.floor(Math.random()*cards.length)].link);
        });
}

exports.get_ajax = function(req, res){
    res.render('ajax');
}

exports.send_stuff = function(req, res){
    res.send('/images/flashcards/capture.png');
}