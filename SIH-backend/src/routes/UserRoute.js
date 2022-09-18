const express = require("express");
const {
  loginUser,
  signUpUser,
  logoutUser,
} = require("../controllers/UserController");

const UserRouter = express.Router();

UserRouter.post("/signUp", signUpUser);
UserRouter.post("/login", loginUser);
UserRouter.get("/logout", logoutUser);

module.exports = UserRouter;
