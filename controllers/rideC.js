const {Rider, Driver, Ride } = require('../models/Schemas');
const Ride = require('[path to Ride model]');

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
      ride.status = 'completed';
      await ride.save();
      res.send({ status: 'completed' });
    } catch (error) {
      res.status(400).send(error);
    }
  };