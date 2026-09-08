const FoundPetReport = require("../models/FoundPetReport");
const path = require("path");
const fs = require("fs");

const createFoundPetReport = async (req, res) => {
  try {
    const foundPetReport = new FoundPetReport({
  ...req.body,
  image: req.file ? req.file.path : undefined,
  createdBy: req.user._id
});

    const savedReport = await foundPetReport.save();

    res.status(201).json(savedReport);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create found pet report",
      error: error.message
    });
  }
};


const getFoundPetReports = async (req, res) => {
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

    // Search in multiple fields
    if (search) {
      filter.$or = [
        { animalName: { $regex: search, $options: "i" } },
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

    // Filter by date found
    if (fromDate || toDate) {
      filter.dateFound = {};

      if (fromDate) {
        filter.dateFound.$gte = new Date(fromDate);
      }

      if (toDate) {
        const endDate = new Date(toDate);
        endDate.setHours(23, 59, 59, 999);

        filter.dateFound.$lte = endDate;
      }
    }

    const reports = await FoundPetReport.find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: reports.length,
      reports
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to search/filter found pet reports",
      error: error.message
    });
  }
};


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


const updateFoundPetReport = async (req, res) => {
  try {
    const report = await FoundPetReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Found pet report not found"
      });
    }

    // Check ownership
    if (report.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only update your own found pet reports"
      });
    }

    // Do not allow changing the owner
    delete req.body.createdBy;

    // Replace old image if a new image was uploaded
if (req.file) {
  if (report.image) {
    // Convert stored Windows backslashes to the correct path separator
    const oldImagePath = path.resolve(
      report.image.replace(/\\/g, path.sep)
    );

    console.log("Old image path:", oldImagePath);
    console.log("Does old image exist?", fs.existsSync(oldImagePath));

    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
      console.log("OLD IMAGE DELETED");
    }
  }

  report.image = req.file.path;
}

    Object.assign(report, req.body);

    const updatedReport = await report.save();

    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update found pet report",
      error: error.message
    });
  }
};


const deleteFoundPetReport = async (req, res) => {
  try {
    const report = await FoundPetReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Found pet report not found"
      });
    }

    // Check ownership
    if (report.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only delete your own found pet reports"
      });
    }

    // Delete uploaded image
if (report.image) {
  const imagePath = path.resolve(
    report.image.replace(/\\/g, path.sep)
  );

  console.log("Image path:", imagePath);
  console.log("Does image exist?", fs.existsSync(imagePath));

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
    console.log("IMAGE DELETED");
  }
}
    await FoundPetReport.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Found pet report deleted successfully",
      deletedReport: report
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