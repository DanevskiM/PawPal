const express = require('express');
const router = express.Router();
const { createPayment, handleWebhook } = require('../controllers/payment.controller');

router.post('/create', createPayment);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

module.exports = router;