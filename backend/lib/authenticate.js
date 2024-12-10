const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers["token"];
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  // If token is provided  => then verify the token and return the next handler
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = authenticate;
