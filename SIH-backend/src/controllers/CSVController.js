const csvToJson = require("csvtojson");
const CSV = require("../models/CSV");

const AddCSV = async (req, res) => {
  try {
    const jsonArray = await csvToJson().fromFile(
      `${__dirname}/./placement_data.csv`
    );

    for (let index = 0; index < jsonArray.length; index++) {
      if (jsonArray[index].minority === "Yes") {
        jsonArray[index].minority = true;
      } else {
        jsonArray[index].minority = false;
      }
      jsonArray[index].ctcOffered = parseFloat(jsonArray[index].ctcOffered);

      jsonArray[index].collegeId = "62fa2a7cfa0d385762e2948c";
      // jsonArray[index].year = 2022;
      jsonArray[index].state = "Maharashtra";
      jsonArray[index].institutionType = "Private";

      const array = jsonArray[index].skills.split(",");

      let newArray = [];
      for (let index = 0; index < array.length; index++) {
        let temp = array[index].trim();
        newArray.push(temp);
      }
      delete jsonArray[index].skills;
      jsonArray[index].skills = newArray;
    }
    const records = await CSV.insertMany(jsonArray);

    res.status(200).json({
      status: 200,
      message: "Placement data inserted Successfully !",
      body: {
        records,
      },
    });
    res.json(jsonArray);
  } catch (error) {
    console.log({ Error: error });
  }
};

const getAllCSVRecords = async (req, res) => {
  try {
    const records = await CSV.find(
      {},
      { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
    );
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteAllRecords = async (req, res) => {
  try {
    const records = await CSV.remove({});
    res.status(200).json({ message: "Deleted Successfully !" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { AddCSV, getAllCSVRecords, deleteAllRecords };
