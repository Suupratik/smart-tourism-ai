const { protect, adminOnly } = require("../middleware/authMiddleware");
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
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  placeController.createPlace
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  placeController.deletePlace
);
router.get("/", placeController.getPlaces);
router.get("/:id", placeController.getSinglePlace);


// ✅ NEW UPDATE ROUTE
router.put("/:id", upload.single("image"), placeController.updatePlace);

module.exports = router;