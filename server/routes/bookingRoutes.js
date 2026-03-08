const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createBooking,
  getBookings
} = require("../controllers/bookingController");

router.post("/create", protect, createBooking);
router.get("/:groundId", getBookings);

module.exports = router;