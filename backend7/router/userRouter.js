const express = require("express");
const {
  validateAddUser,
  validateLogin,
} = require("../middlewares/userValidator");
const UserController = require("../controller/userController");
const tryCatch = require("../helper/helper");
const { checkDuplicateEmail } = require("../middlewares/registerCheck");
const { checkJWT } = require("../middlewares/auth");

const router = express.Router();

router.get("/", checkJWT, UserController.getAllusers);

router.post("/login", validateLogin, tryCatch(UserController.login));

router.post(
  "/addUser",
  validateAddUser,
  tryCatch(checkDuplicateEmail),
  tryCatch(UserController.addUser)
);

module.exports = router;
