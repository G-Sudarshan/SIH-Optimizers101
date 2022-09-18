const {
  getAllStudentsByYearAndBranch,
  getAllStudentsBySkills,
} = require("../controllers/StudentController");
const express = require("express");
const StudentRouter = express.Router();

StudentRouter.post(
  "/getAllStudentsByYearAndBranch",
  getAllStudentsByYearAndBranch
);
StudentRouter.post("/getAllStudentsBySkills", getAllStudentsBySkills);

module.exports = StudentRouter;
