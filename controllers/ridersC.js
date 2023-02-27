const { Rider, Driver, Ride } = require("../models/Schemas");

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const rider = new Rider({ name, email, password });
    await rider.save();
    const token = await rider.generateAuthToken();
    res.status(201).send({ rider, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const rider = await Rider.findOne({ email: email, password: password });
    const token = await rider.generateAuthToken();
    console.log(token);
    res.send({ rider, token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.updateLocation = async (req, res, next) => {
  console.log("rider location update");
  //console.log(req.body);
  try {
    const { riderId, location } = req.body;
    const rider = await Rider.findById(riderId);
    rider.location = location;
    await rider.save();
    res.send();
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.requestRide = async (req, res, next) => {
  console.log(req.body);
  try {
    const {
      riderId,
      startLocation,
      endLocation,
      currentLocation,
      distance,
      mode,
      fare,
    } = req.body;
    const ride = new Ride({
      riderId: riderId,
      startLocation: startLocation,
      endLocation: endLocation,
      currentLocation: currentLocation,
      distance: distance,
      mode: mode,
      fare: fare,
      status: "Requested",
    });
    await ride.save();
    res.send({ ride });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.acceptRide = async (req, res, next) => {
  try {
    const { driverId, rideId } = req.body;
    const ride = await Ride.findById(rideId);
    ride.driver = driverId;
    ride.fare = fare;
    ride.status = "Accepted";
    await ride.save();
    res.send({ ride });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.rate = async (req, res, next) => {
  try {
    const { driverId, review } = req.body;
    const driver = await Driver.findById(driverId);
    driver.reviews.push(review);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.accessShared = async (req, res, next) => {
  try {
    const { location } = req.body;
    const rides = await Ride.find({ mode: 1 }).where(location).within(500);
    res.json(rides);
  } catch (error) {
    res.status(400).send(error);
  }
};
