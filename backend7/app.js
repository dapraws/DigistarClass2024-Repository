const express = require("express");
const userRouter = require("./router/userRouter");
const adminRouter = require("./router/adminRouter");
const db = require("./db/dbConfig");
const errorHandler = require("./middlewares/errorHandler");
const ApiError = require("./errors/ApiError");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const {
  verifyJWT,
  verifyRefreshToken,
  signJWT,
  signRefreshToken,
} = require("./helper/jwt");
const UserQuery = require("./query/userQuery");

db.connectDB();

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cookieParser());
app.use("/users/", userRouter);
app.use("/admin", adminRouter);

app.get("/refreshToken", async (req, res, next) => {
  try {
    const refreshToken = req.cookies.be7;
    console.log(refreshToken);

    if (!refreshToken) {
      throw ApiError.unAuthorized("Refresh token not found");
    }
    const decoded = verifyRefreshToken(refreshToken);

    const user = await UserQuery.getUsers(decoded.email);

    if (!user) {
      throw ApiError.unAuthorized("User not found");
    }
    if (user.tokenVersion !== decoded.tokenVersion) {
      throw ApiError.unAuthorized("Invalid refresh token");
    }

    const newAccessToken = signJWT({
      id: decoded._id,
      email: decoded.email,
    });
    const newRefreshToken = signRefreshToken({
      id: decoded._id,
      email: decoded.email,
      tokenVersion: user.tokenVersion,
    });

    res.cookie("be7", newRefreshToken, {
      httpOnly: true,
      path: "/refreshToken",
    });

    res.status(200).send({
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(ApiError.unAuthorized("Invalid refresh token"));
  }
});

app.post("/revokeAllAccess", async (req, res, next) => {
  try {
    const user = await UserQuery.getUsers(req.body.email);

    if (user.password !== req.body.password && user.email !== req.body.email) {
      throw ApiError.unAuthorized("User not found");
    }

    await UserQuery.updateTokenVersion(user.email);
    console.log("sadasdsadasd");

    const newAccessToken = signJWT({
      id: user._id,
      email: user.email,
    });
    const newRefreshToken = signRefreshToken({
      id: user._id,
      email: user.email,
      tokenVersion: user.tokenVersion,
    });

    res.cookie("be7", newRefreshToken, {
      httpOnly: true,
      path: "/refreshToken",
    });

    res.status(200).send({
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(ApiError.unAuthorized(error));
  }
});

app.use("*", (req, res, next) => {
  throw ApiError.notFound("404 Page Not Found");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Listening to Port " + PORT);
});
