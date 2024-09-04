const express = require("express");
const AuthMiddleware = require("../middlewares/auth");
const UserController = require("../controllers/userController");

const router = express.Router();

router.use(AuthMiddleware.authorization);

router.get("/", UserController.getAllUsers);
router.get("/me", UserController.getUserData);
router.put("/me", UserController.updateUser);
router.delete("/me", UserController.removeUser);

module.exports = router;
