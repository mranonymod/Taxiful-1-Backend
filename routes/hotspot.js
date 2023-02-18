const express = require("express");
const router = express.Router();
const controller = require("../controllers/hotspotsC");

router.post("/fetch", controller.fetchHotspot);
router.post("/add", controller.addHotspot);
router.post("/update", controller.voteHotspot);

module.exports = router;
