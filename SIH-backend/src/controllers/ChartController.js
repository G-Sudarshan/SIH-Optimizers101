const Placement = require("../models/Placement");

const PlacedUnplacedGraph = async (req, res) => {
  const collegeId = req.params.id;
  let responseObj = {
    placedStudentCount: 0,
    unplacedStudentCount: 0,
    malePlacedStudentCount: 0,
    femalePlacedStudentCount: 0,
    maleUnplacedStudentCount: 0,
    femaleUnplacedStudentCount: 0,
  };
  try {
    const response = await Placement.find(
      { collegeId },
      {
        _id: 0,
        placedStudentCount: 1,
        unplacedStudentCount: 1,
        malePlacedStudentCount: 1,
        femalePlacedStudentCount: 1,
        maleUnplacedStudentCount: 1,
        femaleUnplacedStudentCount: 1,
      }
    );

    for (let i = 0; i < response.length; i++) {
      responseObj.placedStudentCount += response[i].placedStudentCount;
      responseObj.unplacedStudentCount += response[i].unplacedStudentCount;
      responseObj.malePlacedStudentCount += response[i].malePlacedStudentCount;
      responseObj.maleUnplacedStudentCount +=
        response[i].maleUnplacedStudentCount;
      responseObj.femalePlacedStudentCount +=
        response[i].femalePlacedStudentCount;
      responseObj.femaleUnplacedStudentCount +=
        response[i].femaleUnplacedStudentCount;
    }
    res.status(200).json(responseObj);
  } catch (error) {
    res.status(500).json(error);
  }
};

const programWisePlacement = async (req, res) => {
  const reqParams = req.body;

  let { year, gender, state, institutionType, minority } = reqParams;
  //const { year,  program } = reqParams;

  try {
    let count;
    if (state === "") {
      state = await Placement.distinct("state");
      console.log(state);
    } else {
      let temp = state;
      state = [];
      state.push(temp);
    }
    if (institutionType === "") {
      institutionType = await Placement.distinct("institutionType");
      console.log(institutionType);
    } else {
      let temp = institutionType;
      institutionType = [];
      institutionType.push(temp);
    }

    if (year === "") {
      year = await Placement.distinct("year");
      console.log(year);
    } else {
      let temp = year;
      year = [];
      year.push(temp);
    }

    console.log(year, gender, state, institutionType, minority);
    //console.log(year,program);
    if (
      year === "" &&
      gender === "" &&
      state === "" &&
      institutionType === "" &&
      minority === ""
    ) {
      count = await Placement.aggregate([
        {
          $group: {
            _id: "$program",
            placedStudentCount: { $sum: "$placedStudentCount" },
            unplacedStudentCount: { $sum: "$unplacedStudentCount" },
          },
        },
      ]);
    } else if (gender !== "") {
      //console.log("In else if gender");
      count = await Placement.aggregate([
        {
          $match: {
            $and: [
              { year: { $in: year } },
              { state: { $in: state } },
              { institutionType: { $in: institutionType } },
            ],
          },
        },
        {
          $group: {
            _id: "$program",
            placedStudentCount: { $sum: "$femalePlacedStudentCount" },
            unplacedStudentCount: { $sum: "$femaleUnplacedStudentCount" },
          },
        },
      ]);
    } else if (minority !== "") {
      //console.log("In else if minority");
      count = await Placement.aggregate([
        {
          $match: {
            $and: [
              { year: { $in: year } },
              { state: { $in: state } },
              { institutionType: { $in: institutionType } },
            ],
          },
        },
        {
          $group: {
            _id: "$program",
            placedStudentCount: { $sum: "$minorityCountPlaced" },
            unplacedStudentCount: { $sum: "$minorityCountUnplaced" },
          },
        },
      ]);
    } else {
      //console.log("In else ");
      count = await Placement.aggregate([
        {
          $match: {
            $and: [
              { year: { $in: year } },
              { state: { $in: state } },
              { institutionType: { $in: institutionType } },
            ],
          },
        },
        {
          $group: {
            _id: "$program",
            placedStudentCount: { $sum: "$placedStudentCount" },
            unplacedStudentCount: { $sum: "$unplacedStudentCount" },
          },
        },
      ]);
    }

    res.status(200).json(count);
  } catch (error) {
    res.status(200).json(error);
  }
};

