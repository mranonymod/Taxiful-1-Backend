const { Rider, Driver, Ride, Hotspots } = require("../models/Schemas");

exports.addHotspot = async (req, res, next) => {
  console.log("add");
  console.log(req.body);
  try {
    const hotspot = req.body;
    const hotspots = new Hotspots({
      name: hotspot.name,
      location: hotspot.location,
    });
    await hotspots.save();
    res.send({ hotspots });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.fetchHotspot = async (req, res, next) => {
  console.log("fetch");
  console.log(req.body);
  try {
    const { coordinates } = req.body;
    const hotspots = await Hotspots.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: coordinates,
          },
          $maxDistance: 1000,
        },
      },
    });
    console.log(hotspots);
    res.send({ hotspots });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.voteHotspot = async (req, res, next) => {
  try {
    const { hotspotId } = req.body;
    const hotspots = await Hotspots.findById(hotspotId);
    hotspots.votes = hotspots.votes + 1;
    await hotspots.save();
    res.send({ hotspots });
  } catch (error) {
    res.status(400).send(error);
  }
};
