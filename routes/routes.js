const express = require('express');
const router = express.Router();
const controller = require('[path to controller file]');

// User authentication
router.post('/signup', controller.signup);
router.post('/login', controller.login);

// Location tracking
router.post('/update-location', controller.updateLocation);

// Matching
router.post('/request-ride', controller.requestRide);
router.post('/accept-ride', controller.acceptRide);

// Ride tracking
router.get('/ride-status', controller.rideStatus);
router.post('/end-ride', controller.endRide);

// Payment processing
router.post('/process-payment', controller.processPayment);

// Rating and feedback
router.post('/rate', controller.rate);

// Analytics
router.get('/rides-data', controller.ridesData);

// Notifications
router.post('/send-notification', controller.sendNotification);

module.exports = router;