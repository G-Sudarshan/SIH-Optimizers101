const express = require("express");
const EmailRouter = express.Router();

const { sendEmail } = require("../controllers/EmailController");

EmailRouter.post("/sendEmail", sendEmail);

module.exports = EmailRouter;
