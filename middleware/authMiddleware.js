const { verifyToken } = require("../config/jwtConfig"); // -> Calling jwt config module I defined in config

// ▼ Create middleware for token verify and export as protect for using ▼
exports.protect = (req, res, next) => {
  
  const token = req.headers.authorization?.split(" ")[1]; // -> Bearer token

  // ▼ Checking token verify with message ▼
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // ▼ If token verified ▼
  try {
    const decoded = verifyToken(token);
    req.user = decoded; // -> Attach user data to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }

};
