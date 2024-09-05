const { validationResult } = require("express-validator");
const UserQuery = require("../query/userQuery");
const ApiError = require("../errors/ApiError");
const { BADREQUEST } = require("../helper/constant");
const { signJWT, signRefreshToken } = require("../helper/jwt");

class UserController {
  static async getAllusers(req, res, next) {
    let allUser = await UserQuery.getAllusers();
    res.status(200).send(allUser);
  }

  static async addUser(req, res, next) {
    let { errors } = validationResult(req);

    if (errors.length !== 0) {
      throw ApiError.badRequest("Validation Error", errors);
    }

    const user = await UserQuery.createOneUser({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profilePhoto: req.body.profilePhoto,
    });
    console.log(user);
    const token = signJWT({ id: user._id, email: user.email });
    const refreshToken = signRefreshToken({
      id: user._id,
      email: user.email,
      tokenVersion: user.tokenVersion,
    });

    res.cookie("be7", refreshToken, {
      httpOnly: true,
      path: "/refreshToken",
    });

    res.status(200).send({
      message: "Succesfully signUp",
      accessToken: token,
    });
  }

  static async login(req, res, next) {
    let { errors } = validationResult(req);
    if (errors.length !== 0) {
      throw ApiError.badRequest("Validation Error", errors);
    }

    let user = await UserQuery.getUsers(req.body.email);

    if (!user) {
      throw ApiError.badRequest("User not found", {
        message: "Please check your email or password",
      });
    }

    if (user.password !== req.body.password) {
      throw ApiError.badRequest("User not found", {
        message: "Please check your email or password",
      });
    }

    const token = signJWT({ id: user._id, email: user.email });
    const refreshToken = signRefreshToken({
      id: user._id,
      email: user.email,
      tokenVersion: user.tokenVersion,
    });

    res.cookie("be7", refreshToken, {
      httpOnly: true,
      path: "/refreshToken",
    });

    res.status(200).send({
      message: "Succesfully login",
      accessToken: token,
    });
  }
}

module.exports = UserController;
