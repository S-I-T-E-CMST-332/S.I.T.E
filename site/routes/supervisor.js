var express = require('express');
var router = express.Router();
let supervisor = require('../controllers/supervisor');
let auth = require('../controllers/auth');

//GET clinician list
router.get('/clinicians', supervisor.get_clinicians);
//GET add user
router.get('/add-user', supervisor.get_add_user);
//POST add user
router.post('/add-user', supervisor.create_user, supervisor.get_clinicians);
//GET add flashcard
router.get('/add-letter', supervisor.get_add_flashcard);
//POST add flashcard
router.post('/add-letter', supervisor.create_flashcard);
//GET clinician profile
router.get('/clinicians/:clinician_id', supervisor.get_clinician_profile);
//GET edit profile
router.get('/clinicians/:clinician_id/edit', supervisor.get_edit_clinician);
//POST edit profile
router.post('/clinicians/:clinician_id/edit', supervisor.edit_user);
//GET delete profile
router.get('/clinicians/:clinician_id/delete', supervisor.get_delete_clinician);
//POST delete profile
router.post('/clinicians/:clinician_id/delete', supervisor.delete_clinician);
//GET logout
router.get('/logout', auth.logout);
//GET Home
router.get('/home', auth.home);
//GET progress
router.get('/clients/:client_id/progress-overview', supervisor.get_progress_overview);

module.exports = router;