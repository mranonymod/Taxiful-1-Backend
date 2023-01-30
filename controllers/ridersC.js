const {Rider, Driver, Ride } = require('../models/Schemas');
const rider=Rider

exports.signup = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const rider = new rider({ name, email, password });
      await rider.save();
      const token = await rider.generateAuthToken();
      res.status(201).send({ rider, token });
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const rider = await rider.findByCredentials(email, password);
      const token = await rider.generateAuthToken();
      res.send({ rider, token });
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  exports.updateLocation = async (req, res, next) => {
    try {
      const { riderId, location } = req.body;
      const rider = await rider.findById(riderId);
      rider.location = location;
      await rider.save();
      res.send();
    } catch (error) {
      res.status(400).send(error);
    }
  };

  exports.requestRide = async (req, res, next) => {
    try {
      const { riderId, startLocation, endLocation } = req.body;
      const ride = new Ride({
        riderId,
        startLocation,
        endLocation,
        status: 'pending'
      });
      await ride.save();
      res.send({ ride });
    } catch (error) {
      res.status(400).send(error);
    }
  };

  
exports.acceptRide = async (req, res, next) => {
  try {
    const { driverId, rideId ,fare,distance} = req.body;
    const ride = await Ride.findById(rideId);
    ride.driverId = driverId;
    ride.fare=fare;
    ride.status = 'accepted';
    await ride.save();
    res.send({ ride });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.rate=async(req,res, next)=>{
  try {
const { driverId , review}=req.body
    const driver= await Driver.findById(driverId);
    driver.reviews.push(review)
  }
  catch(error){res.status(400).send(error)}
};
  