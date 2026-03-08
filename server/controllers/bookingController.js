const Booking = require("../models/Booking");

// CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {

    const { groundId, date, startTime, endTime } = req.body;

    // check if slot already booked
    const existingBooking = await Booking.findOne({
      ground: groundId,
      date: date,
      startTime: startTime,
      endTime: endTime
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "This time slot is already booked"
      });
    }

    const booking = await Booking.create({
      ground: groundId,
      user: req.user._id,
      date,
      startTime,
      endTime
    });

    res.status(201).json(booking);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET BOOKINGS FOR GROUND
exports.getBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({ ground: req.params.groundId });

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};