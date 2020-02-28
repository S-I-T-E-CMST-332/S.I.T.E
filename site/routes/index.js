var express = require('express');
var router = express.Router();
let client = require('../controllers/client');
let clinician = require('../controllers/clinician');

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//POST home page
router.post('/', clinician.login);
// GET client list
router.get('/clients', clinician.get_clients);
//GET Add client
router.get('/clients/add-client', clinician.get_add_client);
// GET client profile
router.get('/clients/client-profile', clinician.get_profile);
// GET edit client
router.get('/clients/client-profile/edit', clinician.get_edit);
//GET delete client
router.get('/clients/client-profile/delete', clinician.get_delete);
//GET session
router.get('/clients/client-profile/session', clinician.get_session);
//GET sounds
router.get('/clients/client-profile/session/sounds', clinician.get_sounds);
//GET progress
router.get('/clients/client-profile/progress', clinician.get_progress);
//GET progress overview
router.get('/clients/client-profile/progress/progress-overview', clinician.get_progress_overview);
//GET progress (sessions)
router.get('/clients/client-profile/progress/progress-overview/sessions', clinician.get_progress_sessions);

module.exports = router;