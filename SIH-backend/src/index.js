const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const connectDB = require("./db/connect");
require("dotenv/config");

//middlewares
app.use(cors());
app.use(express.json());

//Routes
const User = require("./routes/UserRoute");
const College = require("./routes/CollegeRoute");
const CSV = require("./routes/CSVRoute");
const AICTE = require("./routes/AICTERoute");
const Placement = require("./routes/PlacmentRoute");
const Chart = require("./routes/ChartRoute");
const Student = require("./routes/StudentRoute");
const Email = require("./routes/EmailRoute");
const SMS = require("./routes/SMSRoute");

//custom middlewares
app.use("/api/v1/user", User);
app.use("/api/v1/college", College);
app.use("/api/v1/csv", CSV);
app.use("/api/v1/AICTE", AICTE);
app.use("/api/v1/placement", Placement);
app.use("/api/v1/chart", Chart);
app.use("/api/v1/student", Student);
app.use("/api/v1/email", Email);
app.use("/api/v1/sms", SMS);

app.get("/", (req, res) => {
  res.json({ message: "On Home Page sms-test" });
});

const start = async () => {
  try {
    await connectDB(process.env.CONNECT_DB);
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}/`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
