const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createGround,
  getGrounds
} = require("../controllers/groundController");

router.post("/create", protect, createGround);
router.get("/", getGrounds);

module.exports = router;