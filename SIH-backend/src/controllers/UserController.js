const User = require("../models/User");

const maxAge = 3 * 24 * 60 * 60;

const signUpUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(201).json({
      status: 201,
      message: "User Registered Successfully !",
      body: { user, token },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findUsingCredentials(
      req.body.userName,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({
      status: 200,
      message: "User Logged In Successfully !",
      body: { user, token },
    });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

const logoutUser = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = { loginUser, signUpUser, logoutUser };
