const Claim = require("../models/Claim");


const createClaim = async (req, res) => {
  try {
    const claim = new Claim(req.body);

    const savedClaim = await claim.save();

    res.status(201).json(savedClaim);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create claim",
      error: error.message
    });
  }
};

// Get 
const getClaims = async (req, res) => {
  try {
    const claims = await Claim.find().populate("petReport");

    res.status(200).json(claims);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get claims",
      error: error.message
    });
  }
};

// Get 
const getClaimById = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id).populate("petReport");

    if (!claim) {
      return res.status(404).json({
        message: "Claim not found"
      });
    }

    res.status(200).json(claim);
  } catch (error) {
    res.status(400).json({
      message: "Invalid claim ID",
      error: error.message
    });
  }
};

// Update
const updateClaim = async (req, res) => {
  try {
    const updatedClaim = await Claim.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate("petReport");

    if (!updatedClaim) {
      return res.status(404).json({
        message: "Claim not found"
      });
    }

    res.status(200).json(updatedClaim);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update claim",
      error: error.message
    });
  }
};

// Delete 
const deleteClaim = async (req, res) => {
  try {
    const deletedClaim = await Claim.findByIdAndDelete(req.params.id);

    if (!deletedClaim) {
      return res.status(404).json({
        message: "Claim not found"
      });
    }

    res.status(200).json({
      message: "Claim deleted successfully",
      deletedClaim
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete claim",
      error: error.message
    });
  }
};

module.exports = {
  createClaim,
  getClaims,
  getClaimById,
  updateClaim,
  deleteClaim
};