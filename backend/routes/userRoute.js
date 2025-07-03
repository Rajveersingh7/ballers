const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  signupValidation,
  loginValidation
} = require("../middlewares/userValidation");

const router = express.Router();

router.post("/signup", signupValidation, async (req, res) => {
  try {
    const {name, email, password} = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res
        .status(409)
        .json({message: "User already exists", success: false});
    }
    const user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10)
    });
    await user.save();
    res.status(201).json({message: "User created successfully", success: true});
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
});

router.post("/login", loginValidation, async (req, res) => {
  try {
    const {email, password} = req.body;
    const existingUser = await User.findOne({email});
    const errorMessage = "Authentication failed email or password is wrong";
    if (!existingUser) {
      return res.status(403).json({
        message: errorMessage,
        success: false
      });
    }
    const isEqual = await bcrypt.compare(password, existingUser.password);
    if (!isEqual) {
      return res.status(403).json({
        message: errorMessage,
        success: false
      });
    }
    const jwtToken = jwt.sign(
      {email: existingUser.email, id: existingUser._id},
      process.env.JWT_SECRET,
      {expiresIn: "24h"}
    );
    res.status(200).json({
      message: "Login success",
      success: true,
      jwtToken,
      email,
      name: existingUser.name
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
});

module.exports = router;
