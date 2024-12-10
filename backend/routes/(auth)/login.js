const express = require("express");
const router = express.Router();
const User = require("../../models/User");
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  // Check If User exists or not
  const existingUser = await User.findOne({
    email,
  });

  if (!existingUser) {
    return res.status(401).json("User Doesn't exists");
  }
  // If User Exists => then compare the password using method created in Schema
  const isMatch = await existingUser.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json("Invalid Password");
  }
  // If Password is matched then create the JWT token
  const token = existingUser.generateAuthToken();
  res.json({ token });
});

module.exports = router;
