const PetReport = require("../models/PetReport");
const deleteUploadedFile = require("../utils/deleteUploadedFile");
const path = require("path");


const createPetReport = async (req, res) => {
  try {
    const petReport = new PetReport({
      ...req.body,
      image: req.file ? req.file.path : null,
    });

    const savedReport = await petReport.save();

    res.status(201).json(savedReport);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create pet report",
      error: error.message,
    });
  }
};


const getPetReports = async (req, res) => {
  try {
    const petReports = await PetReport.find();

    res.status(200).json(petReports);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get pet reports",
      error: error.message,
    });
  }
};


const getPetReportById = async (req, res) => {
  try {
    const petReport = await PetReport.findById(req.params.id);

    if (!petReport) {
      return res.status(404).json({
        message: "Pet report not found",
      });
    }

    res.status(200).json(petReport);
  } catch (error) {
    res.status(400).json({
      message: "Invalid pet report ID",
      error: error.message,
    });
  }
};


const updatePetReport = async (req, res) => {
  try {
    const petReport = await PetReport.findById(req.params.id);

    if (!petReport) {
      return res.status(404).json({
        message: "Pet report not found",
      });
    }

    // If a new image was uploaded delete the old image
    if (req.file) {
      if (petReport.image) {
        const oldFilename = path.basename(petReport.image);

        deleteUploadedFile("petReports", oldFilename);
      }

      petReport.image = req.file.path;
    }

    // Update the other fields
    Object.assign(petReport, req.body);

    const updatedPetReport = await petReport.save();

    res.status(200).json(updatedPetReport);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update pet report",
      error: error.message,
    });
  }
};


const deletePetReport = async (req, res) => {
  try {
    const petReport = await PetReport.findById(req.params.id);

    if (!petReport) {
      return res.status(404).json({
        message: "Pet report not found",
      });
    }

    // Delete uploaded image if it exists
    if (petReport.image) {
      const filename = path.basename(petReport.image);

      deleteUploadedFile("petReports", filename);
    }

    // Delete the report from MongoDB
    await PetReport.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Pet report deleted successfully",
      deletedPetReport: petReport,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete pet report",
      error: error.message,
    });
  }
};

module.exports = {
  createPetReport,
  getPetReports,
  getPetReportById,
  updatePetReport,
  deletePetReport,
};