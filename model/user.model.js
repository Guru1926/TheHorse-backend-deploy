const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    Firstname: {
      type: String,
    },
    Lastname: String,

    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      select: false,
    },
    authType: String,
  },
  {
    timestamps: true,
  }
);
const User = new mongoose.model("User", userSchema);
module.exports = {
  User,
};
