const express = require("express");
const { GetReasons, GetReasonsFreaquencyMap } = require("../controllers/AICTEController")

const AICTERouter = express.Router();

AICTERouter.get("/getReasons", GetReasons);
AICTERouter.get("/getReasonsFreaquencyMap",GetReasonsFreaquencyMap);

module.exports = AICTERouter;
