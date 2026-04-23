const express = require('express');
const {
  submitRegistration,
  getRegistrationById,
} = require('../controllers/registration.controller');

const router = express.Router();

router.post('/', submitRegistration);
router.get('/:id', getRegistrationById);

module.exports = router;