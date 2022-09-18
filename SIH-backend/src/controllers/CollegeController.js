const College = require("../models/College");

const AddCollege = async (req, res) => {
  try {
    const college = new College(req.body);

    await college.save();

    res.status(201).json({
      status: 201,
      message: "College Added Successfully !",
      body: {
        college,
      },
    });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

const PutReasons = async (req, res) => {
  const collegeId = req.params.id;
  try {
    console.log(collegeId);
    const college = await College.findByIdAndUpdate(
      { _id: collegeId },
      { $push: { reasons: req.body } }
    );
    res.status(201).json(college);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

module.exports = { AddCollege, PutReasons };
