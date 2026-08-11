const express = require("express");

const {
  createFoundPetReport,
  getFoundPetReports,
  getFoundPetReportById,
  updateFoundPetReport,
  deleteFoundPetReport
} = require("../controllers/foundPetReportController");

const router = express.Router();

router.post("/", createFoundPetReport);
router.get("/", getFoundPetReports);
router.get("/:id", getFoundPetReportById);
router.patch("/:id", updateFoundPetReport);
router.delete("/:id", deleteFoundPetReport);

module.exports = router;