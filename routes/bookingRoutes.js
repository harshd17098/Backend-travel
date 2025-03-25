// routes/bookingRoutes.js
const express = require('express');
const Booking = require('../model/bookingSchema');
const Flight = require('../model/flightSchema');
const authMiddleware = require('../config/auth');

const router = express.Router();

router.post('/bookFlight', authMiddleware, async (req, res) => {
//   const { flightId, selectedSeats } = req.body;
  try {
    
     const flight = await Flight.findById(req.body.flightId);
    //  console.log(flight.cost);
    //  console.log(req.body.selectedSeats.length);
     const totalCosts = req.body.selectedSeats.length * flight.cost;
    //  console.log(totalCosts);
    req.body.userId = req.user._id,
    req.body.totalCost = totalCosts
    req.body.seats = req.body.selectedSeats
    req.body.status="confirmed"
    // console.log(req.body);

    const rec= await Booking.create(req.body)
    if (rec) {
         res.status(201).json({ message: 'Flight booked successfully', rec });
    };
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error });
  }
});

router.get('/getFlight', authMiddleware, async (req, res) => {
      
      try {
         let getBooking = await Booking.find({})
         if (getBooking) {
            res.status(201).json({ message: 'Flight booked successfully', getBooking});
         }
      } catch (error) {
        res.status(500).json({ message: 'Booking failed', error });
      }
    });

module.exports = router;
