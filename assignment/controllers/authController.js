const { users, User } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

class AuthController {
  static async signup(req, res) {
    const { name, email, password, linkImgProfile } = req.body;

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new User(
      users.length + 1,
      name,
      email,
      hashedPassword,
      linkImgProfile
    );

    users.push(newUser);
    res.status(201).json(newUser);
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = users.find((user) => user.email === email);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id }, config.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          linkImgProfile: user.linkImgProfile,
        },
        token,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = AuthController;
