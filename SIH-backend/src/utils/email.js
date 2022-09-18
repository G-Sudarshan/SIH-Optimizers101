const DOMAIN = "harshal-walunj.me";
const API_KEY = process.env.API_KEY;

var mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

const sendMail = ({ from, to, subject, text }) => {
  const data = {
    from,
    to,
    subject,
    text,
  };

  mailgun.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
    } else {
      console.log(body);
    }
  });
};

module.exports = { sendMail };
