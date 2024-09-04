const { users } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { body, validationResult } = require("express-validator");

class AuthMiddleware {
  static async authorization(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid" });
      }
      req.user = users.find((user) => user.id === decoded.userId);
      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }
      next();
    });
  }

  static validation = [
    body("name")
      .isLength({ min: 3, max: 15 })
      .withMessage("Name must be 3-15 characters"),
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password")
      .isLength({ min: 7, max: 15 })
      .withMessage("Password must be 7-15 characters"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
}

module.exports = AuthMiddleware;
