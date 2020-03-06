var express = require('express');
var router = express.Router();
let supervisor = require('../controllers/supervisor');

//GET clinician list
router.get('/clinicians', supervisor.get_clinicians);
//GET add user
router.get('/add-user', supervisor.get_add_user);