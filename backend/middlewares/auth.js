const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({message: "No token, authorization denied"});
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // user info from token
    next();
  } catch (err) {
    res.status(401).json({message: "Token is not valid"});
  }
};

module.exports = auth;
