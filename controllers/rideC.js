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
  console.log("end ride request arrived");
  try {
    const { ride, dd } = req.body;
    console.log(dd);
    const ride1 = await Ride.findById(ride._id);
    if (ride1.mode != "Carpool") {
      ride1.status = "Completed";
      await ride1.save();
      res.send({ status: "completed" });
    } else {
      for (i of ride1.passengers) {
        i.distance += dd.distance;
        i.duration += dd.duration;
        i.fare += (25 * dd.distance) / (1000 * ride1.passengers.length);
      }
      ride1.status = "Completed";
      await ride1.save();
      res.send(ride1);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
/**
 * @param rideId (string)
 * @param driverId (string)
 * @param location (GeoJSON)
 * @description saves location of an ongoing ride from driver side
 */
exports.rideLocation = async (req, res, next) => {
  console.log("ride location update");
  try {
    const { rideId, driverId, location } = req.body;
    const ride = await Ride.findById(rideId);
    ride.currentLocation = location;
    await ride.save();
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * @param rideId (string)
 * @description  takes rideId and returns ride details
 * @returns ride,  Single Ride
 */
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

/**
 * @param riderId (string)
 * @description  takes userId and returns all rides created or joined(Carpooled) by user
 * @returns An array of rides
 */
exports.userRides = async (req, res, next) => {
  console.log("user rides fetch");
  try {
    const { riderId } = req.body;
    //console.log(riderId);
    const rides = await Ride.find({
      "passengers.rider": mongoose.Types.ObjectId(riderId),
    });
    console.log(rides.length);
    res.send(rides);
  } catch (error) {
    res.status(400).send(error);
  }
};
/**
 * @param driverId (string)
 * @description  takes driverId and returns all rides offered or accepted by driver
 * @returns An array of rides
 */
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

/**
 * @param ride the original carpooling ride request
 * @param waypoints.pass the ride request of the other passenger being onboarded
 * @param waypoints.dd distance , duration traveled from previous waypoint/startLocation to new detour point
 * @param waypoints.new the updated distance and duration of the ride
 * @description onboards new passengers in carpooling
 */

exports.addPooler = async (req, res, next) => {
  console.log("adding pooler");
  try {
    const { ride, waypoints, new1 } = req.body;
    console.log(req.body.new1);
    const rid = waypoints[0];
    const { pass, dd } = rid;
    const ride1 = await Ride.findById(ride._id);
    var c = 1;
    for (i of ride1.passengers) {
      i.distance += dd.distance;
      i.duration += dd.duration;
      i.fare += (25 * dd.distance) / (1000 * c);
      c++;
    }
    ride1.waypoints.push(pass.startLocation);
    ride1.waypointsAddress.push(pass.startAddress);
    ride1.passengers.push(pass.rider);
    ride1.distance = new1.distance;
    ride1.duration = new1.duration;
    ride1.fare = (25 * new1.distance) / 1000;
    await ride1.save();
    const ride2 = await Ride.findByIdAndRemove(pass._id);
    //await ride2.save();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
