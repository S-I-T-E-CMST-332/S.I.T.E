var express = require('express');
var router = express.Router();
let client = require('../controllers/client');
let clinician = require('../controllers/clinician');

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//POST home page
router.post('/', clinician.login); //Admin or supervisor??
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
//GET session
router.get('/clients/:client_id/session', clinician.get_session);
//GET sounds
router.get('/clients/:client_id/session/sounds', clinician.get_sounds);
//GET progress
router.get('/clients/:client_id/progress', clinician.get_progress);
//GET progress overview
router.get('/clients/:client_id/progress/progress-overview', clinician.get_progress_overview);
//GET progress (sessions)
router.get('/clients/:client_id/progress/progress-overview/sessions', clinician.get_progress_sessions);

module.exports = router;