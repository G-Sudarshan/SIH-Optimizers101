const express = require("express");
const PlacmentRouter = express.Router();
const {
  addPlacementRecords,
  deleteAllRecords,
  getAllPlacementRecords,
  addPlacementRecordsCSV,
} = require("../controllers/PlacementController");

PlacmentRouter.post("/addPlacementRecords", addPlacementRecords);
PlacmentRouter.post("/addPlacementRecordsCSV", addPlacementRecordsCSV);
PlacmentRouter.delete("/deleteAllRecords", deleteAllRecords);
PlacmentRouter.get("/getAllPlacementRecords", getAllPlacementRecords);

module.exports = PlacmentRouter;
