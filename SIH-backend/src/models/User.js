const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 6) {
          throw new Error("Enter a strong password");
        }
      },
    },
    role: {
      type: String,
      default: "college",
      enum: ["college", "aicte", "corporate"],
    },
    tokens: [
      {
        token: {
          required: true,
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

const maxAge = 3 * 24 * 60 * 60;

UserSchema.statics.findUsingCredentials = async (userName, password) => {
  const lowercaseUserName = userName;
  const user = await User.findOne({ userName: lowercaseUserName });

  if (!user) {
    throw "User not found";
  }

  const isFound = await bcrypt.compare(password, user.password);
  if (!isFound) {
    throw "You have entered wrong password";
  }
  return user;
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this; //user being generate
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

UserSchema.pre("save", async function (next) {
  const user = this; //user which is being saved
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
