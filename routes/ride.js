const express = require('express');
const router = express.Router();
const controller = require('../controllers/rideC');
// Ride tracking
router.get('/ride-status', controller.rideStatus);
router.post('/end-ride', controller.endRide);
//router.post('/process-payment', controller.processPayment);
module.exports = router;