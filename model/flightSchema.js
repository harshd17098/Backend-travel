const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flightName: {
    type: String,
    required: true,
    trim: true
  },
  departure: {
    type: String,
    required: true,
    trim: true
  },
  arrival: {
    type: String,
    required: true,
    trim: true
  },
  departureTime:{
    type:String,
    required: true,
  },
  arrivalTime:{
    type:String,
    required: true,
  },
  availableFrom:{
    type:String,
    required: true,
  },
  availableTo:{
    type:String,
    required: true,
  },
  cost:{
    type:Number,
    required: true,
  },
  adminId:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"Admin",
   required:true
  }
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
