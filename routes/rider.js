const express = require("express");
const router = express.Router();
const controller = require("../controllers/ridersC");

// User authentication
router.post("/signup", controller.signup);
router.post("/login", controller.login);
//
router.post("/request-ride", controller.requestRide);
router.post("/accept-ride", controller.acceptRide);
router.post("/continue-ride", controller.continueRide);
// Rating and feedback
router.post("/rate", controller.rate);
router.post("/location", controller.updateLocation);
router.post("/details", controller.userDetails);

module.exports = router;
