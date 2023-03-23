const express = require("express");
const router = express.Router();
const controller = require("../controllers/rideC");
// Ride tracking
router.get("/ride-status", controller.rideStatus);
router.post("/ride-details", controller.rideDetails);
router.post("/end-ride", controller.endRide);
router.post("/user-rides", controller.userRides);
router.post("/fetch-driver-rides", controller.driverRides);
router.post("/location", controller.rideLocation);
//router.post('/process-payment', controller.processPayment);
module.exports = router;
