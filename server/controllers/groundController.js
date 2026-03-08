const Ground = require("../models/Ground");

// CREATE GROUND
exports.createGround = async (req, res) => {
  try {

    const { name, location, pricePerHour, amenities } = req.body;

    const ground = await Ground.create({
      name,
      location,
      pricePerHour,
      amenities,
      owner: req.user._id
    });

    res.status(201).json(ground);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET ALL GROUNDS
exports.getGrounds = async (req, res) => {
  try {

    const grounds = await Ground.find();

    res.json(grounds);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};