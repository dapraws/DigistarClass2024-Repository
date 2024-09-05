const User = require("../model/User");

class UserQuery {
  static async createOneUser(user) {
    return await User.create(user);
  }

  static async getAllusers() {
    return await User.find();
  }

  static async getUsers(email) {
    return await User.findOne({ email });
  }

  static async updateTokenVersion(email) {
    return await User.findOneAndUpdate(
      { email },
      { $inc: { tokenVersion: 1 } }, // Correct usage of $inc
      { new: true } // Options: return the updated document and run validators
    );
  }
}

module.exports = UserQuery;
