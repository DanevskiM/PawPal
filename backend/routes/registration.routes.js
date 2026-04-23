const express = require('express');
const { submitRegistration } = require('../controllers/registration.controller');

const router = express.Router();

router.post('/', submitRegistration);

module.exports = router;