const express = require("express");
const router = express.Router();
const controller = require("../controllers/hotspotsC");

router.post("/fetch", controller.fetchHotspot);
router.post("/add", controller.addHotspot);
router.post("/update", controller.voteHotspot);
router.post("/remove", controller.removeVote);

module.exports = router;
