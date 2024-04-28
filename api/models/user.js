const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    // required: true,
    // unique: true
  },
  password: {
    type: String,
    // required: true
  },
  fullname: {
    type: String,
    // required: true
  },
  bio: {
    type: String,
    default: "",
  },

  blogs: [String],

  github: String,
  instagram: String,
  linkedin: String,
  x: String,
  telegram: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
