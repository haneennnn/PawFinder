const PetReport = require("../models/PetReport");
const deleteUploadedFile = require("../utils/deleteUploadedFile");
const path = require("path");



const createPetReport = async (req, res) => {
  try {
    const petReport = new PetReport({
      ...req.body,
      image: req.file ? req.file.path : null,
      createdBy: req.user._id
    });

    const savedReport = await petReport.save();

    res.status(201).json(savedReport);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create pet report",
      error: error.message
    });
  }
};



const getPetReports = async (req, res) => {
  try {
    const {
      search,
      animalType,
      breed,
      location,
      status,
      fromDate,
      toDate
    } = req.query;

    const filter = {};

    // Search by pet name, animal type, breed, location, or description
    if (search) {
      filter.$or = [
        { petName: { $regex: search, $options: "i" } },
        { animalType: { $regex: search, $options: "i" } },
        { breed: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Filter by animal type
    if (animalType) {
      filter.animalType = {
        $regex: animalType,
        $options: "i"
      };
    }

    // Filter by breed
    if (breed) {
      filter.breed = {
        $regex: breed,
        $options: "i"
      };
    }

    // Filter by location
    if (location) {
      filter.location = {
        $regex: location,
        $options: "i"
      };
    }

    // Filter by status
    if (status) {
      filter.status = status;
    }

    // Filter by date
    if (fromDate || toDate) {
      filter.createdAt = {};

      if (fromDate) {
        filter.createdAt.$gte = new Date(fromDate);
      }

      if (toDate) {
        const endDate = new Date(toDate);
        endDate.setHours(23, 59, 59, 999);

        filter.createdAt.$lte = endDate;
      }
    }

    const reports = await PetReport.find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: reports.length,
      reports
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to search/filter pet reports",
      error: error.message
    });
  }
};


const getPetReportById = async (req, res) => {
  try {
    const petReport = await PetReport.findById(req.params.id)
      .populate("createdBy", "name email role");

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



const updatePetReport = async (req, res) => {
  try {
    const petReport = await PetReport.findById(req.params.id);

    if (!petReport) {
      return res.status(404).json({
        message: "Pet report not found"
      });
    }

    // Check if the loggedin user owns this report
    if (petReport.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only update your own pet reports"
      });
    }

    // Replace old image if a new image was uploaded
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
      error: error.message
    });
  }
};


const deletePetReport = async (req, res) => {
  try {
    const petReport = await PetReport.findById(req.params.id);

    if (!petReport) {
      return res.status(404).json({
        message: "Pet report not found"
      });
    }

    // Check if the loggedin user owns this report
    if (petReport.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only delete your own pet reports"
      });
    }

    // Delete uploaded image
    if (petReport.image) {
      const filename = path.basename(petReport.image);

      deleteUploadedFile("petReports", filename);
    }

    // Delete the report
    await PetReport.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Pet report deleted successfully",
      deletedPetReport: petReport
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