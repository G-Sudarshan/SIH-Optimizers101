const fs = require("fs");
const chalk = require("chalk");

const getActualRequestDurationInMilliseconds = (start) => {
  const NS_PER_SEC = 1e9; // convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const Logger = (req, res, next) => {
  let currentDateTime = new Date();

  let formattedDate =
    currentDateTime.getFullYear() +
    "-" +
    (currentDateTime.getMonth() + 1) +
    "-" +
    currentDateTime.getDate() +
    " " +
    currentDateTime.getHours() +
    ":" +
    currentDateTime.getMinutes() +
    ":" +
    currentDateTime.getSeconds();

  let method = req.method;
  let url = req.url;
  let status = res.statusCode;

  const start = process.hrtime();
  const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
  let log = `[${chalk.blue(formattedDate)}] ${chalk.yellow.bold(
    method
  )}:${chalk.yellow.bold(url)} ${status} ${chalk.red(
    durationInMilliseconds.toLocaleString() + "ms"
  )}`;
  console.log(log);

  fs.appendFile("request_logs.txt", log + "\n", (err) => {
    if (err) {
      console.log(err);
    }
  });

  next();
};

module.exports = Logger;
