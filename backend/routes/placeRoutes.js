const router = require("express").Router();
const path = require("path");
const multer = require("multer");

const placeController = require("../controller/placeController");

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, "..", "uploads", "places")),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `place_${Date.now()}${ext}`);
  }
});

// allow only images
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only image files allowed"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
});

// routes
router.post("/", upload.single("image"), placeController.createPlace);
router.get("/", placeController.getPlaces);
router.get("/:id", placeController.getSinglePlace);
router.delete("/:id", placeController.deletePlace);

// ✅ NEW UPDATE ROUTE
router.put("/:id", upload.single("image"), placeController.updatePlace);

module.exports = router;