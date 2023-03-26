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
    const driver = await Driver.findOne({ email: email, password: password });
    const token = await driver.generateAuthToken();
    res.send({ driver, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateLocation = async (req, res, next) => {
  console.log("driver location update");
  //console.log(req.body);
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
  console.log("RIDE OFFEREDS");
  console.log(req.body);
  try {
    const { driver, rideId, duration } = req.body;
    const ride = await Ride.findById(rideId);
    offerX = { driver: driver, duration: duration };
    ride.offers.push(offerX);
    ride.status = "Offered";
    await ride.save();
    res.send({ ride });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.ridesData = async (req, res, next) => {
  console.log("rides data fetched");
  console.log(req.body);
  try {
    const { driverId, location } = req.body;
    const rides = await Ride.find({
      startLocation: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: location.coordinates,
          },
          $maxDistance: 1000,
        },
      },
      status: "Requested",
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

exports.driverDetails = async (req, res, next) => {
  console.log("driver detail fetch");
  console.log(req.body);
  try {
    const { driverId } = req.body;
    const driver = await Driver.findById(driverId);
    res.send({ driver });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.accessSharedDriv = async (req, res, next) => {
  console.log("pooler searched");
  try {
    const { rideId, location, destination } = req.body;
    const ride1 = await Ride.find({
      _id: { $ne: rideId },
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
    });
    //console.log(ride1);
    let id1 = [];
    for (let i of ride1) {
      id1.push(i._id);
    }
    console.log(id1);
    const ride2 = await Ride.find({
      $and: [
        { _id: id1 }, //]
        { _id: { $ne: rideId } },
      ],
      mode: "Carpool",
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

    // let intersectionResult = [];

    // for (let i of ride1) {
    //   for (let j of ride2) {
    //     console.log(i._id.toString(), j._id.toString());
    //     if (i._id.toString() == j._id.toString()) {
    //       intersectionResult.push(i);
    //     }
    //   }
    // }
    res.json(ride2);
  } catch (error) {
    res.status(400).send(error);
  }
};
