const RescueCase = require("../models/RescueCase");

const createRescueCase = async (req, res) => {
  try {
    const rescueCase = new RescueCase(req.body);

    const savedRescueCase = await rescueCase.save();

    res.status(201).json(savedRescueCase);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create rescue case",
      error: error.message
    });
  }
};

// Get 
const getRescueCases = async (req, res) => {
  try {
    const rescueCases = await RescueCase.find();

    res.status(200).json(rescueCases);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get rescue cases",
      error: error.message
    });
  }
};

// GetID
const getRescueCaseById = async (req, res) => {
  try {
    const rescueCase = await RescueCase.findById(req.params.id);

    if (!rescueCase) {
      return res.status(404).json({
        message: "Rescue case not found"
      });
    }

    res.status(200).json(rescueCase);
  } catch (error) {
    res.status(400).json({
      message: "Invalid rescue case ID",
      error: error.message
    });
  }
};

// Update
const updateRescueCase = async (req, res) => {
  try {
    const updatedRescueCase = await RescueCase.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedRescueCase) {
      return res.status(404).json({
        message: "Rescue case not found"
      });
    }

    res.status(200).json(updatedRescueCase);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update rescue case",
      error: error.message
    });
  }
};

// Delete
const deleteRescueCase = async (req, res) => {
  try {
    const deletedRescueCase = await RescueCase.findByIdAndDelete(
      req.params.id
    );

    if (!deletedRescueCase) {
      return res.status(404).json({
        message: "Rescue case not found"
      });
    }

    res.status(200).json({
      message: "Rescue case deleted successfully",
      deletedRescueCase
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete rescue case",
      error: error.message
    });
  }
};

module.exports = {
  createRescueCase,
  getRescueCases,
  getRescueCaseById,
  updateRescueCase,
  deleteRescueCase
};