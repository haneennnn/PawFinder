const mongoose = require("mongoose");

const rescueCaseSchema = new mongoose.Schema(
  {
    animalName: {
      type: String,
      required: true,
      trim: true
    },

    animalType: {
      type: String,
      required: true,
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

    rescueStatus: {
      type: String,
      enum: ["reported", "in-progress", "rescued"],
      default: "reported"
    },

    organizationName: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("RescueCase", rescueCaseSchema);