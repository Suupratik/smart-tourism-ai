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

