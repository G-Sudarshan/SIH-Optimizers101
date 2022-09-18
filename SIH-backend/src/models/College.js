const mongoose = require("mongoose");

const ReasonSchema = new mongoose.Schema({
  reasons: [String],
  year: {
    type: Number,
    required: true,
  },
});

const CollegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    aicte_code: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    isMinority: {
      type: Boolean,
      required: true,
    },
    institutionType: {
      type: String,

      required: true,
    },
    intakeCount: {
      type: Number,
      required: true,
    },
    isWomen: {
      type: Boolean,
      required: true,
      default: false,
    },
    program: [String],
    reasons: [ReasonSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("College", CollegeSchema);
