const express = require('express');
const router = express.Router();
const controller = require('../controllers/hotspotC');


router.post('/fetch', controller.fetchHotspot);
router.post('/add', controller.addHostspot);
router.post('/update', controller.voteHotspot);

module.exports = router;