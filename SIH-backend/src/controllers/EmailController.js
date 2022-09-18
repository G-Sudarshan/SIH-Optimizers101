const { sendMail } = require("../utils/email");

const sendEmail = async (req, res) => {
  try {
    console.log(req.body);
    sendMail(req.body);
    res.status(200).json({ message: "Mail Sent Successfully !" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { sendEmail };
