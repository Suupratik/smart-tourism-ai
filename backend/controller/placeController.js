const Place = require("../models/Place");
const fs = require("fs");
const path = require("path");

// delete old image
function removeFile(imgPath) {
  try {
    if (!imgPath) return;
    const fullPath = path.join(__dirname, "..", imgPath);
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
  } catch (e) {
    console.error(e);
  }
}

// create place
exports.createPlace = async (req, res) => {
  const { name, location, ticketPrice, description } = req.body;

  const image = req.file ? `/uploads/places/${req.file.filename}` : "";

  const place = await Place.create({
    name,
    location,
    ticketPrice,
    description,
    image
  });

  res.status(201).json({ message: "Place created", place });
};

// view all places
exports.getPlaces = async (req, res) => {
  const places = await Place.find();
  res.json({ total: places.length, places });
};

// view single place
exports.getSinglePlace = async (req, res) => {
  const place = await Place.findById(req.params.id);
  res.json(place);
};

// delete place
exports.deletePlace = async (req, res) => {
  const place = await Place.findById(req.params.id);
  removeFile(place.image);

  await Place.findByIdAndDelete(req.params.id);

  res.json({ message: "Place deleted" });
};

// update place
exports.updatePlace = async (req, res) => {
  try {
    const { name, location, ticketPrice, description } = req.body;

    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    // if new image uploaded → delete old one
    if (req.file) {
      removeFile(place.image);
      place.image = `/uploads/places/${req.file.filename}`;
    }

    place.name = name || place.name;
    place.location = location || place.location;
    place.ticketPrice = ticketPrice || place.ticketPrice;
    place.description = description || place.description;

    await place.save();

    res.json({ message: "Place updated", place });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};