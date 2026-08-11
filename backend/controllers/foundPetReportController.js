const FoundPetReport = require("../models/FoundPetReport");


const createFoundPetReport = async (req, res) => {
  try {
    const foundPetReport = new FoundPetReport(req.body);

    const savedReport = await foundPetReport.save();

    res.status(201).json(savedReport);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create found pet report",
      error: error.message
    });
  }
};

// Get
const getFoundPetReports = async (req, res) => {
  try {
    const reports = await FoundPetReport.find();

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get found pet reports",
      error: error.message
    });
  }
};

// GetID
const getFoundPetReportById = async (req, res) => {
  try {
    const report = await FoundPetReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Found pet report not found"
      });
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(400).json({
      message: "Invalid found pet report ID",
      error: error.message
    });
  }
};

// Update
const updateFoundPetReport = async (req, res) => {
  try {
    const updatedReport = await FoundPetReport.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedReport) {
      return res.status(404).json({
        message: "Found pet report not found"
      });
    }

    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update found pet report",
      error: error.message
    });
  }
};

// Delete
const deleteFoundPetReport = async (req, res) => {
  try {
    const deletedReport = await FoundPetReport.findByIdAndDelete(
      req.params.id
    );

    if (!deletedReport) {
      return res.status(404).json({
        message: "Found pet report not found"
      });
    }

    res.status(200).json({
      message: "Found pet report deleted successfully",
      deletedReport
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete found pet report",
      error: error.message
    });
  }
};

module.exports = {
  createFoundPetReport,
  getFoundPetReports,
  getFoundPetReportById,
  updateFoundPetReport,
  deleteFoundPetReport
};