const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  createPetReport,
  getPetReports,
  getPetReportById,
  updatePetReport,
  deletePetReport,
} = require("../controllers/petReportController");

router.post("/", upload.single("image"), createPetReport);
router.get("/", getPetReports);
router.get("/:id", getPetReportById);
router.patch("/:id", upload.single("image"), updatePetReport);
router.delete("/:id", deletePetReport);
module.exports = router;