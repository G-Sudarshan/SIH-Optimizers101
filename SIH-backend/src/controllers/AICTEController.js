const College = require("../models/College");

const GetReasons = async (req, res) => {
  try {
    const reasons = await College.find({}, { reasons: 1 });

    res.status(200).json(reasons);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

const GetReasonsFreaquencyMap = async (req, res) => {
    try{
    const reasons = await College.find({}, { reasons: 1 });
    console.log("reached inside function");
    console.log(reasons[0]["reasons"][1]["reasons"]);
    const map = {};
    reasons.forEach((reasonObject) => {
      let reasonsL1 = reasonObject["reasons"];
      reasonsL1.forEach((reasonsL2) => {
        let reasonsL3 = reasonsL2["reasons"];
        reasonsL3.forEach((reason) => {
          if (map[reason]) {
            map[reason]++;
          } else {
            map[reason] = 1;
          }
        });
      });
    });
    res.status(200).json(map);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

module.exports = { GetReasons, GetReasonsFreaquencyMap };
