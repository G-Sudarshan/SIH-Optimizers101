const express = require("express");
const ChartRouter = express.Router();
const {
  PlacedUnplacedGraph,
  programWisePlacement,
  stateWisePlacement,
  institutionTypeWisePlacement,
  categoryWiseEnrollment,
  yearWisePlacement,
  programGenderWisePlacement,
} = require("../controllers/ChartController");

ChartRouter.get("/placedUnplacedGraph/:id", PlacedUnplacedGraph);
ChartRouter.post("/programWisePlacement", programWisePlacement);
ChartRouter.post("/stateWisePlacement", stateWisePlacement);
ChartRouter.post("/institutionTypeWisePlacement", institutionTypeWisePlacement);
ChartRouter.post("/categoryWiseEnrollment", categoryWiseEnrollment);
ChartRouter.post("/yearWisePlacement", yearWisePlacement);
ChartRouter.post("/programGenderWisePlacement", programGenderWisePlacement);
module.exports = ChartRouter;
