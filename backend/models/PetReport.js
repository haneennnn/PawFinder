const mongoose = require("mongoose");

const petReportSchema = new mongoose.Schema(
  {
    petName: {
      type: String,
      required: true,
      trim: true
    },

    animalType: {
      type: String,
      required: true,
      trim: true
    },

    breed: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    status: {
      type: String,
      required: true,
      enum: ["lost", "found"],
      default: "lost"
    },

    description: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("PetReport", petReportSchema);