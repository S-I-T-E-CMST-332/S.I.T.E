var express = require('express');
var router = express.Router();
let client = require('../controllers/client');
let clinician = require('../controllers/clinician');
let auth = require('../controllers/auth');

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'S.I.T.E.'});
});
//POST home page
router.post('/', auth.login);
// GET client list
router.get('/clients', auth.is_clin, clinician.clear_session, clinician.get_clients);
//GET Add client
router.get('/clients/add-client', auth.is_clin, clinician.get_add_client);
//POST Add client
router.post('/clients/add-client', auth.is_clin, clinician.create_client);
//GET client profile
router.get('/clients/:client_id', auth.is_clin, clinician.get_profile);
//GET edit client
router.get('/clients/:client_id/edit', auth.is_clin, clinician.get_edit);//If it doesn't like var in middle, try clients/view/:client_id
//POST edit client
router.post('/clients/:client_id/edit', auth.is_clin, clinician.edit_client);
//GET delete client
router.get('/clients/:client_id/delete', auth.is_clin, clinician.get_delete);
//POST delete client
router.post('/clients/:client_id/delete', auth.is_clin, clinician.delete_client);
//GET letter (Start of a Session)
router.get('/clients/:client_id/letters', auth.is_clin, client.start_session, clinician.get_session);
//GET sounds
router.get('/clients/letters/sounds', auth.is_clin, clinician.get_sounds);
//GET Start Session
router.get('/clients/letters/session/:sound_id', auth.is_clin, client.create_form_session, client.create_letter_session, client.get_card);
//POST Correct, Incorrect, and Kindof. Only to be accessed through ajax
router.post('/correct', auth.is_clin, client.correct, client.send_card);
router.post('/incorrect', auth.is_clin, client.incorrect, client.send_card);
router.post('/kindof', auth.is_clin, client.kindof, client.send_card);
//GET progress (sessions)
router.get('/clients/:client_id/reports', auth.is_clin, clinician.get_report);
router.get('/clients/:client_id/reports/:session_id', auth.is_clin, clinician.get_details);
//GET good job
router.get('/good-job', auth.is_clin, client.good_job);

module.exports = router;