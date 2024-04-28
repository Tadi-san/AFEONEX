const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("./models/user");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg"; // Update with your own secret

router.post("/register", async (req, res) => {
  const { fullname, email, password, bio } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    res.json("an acount with this email already exists, try logging in ");
  } else {
    try {
      await User.create({
        fullname,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
        bio,
      });
      res.json("Great");
    } catch (error) {
      res.status(422).json(error);
    }
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      const token = jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        { expiresIn: "30d" } // Set the expiration time to 30 days
      );
      const {
        _id,
        fullname,
        email,
        bio,
        blogs,
        github,
        instagram,
        linkedin,
        x,
        telegram,
      } = userDoc;
      res.cookie("token", token, { maxAge: 30 * 24 * 60 * 60 * 1000 }).json({
        _id,
        fullname,
        email,
        bio,
        blogs,
        github,
        instagram,
        linkedin,
        x,
        telegram,
      });
    } else {
      res.status(422).json("Invalid password");
    }
  } else {
    res.status(404).json("User not found");
  }
});

module.exports = router;
