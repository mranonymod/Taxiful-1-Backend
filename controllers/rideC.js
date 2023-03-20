const { Rider, Driver, Ride } = require("../models/Schemas");

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
  //console.log(req.body);
  try {
    const { riderId } = req.body;
    const rides = await Ride.find({ passenger: { rider: [riderId] } });
    res.send(rides);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.driverRides = async (req, res, next) => {
  console.log("drivers rides fetch(offered and accepted)");
  //console.log(req.body);
  try {
    const { driverId } = req.body;
    const rides = await Ride.find({ driver: driverId });
    res.send(rides);
  } catch (error) {
    res.status(400).send(error);
  }
};
