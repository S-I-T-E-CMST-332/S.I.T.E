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
            correct: results.session[0].correct + 1
        });
        session.findByIdAndUpdate(results.session[0]._id, Session, {new: true}, function(err){
            if(err){return next(err);}
            console.log('updates session');
        });
        let Letter = new lettersession({
            _id: results.lettersession[0]._id,
            letter_id: results.lettersession[0].letter_id,
            session_id: req.session.session_id,
            correct: results.lettersession[0].correct + 1
        });
        lettersession.findByIdAndUpdate(results.lettersession[0]._id, Letter, {new: true}, function(err){
            if(err){return next(err);}
            console.log('updates letter');
        });
        let Form = new formsession({
            _id: results.formsession[0]._id,
            form_id: req.session.form_id,
            session_id: req.session.session_id,
            correct: results.formsession[0].correct + 1
        });
        formsession.findByIdAndUpdate(results.formsession[0]._id, Form, {new: true}, function(err){
            if(err){return next(err);}
            console.log('updates formsession');
        });
        console.log('calls next');
        next();
    });
}

exports.incorrect = function(req, res, next){
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
            incorrect: results.session[0].incorrect + 1
        });
        session.findByIdAndUpdate(results.session[0]._id, Session, {new: true}, function(err){
            if(err){return next(err);}
            console.log('updates session');
        });
        let Letter = new lettersession({
            _id: results.lettersession[0]._id,
            letter_id: results.lettersession[0].letter_id,
            session_id: req.session.session_id,
            incorrect: results.lettersession[0].incorrect + 1
        });
        lettersession.findByIdAndUpdate(results.lettersession[0]._id, Letter, {new: true}, function(err){
            if(err){return next(err);}
            console.log('updates letter');
        });
        let Form = new formsession({
            _id: results.formsession[0]._id,
            form_id: req.session.form_id,
            session_id: req.session.session_id,
            incorrect: results.formsession[0].incorrect + 1
        });
        formsession.findByIdAndUpdate(results.formsession[0]._id, Form, {new: true}, function(err){
            if(err){return next(err);}
            console.log('updates formsession');
        });
        console.log('calls next');
        next();
    });
}

exports.kindof = function(req, res, next){
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
            kinda: results.session[0].kinda + 1
        });
        session.findByIdAndUpdate(results.session[0]._id, Session, {new: true}, function(err){
            if(err){return next(err);}
            console.log('updates session');
        });
        let Letter = new lettersession({
            _id: results.lettersession[0]._id,
            letter_id: results.lettersession[0].letter_id,
            session_id: req.session.session_id,
            kinda: results.lettersession[0].kinda + 1
        });
        lettersession.findByIdAndUpdate(results.lettersession[0]._id, Letter, {new: true}, function(err){
            if(err){return next(err);}
            console.log('updates letter');
        });
        let Form = new formsession({
            _id: results.formsession[0]._id,
            form_id: req.session.form_id,
            session_id: req.session.session_id,
            kinda: results.formsession[0].kinda + 1
        });
        formsession.findByIdAndUpdate(results.formsession[0]._id, Form, {new: true}, function(err){
            if(err){return next(err);}
            console.log('updates formsession');
        });
        console.log('calls next');
        next();
    });
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
    flashcard.find({'form_id': req.params.sound_id})
        .exec(function(err, cards){
            if(err){return next(err);}
            console.log(req.session);
            res.render('clients/client\ profile/session/sounds/flashcard/flashcard', {flashcard: cards[Math.floor(Math.random()*cards.length)]});
        });
}

exports.send_card = function(req, res, next){
    flashcard.find({'form_id': req.session.form_id})
        .exec(function(err, cards){
            if(err){return next(err);}
            res.send(cards[Math.floor(Math.random()*cards.length)].link);
        });
}

exports.good_job = function(req, res, next){
    res.render('clients/good_job');
}