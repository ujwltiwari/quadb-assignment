const express = require('express');
const router = express.Router();

//Index Page Route
router.get("/", (req, res) => {
  res.send("Welcome to Home Page");
})

module.exports = router;