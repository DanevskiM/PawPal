const express = require('express');
const router = express.Router();
const { createReservationHandler } = require('../controllers/reservation.controller');

router.post('/create', createReservationHandler);

module.exports = router;