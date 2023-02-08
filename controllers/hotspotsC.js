const {Rider, Driver, Ride , Hotspots} = require('../models/Schemas');

exports.addHotspot = async (req, res, next) => {
    try {
      const { hotspot} = req.body;
      const hotspots = new Hotspots({
        name : hotspot.name,
        location : hotspot.locaion
      })
      await hotspots.save()
      res.send({});
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  exports.fetchHotspot = async (req, res, next) => {
    try {
      const { location} = req.body;
      const hotspots = await Hotspots.find({}).where(location).within(500)
      res.send({hotspots});
    } catch (error) {
      res.status(400).send(error);
    }
  };

  exports.voteHotspot = async (req, res, next) => {
    try {
      const { hotspotId} = req.body;
      const hotspots = await Hotspots.findById(hotspotId);
      hotspots.votes = hotspots.votes + 1
      await hotspots.save()
      res.send({hotspots});
    } catch (error) {
      res.status(400).send(error);
    }
  };