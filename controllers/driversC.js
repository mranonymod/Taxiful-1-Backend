const {Rider, Driver, Ride } = require('../models/Schemas');
const driver=Driver

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password ,carModel , licensePlate} = req.body;
    const driver = new driver({ name, email, password ,carModel , licensePlate});
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
    const driver = await driver.findByCredentials(email, password);
    const token = await driver.generateAuthToken();
    res.send({ driver, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateLocation = async (req, res, next) => {
  try {
    const { driverId, location } = req.body;
    const driver = await driver.findById(driverId);
    driver.location = location;
    await driver.save();
    res.send();
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.offerRide = async (req, res, next) => {
  try {
    const { driverId, rideId ,fare , distance} = req.body;
    const ride = await Ride.findById(rideId);
    offerX={driver : driversId,
    fare : fare,
  distance:distance}
    ride.offers.push(offerX)
    //ride.status = 'accepted';
    await ride.save();
    res.send({ ride });
  } catch (error) {
    res.status(400).send(error);
  }
};



