const express = require("express");

const {
  createClaim,
  getClaims,
  getClaimById,
  updateClaim,
  deleteClaim
} = require("../controllers/claimController");

const router = express.Router();

router.post("/", createClaim);
router.get("/", getClaims);
router.get("/:id", getClaimById);
router.patch("/:id", updateClaim);
router.delete("/:id", deleteClaim);

module.exports = router;