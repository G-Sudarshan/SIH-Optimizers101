const CSV = require("../models/CSV");

const getAllStudentsByYearAndBranch = async (req, res) => {
  const reqParams = req.body;
  let { year, branch, skills, minCGPA, maxCGPA } = reqParams;
  let students;
  try {
    if (year === "" && branch === "" && skills.length === 0) {
      students = await CSV.find({ cgpa: { $gte: minCGPA, $lte: maxCGPA } });
    } else {
      if (year === "") {
        year = await CSV.distinct("year");
      } else {
        let temp = year;
        year = [];
        year.push(temp);
      }
      if (branch === "") {
        branch = await CSV.distinct("branch");
      } else {
        let temp = branch;
        branch = [];
        branch.push(temp);
      }

      if (skills.length === 0) {
        skills = ["C++", "Java", "javascript", "php", "html", "node"];
      }

      students = await CSV.find({
        $and: [
          { year: { $in: year } },
          { branch: { $in: branch } },
          { skills: { $all: skills } },
          { cgpa: { $gte: minCGPA, $lte: maxCGPA } },
        ],
      });
    }

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllStudentsBySkills = async (req, res) => {
  const reqParams = req.body;
  const { skills } = reqParams;
  try {
    const response = await CSV.find({ words: { $in: skills } });
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json(response);
  }
};

module.exports = { getAllStudentsByYearAndBranch, getAllStudentsBySkills };
