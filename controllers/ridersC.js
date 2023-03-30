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

/**
 * @param ride parameters required for ride creation
 * @description ride request creation by customer
 * @returns /{ride} An object consisting of ride
 */
exports.requestRide = async (req, res, next) => {
  console.log(req.body);
  try {
    const {
      rider,
      startLocation,
      endLocation,
      currentLocation,
      startAddress,
      endAddress,
      distance,
      duration,
      mode,
      fare,
    } = req.body;
    const ride = new Ride({
      rider: rider,
      passengers: [{ rider: rider }],
      startLocation: startLocation,
      endLocation: endLocation,
      currentLocation: currentLocation,
      distance: distance,
      duration: duration,
      mode: mode,
      fare: fare,
      status: "Requested",
      startAddress: startAddress,
      endAddress: endAddress,
    });
    await ride.save();
    res.send({ ride });
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * @param driverId (string)
 * @param rideId (string)
 * @description driver is assigned to a ride after offer selection by customer
 * @returns /{ride,driver} An object consisting of ride and driver
 */
exports.acceptRide = async (req, res, next) => {
  console.log("Driver assigned RIDE accepted");
  try {
    const { driverId, rideId } = req.body;
    const ride = await Ride.findById(rideId);
    const driver = await Driver.findById(driverId);
    ride.driver = driverId;
    ride.status = "Accepted";
    await ride.save();
    res.send({ ride, driver });
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * @param rideId (string)
 * @description  takes rideId and returns ride details and driver details for an ongoing ride
 * @returns /{ride,driver} An object consisting of ride and driver
 */
exports.continueRide = async (req, res, next) => {
  console.log(" CONTINUE WITH OLD RIDE");
  try {
    const { rideId } = req.body;
    const ride = await Ride.findById(rideId);
    const driver = await Driver.findById(ride.driver);
    res.send({ ride, driver });
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

exports.accessSharedPass = async (req, res, next) => {
  try {
    const { location, destination } = req.body;
    const rides = await Ride.find({
      mode: "Carpool",
      endLocation: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: destination.coordinates,
          },
          $maxDistance: 500,
        },
      },
      currentLocation: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: location.coordinates,
          },
          $maxDistance: 4000,
        },
      },
    });
    res.json(rides);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.userDetails = async (req, res, next) => {
  console.log("passenger detail fetched");
  try {
    const { riderId } = req.body;
    const rider = await Rider.findById(riderId);
    res.send({ rider });
  } catch (error) {
    res.status(400).send(error);
  }
};
