const jwt = require("jsonwebtoken");
require('dotenv').config(); // -> For using env

const SECRET_KEY = process.env.JWT_SECRET // -> SHA256 hash code for secret key coming from env
const EXPIRATION = "1h"; // -> Token expiration time

// ▼ Generating a JWT token ▼
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
    expiresIn: EXPIRATION, // -> Defining expire time that I defined above as variable
  });
};

// ▼ Verifing a JWT token ▼
const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = { generateToken, verifyToken }; // -> Export as modules
