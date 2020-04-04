var express = require('express');
var router = express.Router();
let supervisor = require('../controllers/supervisor');

//GET clinician list
router.get('/clinicians', supervisor.get_clinicians);
//GET add user
router.get('/add-user', supervisor.get_add_user);
//POST add user
router.post('/add-user', supervisor.create_user);
//GET clinician profile
router.get('/clinicians/clinician-profile', supervisor.get_clinician_profile);
//GET edit profile
router.get('/clinicians/clinician-profile/edit', supervisor.get_edit_clinician);
//POST edit profile
router.post('/clinicians/clinician-profile/edit', supervisor.edit_user);
//GET delete profile
router.get('/clinicians/clinician-profile/delete', supervisor.get_delete_clinician);
//POST delete profile
router.post('/clinicians/clinician-profile/delete', supervisor.delete_clinician);