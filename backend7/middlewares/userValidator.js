const { body } = require("express-validator");

const validateAddUser = [
  body("email").isEmail(),
  body("password").isLength({ min: 7, max: 10 }),
];

const validateLogin = [
  body("email").isEmail(),
  body("password").isLength({ min: 7, max: 10 }),
];

module.exports = {
  validateAddUser,
  validateLogin,
};
