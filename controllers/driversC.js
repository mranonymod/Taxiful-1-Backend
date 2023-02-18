const { Rider, Driver, Ride } = require("../models/Schemas");

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, carModel, licensePlate } = req.body;
    const driver = new Driver({
      name,
      email,
      password,
      carModel,
      licensePlate,
    });
    await driver.save();
    const token = await driver.generateAuthToken();
    res.status(201).send({ driver, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const driver = await Driver.findByCredentials(email, password);
    const token = await driver.generateAuthToken();
    res.send({ driver, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateLocation = async (req, res, next) => {
  try {
    const { driverId, location } = req.body;
    const driver = await Driver.findById(driverId);
    driver.location = location;
    await driver.save();
    res.send();
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.offerRide = async (req, res, next) => {
  try {
    const { driverId, rideId, fare, distance } = req.body;
    const ride = await Ride.findById(rideId);
    offerX = { driver: driversId, fare: fare, distance: distance };
    ride.offers.push(offerX);
    //ride.status = 'accepted';
    await ride.save();
    res.send({ ride });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.ridesData = async (req, res, next) => {
  try {
    const { driverId, location } = req.body;
    const rides = await Ride.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: location.coordinates,
          },
          $maxDistance: 500,
        },
      },
    });
    res.json(rides);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.rate = async (req, res, next) => {
  try {
    const { riderId, review } = req.body;
    const rider = await Rider.findById(riderId);
    rider.reviews.push(review);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.fetchDrivers = async (req, res, next) => {
  console.log("driver location fetch");
  //console.log(req.body)
  try {
    const { location } = req.body;

    const drivers = await Driver.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: location.coordinates,
          },
          $maxDistance: 3000,
        },
      },
    });
    res.json({ drivers });
  } catch (error) {
    res.status(400).send(error);
  }
};
