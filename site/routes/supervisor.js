var express = require('express');
var router = express.Router();
let supervisor = require('../controllers/supervisor');
let auth = require('../controllers/auth');

//GET clinician list
router.get('/clinicians', auth.is_auth, supervisor.get_clinicians);
//GET add user
router.get('/add-user', auth.is_auth, supervisor.get_add_user);
//POST add user
router.post('/add-user', auth.is_auth, supervisor.create_user);
//GET add flashcard
router.get('/add-flashcard', auth.is_auth, supervisor.get_add_flashcard);
//POST add flashcard
router.post('/add-flashcard', auth.is_auth, supervisor.create_flashcard);
//GET clinician profile
router.get('/clinicians/:clinician_id', auth.is_auth, supervisor.get_clinician_profile);
//GET edit profile
router.get('/clinicians/:clinician_id/edit', auth.is_auth, supervisor.get_edit_clinician);
//POST edit profile
router.post('/clinicians/:clinician_id/edit', auth.is_auth, supervisor.edit_user);
//GET delete profile
router.get('/clinicians/:clinician_id/delete', auth.is_auth, supervisor.get_delete_clinician);
//POST delete profile
router.post('/clinicians/:clinician_id/delete', auth.is_auth, supervisor.delete_clinician);
//GET logout
router.get('/logout', auth.logout);
//GET Home
router.get('/home', auth.home);
//GET show flashcards
router.get('/clinicians/view-flashcards', auth.is_auth, supervisor.view_flashcards);
router.get('/clinicians/view-flashcards/:form_id', auth.is_auth, supervisor.view_flashcard_type);

module.exports = router;