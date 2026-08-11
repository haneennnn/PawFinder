const PetReport = require("../models/PetReport");


const createPetReport = async (req, res) => {
  try {
    const petReport = new PetReport(req.body);

    const savedPetReport = await petReport.save();

    res.status(201).json(savedPetReport);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create pet report",
      error: error.message
    });
  }
};

// Get 
const getPetReports = async (req, res) => {
  try {
    const petReports = await PetReport.find();

    res.status(200).json(petReports);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get pet reports",
      error: error.message
    });
  }
};

// Get 
const getPetReportById = async (req, res) => {
  try {
    const petReport = await PetReport.findById(req.params.id);

    if (!petReport) {
      return res.status(404).json({
        message: "Pet report not found"
      });
    }

    res.status(200).json(petReport);
  } catch (error) {
    res.status(400).json({
      message: "Invalid pet report ID",
      error: error.message
    });
  }
};

// Update 
const updatePetReport = async (req, res) => {
  try {
    const updatedPetReport = await PetReport.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedPetReport) {
      return res.status(404).json({
        message: "Pet report not found"
      });
    }

    res.status(200).json(updatedPetReport);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update pet report",
      error: error.message
    });
  }
};

// Delete 
const deletePetReport = async (req, res) => {
  try {
    const deletedPetReport = await PetReport.findByIdAndDelete(
      req.params.id
    );

    if (!deletedPetReport) {
      return res.status(404).json({
        message: "Pet report not found"
      });
    }

    res.status(200).json({
      message: "Pet report deleted successfully",
      deletedPetReport
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete pet report",
      error: error.message
    });
  }
};

module.exports = {
  createPetReport,
  getPetReports,
  getPetReportById,
  updatePetReport,
  deletePetReport
};