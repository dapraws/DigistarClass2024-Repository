const express = require("express");
const AuthController = require("../controllers/authController");
const AuthMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", AuthMiddleware.validation, AuthController.signup);
router.post("/login", AuthController.login);

module.exports = router;
