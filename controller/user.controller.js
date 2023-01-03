const { User } = require("../model/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function tokengenerator(user) {
  if (user.password) {
    delete user.password;
  }
  return jwt.sign(user, "horse_login_signup");
}

async function registeruser({ Firstname, email, password, Lastname }) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("user alredy exists");
  }
  password = bcryptjs.hashSync(password);

  let user = await User.create({
    Firstname,
    authType: "email-password",
    email,
    password,
    Lastname,
  });
  user = user.toJSON();
  delete user.password;
  return user;
}

async function loginuser({ email, password }) {
  const existing = await User.findOne({
    email,
    authType: "email-password",
  }).select("_id Firstname Lastname email password");
  if (!existing) {
    throw new Error("please register first and user does not exist !");
  }
  const match = bcryptjs.compareSync(password, existing.password);
  if (!match) {
    throw new Error("please enter valid password!");
  }
  const token = tokengenerator(existing.toJSON());
  return token;
}

module.exports = {
  registeruser,
  loginuser,
};