const stateWisePlacement = async (req, res) => {
  const reqParams = req.body;

  let { year, gender, program, institutionType, minority } = reqParams;

  try {
    let count;
    if (program === "") {
      program = await Placement.distinct("program");
      console.log(program);
    } else {
      let temp = program;
      program = [];
      program.push(temp);
    }
    if (institutionType === "") {
      institutionType = await Placement.distinct("institutionType");
      console.log(institutionType);
    } else {
      let temp = institutionType;
      institutionType = [];
      institutionType.push(temp);
    }

    if (year === "") {
      year = await Placement.distinct("year");
      console.log(year);
    } else {
      let temp = year;
      year = [];
      year.push(temp);
    }

    console.log(year, gender, program, institutionType, minority);

    if (
      year === "" &&
      gender === "" &&
      program === "" &&
      institutionType === "" &&
      minority === ""
    ) {
      count = await Placement.aggregate([
        {
          $group: {
            _id: "$state",
            placedStudentCount: { $sum: "$placedStudentCount" },
            unplacedStudentCount: { $sum: "$unplacedStudentCount" },
          },
        },
      ]);
    } else if (gender !== "") {
      //console.log("In else if gender");
      count = await Placement.aggregate([
        {
          $match: {
            $and: [
              { year: { $in: year } },
              { program: { $in: program } },
              { institutionType: { $in: institutionType } },
            ],
          },
        },
        {
          $group: {
            _id: "$state",
            placedStudentCount: { $sum: "$femalePlacedStudentCount" },
            unplacedStudentCount: { $sum: "$femaleUnplacedStudentCount" },
          },
        },
      ]);
    } else if (minority !== "") {
      //console.log("In else if minority");
      count = await Placement.aggregate([
        {
          $match: {
            $and: [
              { year: { $in: year } },
              { program: { $in: program } },
              { institutionType: { $in: institutionType } },
            ],
          },
        },
        {
          $group: {
            _id: "$state",
            placedStudentCount: { $sum: "$minorityCountPlaced" },
            unplacedStudentCount: { $sum: "$minorityCountUnplaced" },
          },
        },
      ]);
    } else {
      //console.log("In else ");
      count = await Placement.aggregate([
        {
          $match: {
            $and: [
              { year: { $in: year } },
              { program: { $in: program } },
              { institutionType: { $in: institutionType } },
            ],
          },
        },
        {
          $group: {
            _id: "$state",
            placedStudentCount: { $sum: "$placedStudentCount" },
            unplacedStudentCount: { $sum: "$unplacedStudentCount" },
          },
        },
      ]);
    }

    res.status(200).json(count);
  } catch (error) {
    res.status(200).json(error);
  }
};

