const express = require("express");

const {
  createPetReport,
  getPetReports,
  getPetReportById,
  updatePetReport,
  deletePetReport
} = require("../controllers/petReportController");

const router = express.Router();
router.post("/", createPetReport);
router.get("/", getPetReports);
router.get("/:id", getPetReportById);
router.patch("/:id", updatePetReport);
router.delete("/:id", deletePetReport);

module.exports = router;