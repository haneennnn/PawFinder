const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const protect = require("../middleware/authMiddleware");

const {
  createFoundPetReport,
  getFoundPetReports,
  getFoundPetReportById,
  updateFoundPetReport,
  deleteFoundPetReport
} = require("../controllers/foundPetReportController");

router.post(
  "/",
  protect,
  upload.single("image"),
  createFoundPetReport
);

router.get("/", getFoundPetReports);

router.get("/:id", getFoundPetReportById);

router.patch(
  "/:id",
  protect,
  upload.single("image"),
  updateFoundPetReport
);

router.delete(
  "/:id",
  protect,
  upload.single("image"),
  deleteFoundPetReport
);

module.exports = router;