const { users, User } = require("../models/userModel");

class UserController {
  static async getAllUsers(req, res) {
    const allUsers = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: "******",
        linkImgProfile: user.linkImgProfile,
      };
    });

    res.status(200).json(allUsers);
  }

  static async getUserData(req, res) {
    const user = req.user;
    res.status(200).json(user);
  }

  static async updateUser(req, res) {
    const user = req.user;
    const { name, linkImgProfile } = req.body;

    if (name) user.name = name;
    if (linkImgProfile) user.linkImgProfile = linkImgProfile;

    res.status(200).json(user);
  }

  static async removeUser(req, res) {
    const userIndex = users.findIndex((u) => u.id === req.user.id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      return res.status(200).json({ message: "User deleted successfully" });
    }
    res.status(404).json({ message: "User not found" });
  }
}

module.exports = UserController;
