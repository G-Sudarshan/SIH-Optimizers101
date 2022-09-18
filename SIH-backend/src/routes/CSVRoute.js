const express = require("express");

const CSVRouter = express.Router();
const {
  AddCSV,
  getAllCSVRecords,
  deleteAllRecords,
} = require("../controllers/CSVController");

CSVRouter.post("/addCSV", AddCSV);
CSVRouter.get("/getAllCSVData", getAllCSVRecords);

module.exports = CSVRouter;
