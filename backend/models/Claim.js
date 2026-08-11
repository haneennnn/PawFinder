const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    petReport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PetReport",
      required: true
    },

    claimantName: {
      type: String,
      required: true,
      trim: true
    },

    contactEmail: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Claim", claimSchema);