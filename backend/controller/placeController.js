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
  try {
    const {
      name,
      location,
      ticketPrice,
      description,
      latitude,
      longitude
    } = req.body;

    const image = req.file ? `/uploads/places/${req.file.filename}` : "";

    const place = await Place.create({
      name,
      location,
      ticketPrice,
      description,
      latitude,
      longitude,
      image
    });

    res.status(201).json({ message: "Place created", place });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Create failed" });
  }
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

  if (!place) {
    return res.status(404).json({ message: "Place not found" });
  }

  removeFile(place.image);
  await Place.findByIdAndDelete(req.params.id);

  res.json({ message: "Place deleted" });
};

// update place
exports.updatePlace = async (req, res) => {
  try {
    const {
      name,
      location,
      ticketPrice,
      description,
      latitude,
      longitude
    } = req.body;

    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    // image update
    if (req.file) {
      removeFile(place.image);
      place.image = `/uploads/places/${req.file.filename}`;
    }

    // update fields
    place.name = name || place.name;
    place.location = location || place.location;
    place.ticketPrice = ticketPrice || place.ticketPrice;
    place.description = description || place.description;

    // ✅ IMPORTANT FIX
    place.latitude = latitude || place.latitude;
    place.longitude = longitude || place.longitude;

    await place.save();

    res.json({ message: "Place updated", place });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};