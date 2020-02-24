var express = require('express');
var router = express.Router();
let client = require('../controllers/client');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET client list
router.get('/clients', client.get_clients);
// GET client profile
router.get('/clients/client-profile', client.get_profile);
//GET session
router.get('/clients/client-profile/session', client.get_session);
//GET sounds
router.get('/clients/client-profile/session/sounds', client.get_sounds);
//GET progress
router.get('/clients/client-profile/progress', client.get_progress);
//GET progress overview
router.get('/clients/client-profile/progress/progress-overview', client.get_progress_overview);
//GET progress (sessions)
router.get('/clients/client-profile/progress/progress-overview/sessions', client.get_progress_sessions);

module.exports = router;