const express = require("express");
const router = express.Router();
const controller = require("../controllers/driversC");

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.post("/rides-data", controller.ridesData);
router.post("/offer-ride", controller.offerRide);
router.post("/rate", controller.rate);
router.post("/location", controller.updateLocation);
router.post("/fetch-drivers", controller.fetchDrivers);
router.post("/details", controller.driverDetails);
router.post("/poolerSearch", controller.accessSharedDriv);

module.exports = router;
