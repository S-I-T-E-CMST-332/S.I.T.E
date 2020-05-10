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
router.get('/clients', clinician.get_clients);
//GET Add client
router.get('/clients/add-client', clinician.get_add_client);
//POST Add client
router.post('/clients/add-client', clinician.create_client);
//GET client profile
router.get('/clients/:client_id', clinician.get_profile);
//GET edit client
router.get('/clients/:client_id/edit', clinician.get_edit);//If it doesn't like var in middle, try clients/view/:client_id
//POST edit client
router.post('/clients/:client_id/edit', clinician.edit_client);
//GET delete client
router.get('/clients/:client_id/delete', clinician.get_delete);
//POST delete client
router.post('/clients/:client_id/delete', clinician.delete_client);
//GET letter (Start of a Session)
router.get('/clients/:client_id/letters', clinician.get_session);
//GET sounds
router.get('/clients/letters/sounds', clinician.get_sounds);
//GET Start Session
router.get('/clients/letters/session/:sound_id', client.get_card);
//POST Correct, Incorrect, and Kindof. Only to be accessed through ajax
router.post('/correct', client.correct);
router.post('/incorrect', client.incorrect);
router.post('/kindof', client.kindof);
//GET progress (sessions)
router.get('/client/:client_id/reports', clinician.get_report);
//GET details
router.get('/client/:session_id/reports/details', clinician.get_details);

module.exports = router;