const { validationResult } = require("express-validator");
const UserQuery = require("../query/userQuery");

class UserController {
  static async getAllusers(req, res, next) {
  }

  static async addUser(req, res, next) {
    let { errors } = validationResult(req);
    
    if (errors.length !== 0) {
      throw new Error("Validation Error")
    }

    await UserQuery.createOneUser({
      name: req.body.name,
      email:req.body.email,
      password: req.body.password,
      profilePhoto: req.body.profilePhoto
    })

    res.status(200).send("Succesfully adding a User");
  }
}

module.exports = UserController;
