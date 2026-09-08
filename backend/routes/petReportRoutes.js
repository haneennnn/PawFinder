const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");
const protect = require("../middleware/authMiddleware");

const {
  createPetReport,
  getPetReports,
  getPetReportById,
  updatePetReport,
  deletePetReport
} = require("../controllers/petReportController");


// Create - Login required
router.post(
  "/",
  protect,
  upload.single("image"),
  createPetReport
);


// Get all - Public
router.get("/", getPetReports);


// Get by ID - Public
router.get("/:id", getPetReportById);


// Update - Login required
router.patch(
  "/:id",
  protect,
  upload.single("image"),
  updatePetReport
);


// Delete - Login required
router.delete(
  "/:id",
  protect,
  deletePetReport
);


module.exports = router;