var express = require('express');
var router = express.Router();
let supervisor = require('../controllers/supervisor');

//GET clinician list
router.get('/clinicians', supervisor.get_clinicians);