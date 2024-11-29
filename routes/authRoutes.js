const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// ▼ Defining routes below -> endpoint, middleware(token in this scenario), controller
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
