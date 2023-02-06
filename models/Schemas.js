const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jwt = require('jsonwebtoken');

const ReviewDriver = new Schema({
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
      maxlength: 500,
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'Rider',
      required: true,
    },
  }, {
    timestamps: true,
  });

const ReviewRider= new Schema({
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
      maxlength: 500,
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
      required: true,
    },
  }, {
    timestamps: true,
  });

const OfferSchema = new Schema ({
  driver: { type: Schema.Types.ObjectId, ref: 'Driver' },
  fare :Number,
  distance:Number  
}, {
  timestamps: true,
})

const GeoJSON = new Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    //index: '2dsphere'
  }
});

const RiderSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  location: {
    type : GeoJSON,
    index : '2dsphere'
  },
  reviews: [ReviewRider],
});
//RiderSchema.index({ location: '2dsphere' });

const DriverSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  location: {
    type : GeoJSON,
    index : '2dsphere'
  },
  carModel: String,
  licensePlate: String,
  reviews: [ReviewDriver],
});
//DriverSchema.index({ location: '2dsphere' });

const RideSchema = new Schema({
  rider: { type: Schema.Types.ObjectId, ref: 'Rider' },
  driver: { type: Schema.Types.ObjectId, ref: 'Driver' },
  startLocation: GeoJSON,
  endLocation: GeoJSON,
  currentLocation : {
    type : GeoJSON,
    index : '2dsphere'
  },
  timestamp: Date,
  distance: Number,
  fare: Number,
  sharing : Boolean ,
  offers : [OfferSchema],
  status: {
    type: String,
    enum: ['Requested', 'Accepted','Waiting', 'On-Ride', 'Completed'],
    default: 'Requested'
  }
});

RiderSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
  };
DriverSchema.methods.generateAuthToken = async function() {
      const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
      return token;
    };

const Rider = mongoose.model('Rider', RiderSchema);
const Driver = mongoose.model('Driver', DriverSchema);
const Ride = mongoose.model('Ride', RideSchema);

module.exports = { Rider, Driver, Ride };
