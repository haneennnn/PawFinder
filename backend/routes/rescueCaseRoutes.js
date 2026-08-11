const express = require("express");

const {
  createRescueCase,
  getRescueCases,
  getRescueCaseById,
  updateRescueCase,
  deleteRescueCase
} = require("../controllers/rescueCaseController");

const router = express.Router();

router.post("/", createRescueCase);
router.get("/", getRescueCases);
router.get("/:id", getRescueCaseById);
router.patch("/:id", updateRescueCase);
router.delete("/:id", deleteRescueCase);

module.exports = router;