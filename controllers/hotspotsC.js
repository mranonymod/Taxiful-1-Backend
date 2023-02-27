const { Rider, Driver, Ride, Hotspots } = require("../models/Schemas");

exports.addHotspot = async (req, res, next) => {
  console.log("add hotspot");
  //console.log(req.body);
  try {
    const hotspot = req.body;
    const hotspots = new Hotspots({
      name: hotspot.name,
      location: hotspot.location,
      votes: [hotspot.userId],
    });
    await hotspots.save();
    res.send({ hotspots });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.fetchHotspot = async (req, res, next) => {
  console.log("fetch hotspot");
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
  console.log("vote hotspot");
  try {
    const { hotspotId, userId } = req.body;
    const hotspots = await Hotspots.findById(hotspotId);

    if (hotspots.votes.includes(userId)) {
      return res.status(400).json({ message: "Already upvoted" });
    }

    hotspots.votes.push(userId);
    await hotspots.save();
    res.send({ hotspots });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.removeVote = async (req, res, next) => {
  console.log("remove hotspot");
  try {
    const { hotspotId, userId } = req.body;
    const hotspots = await Hotspots.findById(hotspotId);
    hotspots.votes.pull(userId);
    await hotspots.save();
    res.send({ hotspots });
  } catch (error) {
    res.status(400).send(error);
  }
};