const institutionTypeWisePlacement = async (req, res) => {
  const reqParams = req.body;

  let { year, gender, program, state, minority } = reqParams;

  try {
    let count;
    if (program === "") {
      program = await Placement.distinct("program");
      console.log(program);
    } else {
      let temp = program;
      program = [];
      program.push(temp);
    }
    if (state === "") {
      state = await Placement.distinct("state");
      console.log(state);
    } else {
      let temp = state;
      state = [];
      state.push(temp);
    }

    if (year === "") {
      year = await Placement.distinct("year");
      console.log(year);
    } else {
      let temp = year;
      year = [];
      year.push(temp);
    }

    console.log(year, gender, program, state, minority);

    if (
      year === "" &&
      gender === "" &&
      program === "" &&
      state === "" &&
      minority === ""
    ) {
      count = await Placement.aggregate([
        {
          $group: {
            _id: "$institutionType",
            placedStudentCount: { $sum: "$placedStudentCount" },
            unplacedStudentCount: { $sum: "$unplacedStudentCount" },
          },
        },
      ]);
    } else if (gender !== "") {
      //console.log("In else if gender");
      count = await Placement.aggregate([
        {
          $match: {
            $and: [
              { year: { $in: year } },
              { program: { $in: program } },
              { state: { $in: state } },
            ],
          },
        },
        {
          $group: {
            _id: "$institutionType",
            placedStudentCount: { $sum: "$femalePlacedStudentCount" },
            unplacedStudentCount: { $sum: "$femaleUnplacedStudentCount" },
          },
        },
      ]);
    } else if (minority !== "") {
      //console.log("In else if minority");
      count = await Placement.aggregate([
        {
          $match: {
            $and: [
              { year: { $in: year } },
              { program: { $in: program } },
              { state: { $in: state } },
            ],
          },
        },
        {
          $group: {
            _id: "$institutionType",
            placedStudentCount: { $sum: "$minorityCountPlaced" },
            unplacedStudentCount: { $sum: "$minorityCountUnplaced" },
          },
        },
      ]);
    } else {
      //console.log("In else ");
      count = await Placement.aggregate([
        {
          $match: {
            $and: [
              { year: { $in: year } },
              { program: { $in: program } },
              { state: { $in: state } },
            ],
          },
        },
        {
          $group: {
            _id: "$institutionType",
            placedStudentCount: { $sum: "$placedStudentCount" },
            unplacedStudentCount: { $sum: "$unplacedStudentCount" },
          },
        },
      ]);
    }

    res.status(200).json(count);
  } catch (error) {
    res.status(200).json(error);
  }
};

const categoryWiseEnrollment = async (req, res) => {
  try {
    const Category = await Placement.find({}, { _id: 0, category: 1 });

    const categoryCount = await Placement.aggregate([
      {
        $unwind: "$category",
      },
    ]);

    res.status(200).json(categoryCount);
  } catch (error) {
    res.status(500).json(error);
  }
};

const yearWisePlacement = async (req, res) => {
  const reqParams = req.body;

  let { program, gender, state, institutionType, minority } = reqParams;

  try {
    let count;
    if (state === "") {
      state = await Placement.distinct("state");
      console.log(state);
    } else {
      let temp = state;
      state = [];
      state.push(temp);
    }
    if (institutionType === "") {
      institutionType = await Placement.distinct("institutionType");
      console.log(institutionType);
    } else {
      let temp = institutionType;
      institutionType = [];
      institutionType.push(temp);
    }

    if (program === "") {
      program = await Placement.distinct("program");
      console.log(program);
    } else {
      let temp = program;
      program = [];
      program.push(temp);
    }

    console.log(program, gender, state, institutionType, minority);
    //console.log(year,program);
    if (
      program === "" &&
      gender === "" &&
      state === "" &&
      institutionType === "" &&
      minority === ""
    ) {
      count = await Placement.aggregate([
        {
          $group: {
            _id: "$year",
            placedStudentCount: { $sum: "$placedStudentCount" },
            unplacedStudentCount: { $sum: "$unplacedStudentCount" },
            totalPlacedCount: {
              $sum: { $add: ["$placedStudentCount", "$unplacedStudentCount"] },
            },
          },
        },
      ]);
    } else if (gender !== "") {
      //console.log("In else if gender");
      count = await Placement.aggregate([
        {
          $match: {
            $and: [
              { program: { $in: program } },
              { state: { $in: state } },
              { institutionType: { $in: institutionType } },
            ],
          },
        },
        {
          $group: {
            _id: "$year",
            placedStudentCount: { $sum: "$femalePlacedStudentCount" },
            unplacedStudentCount: { $sum: "$femaleUnplacedStudentCount" },
            totalPlacedCount: {
              $sum: {
                $add: [
                  "$femalePlacedStudentCount",
                  "$femaleUnplacedStudentCount",
                ],
              },
            },
          },
        },
      ]);
    } else if (minority !== "") {
      //console.log("In else if minority");
      count = await Placement.aggregate([
        {
          $match: {
            $and: [
              { program: { $in: program } },
              { state: { $in: state } },
              { institutionType: { $in: institutionType } },
            ],
          },
        },
        {
          $group: {
            _id: "$year",
            placedStudentCount: { $sum: "$minorityCountPlaced" },
            unplacedStudentCount: { $sum: "$minorityCountUnplaced" },
            totalPlacedCount: {
              $sum: {
                $add: ["$minorityCountPlaced", "$minorityCountUnplaced"],
              },
            },
          },
        },
      ]);
    } else {
      //console.log("In else ");
      count = await Placement.aggregate([
        {
          $match: {
            $and: [
              { program: { $in: program } },
              { state: { $in: state } },
              { institutionType: { $in: institutionType } },
            ],
          },
        },
        {
          $group: {
            _id: "$year",
            placedStudentCount: { $sum: "$placedStudentCount" },
            unplacedStudentCount: { $sum: "$unplacedStudentCount" },
            totalPlacedCount: {
              $sum: { $add: ["$placedStudentCount", "$unplacedStudentCount"] },
            },
          },
        },
      ]);
    }

    res.status(200).json(count);
  } catch (error) {
    res.status(200).json(error);
  }
};

