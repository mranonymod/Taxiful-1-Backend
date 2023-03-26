const { Rider, Driver, Ride } = require("../models/Schemas");
var mongoose = require("mongoose");
exports.rideStatus = async (req, res, next) => {
  try {
    const { rideId } = req.params;
    const ride = await Ride.findById(rideId);
    res.send({ status: ride.status });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.endRide = async (req, res, next) => {
  try {
    const { rideId } = req.params;
    const ride = await Ride.findById(rideId);
    ride.status = "completed";
    await ride.save();
    res.send({ status: "completed" });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.rideLocation = async (req, res, next) => {
  console.log("single ride detail fetch");
  try {
    const { rideId, driverId, location } = req.body;
    const ride = await Ride.findById(rideId);
    ride.currentLocation = location;
    await ride.save();
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.rideDetails = async (req, res, next) => {
  console.log("single ride detail fetch");
  try {
    const { rideId } = req.body;
    const ride = await Ride.findById(rideId);
    res.send(ride);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.userRides = async (req, res, next) => {
  console.log("user rides fetch");
  try {
    const { riderId } = req.body;
    console.log(riderId);
    const rides = await Ride.find({
      "passengers.rider": mongoose.Types.ObjectId(riderId),
    });
    console.log(rides.length);
    res.send(rides);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.driverRides = async (req, res, next) => {
  console.log("drivers rides fetch(offered and accepted)");
  console.log(req.body);
  try {
    const { driverId } = req.body;
    const rides = await Ride.find({
      $or: [
        { driver: driverId },
        {
          "offers.driver": mongoose.Types.ObjectId(driverId),
        },
      ],
    });
    // const rides = await Ride.find({
    //   "offers.driver": mongoose.Types.ObjectId(driverId),
    // });
    res.send(rides);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.addPooler = async (req, res, next) => {
  console.log("adding pooler");
  try {
    const { ride, waypoints } = req.body;
    console.log(req.body.waypoints);
    const rid = waypoints[0];
    const { pass, dd } = rid;
    const ride1 = await Ride.findById(ride._id);
    for (i of ride1.passengers) {
      i.distance += dd.distance;
      i.duration += dd.duration;
    }
    ride1.waypoints.push(pass.startLocation);
    ride1.waypointsAddress.push(pass.startAddress);
    ride1.passengers.push(pass.rider);

    await ride1.save();
    const ride2 = await Ride.findByIdAndRemove(pass._id);
    //await ride2.save();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
