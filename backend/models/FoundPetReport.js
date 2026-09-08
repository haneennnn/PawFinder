const mongoose = require("mongoose");

const foundPetReportSchema = new mongoose.Schema(
  {
    animalName: {
      type: String,
      trim: true
    },

    animalType: {
      type: String,
      required: true,
      trim: true
    },

    breed: {
      type: String,
      trim: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    dateFound: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["found", "reunited"],
      default: "found"
    },

    image: {
      type: String
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "FoundPetReport",
  foundPetReportSchema
);