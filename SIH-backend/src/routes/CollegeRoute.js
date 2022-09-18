const express = require("express");
const { AddCollege, PutReasons } = require("../controllers/CollegeController");

const CollegeRouter = express.Router();

CollegeRouter.post("/addCollege", AddCollege);
CollegeRouter.put("/putReasons/:id", PutReasons);

module.exports = CollegeRouter;
