const express = require("express");
const upload = require("../middleware/upload");

const {
  createPetReport,
  getPetReports,
  getPetReportById,
  updatePetReport,
  deletePetReport
} = require("../controllers/petReportController");

const router = express.Router();
router.post("/", upload.single("image"), createPetReport);
router.get("/", getPetReports);
router.get("/:id", getPetReportById);
router.patch("/:id", updatePetReport);
router.delete("/:id", deletePetReport);

module.exports = router;