const programGenderWisePlacement = async (req, res) => {
  const reqParams = req.body;

  let { year, state, institutionType, minority } = reqParams;

  try {
    let count;
    if (state === "") {
      state = await Placement.distinct("state");
      console.log(state);
    } else {
      let temp = state;
      state = [];
      state.push(temp);
    }
    if (institutionType === "") {
      institutionType = await Placement.distinct("institutionType");
      console.log(institutionType);
    } else {
      let temp = institutionType;
      institutionType = [];
      institutionType.push(temp);
    }

    if (year === "") {
      year = await Placement.distinct("year");
      console.log(year);
    } else {
      let temp = year;
      year = [];
      year.push(temp);
    }

    console.log(year, state, institutionType, minority);

    if (
      year === "" &&
      state === "" &&
      institutionType === "" &&
      minority === ""
    ) {
      console.log("IN if");
      count = await Placement.aggregate([
        {
          $group: {
            _id: "$program",
            femalePlacedStudentCount: { $sum: "$femalePlacedStudentCount" },
            malePlacedStudentCount: { $sum: "$malePlacedStudentCount" },
          },
        },
      ]);
    } else if (minority !== "") {
      console.log("In else if minority");
      count = await Placement.aggregate([
        {
          $match: {
            $and: [
              { year: { $in: year } },
              { state: { $in: state } },
              { institutionType: { $in: institutionType } },
            ],
          },
        },
        {
          $group: {
            _id: "$program",
            femalePlacedStudentCount: { $sum: "$minorityCountPlaced" },
            malePlacedStudentCount: { $sum: "$minorityCountUnplaced" },
          },
        },
      ]);
    } else {
      console.log("In else ");
      count = await Placement.aggregate([
        {
          $match: {
            $and: [
              { year: { $in: year } },
              { state: { $in: state } },
              { institutionType: { $in: institutionType } },
            ],
          },
        },
        {
          $group: {
            _id: "$program",
            femalePlacedStudentCount: { $sum: "$femalePlacedStudentCount" },
            malePlacedStudentCount: { $sum: "$malePlacedStudentCount" },
          },
        },
      ]);
    }

    res.status(200).json(count);
  } catch (error) {
    res.status(200).json(error);
  }
};

module.exports = {
  PlacedUnplacedGraph,
  programWisePlacement,
  stateWisePlacement,
  institutionTypeWisePlacement,
  categoryWiseEnrollment,
  yearWisePlacement,
  programGenderWisePlacement,
};
