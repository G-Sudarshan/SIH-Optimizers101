const mongoose = require("mongoose");

const PlacementSchema = new mongoose.Schema(
  {
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    placedStudentCount: {
      type: Number,
      required: true,
    },
    unplacedStudentCount: {
      type: Number,
      required: true,
    },
    malePlacedStudentCount: {
      type: Number,
      required: true,
    },
    femalePlacedStudentCount: {
      type: Number,
      required: true,
    },
    maleUnplacedStudentCount: {
      type: Number,
      required: true,
    },
    femaleUnplacedStudentCount: {
      type: Number,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    maleCount: {
      type: Number,
      required: true,
    },
    femaleCount: {
      type: Number,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    minorityCount: {
      type: Number,
      required: true,
    },
    minorityCountPlaced: {
      type: Number,
      required: true,
    },
    minorityCountUnplaced: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    institutionType: {
      type: String,
      required: true,
    },
    companyType: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Placement", PlacementSchema);
