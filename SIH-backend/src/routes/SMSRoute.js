const express = require("express");
const {
  sendSMS
} = require("../controllers/SMSController");

const SMSRouter = express.Router();

SMSRouter.post("/send_sms", sendSMS);

module.exports = SMSRouter;
