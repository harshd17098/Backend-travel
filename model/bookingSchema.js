// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema =  mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  seats: { type: [Number], required: true },
  totalCost: { type: Number, required: true },
  status: { type: String, default: 'Confirmed' },
},);

module.exports = mongoose.model('Booking', bookingSchema);
