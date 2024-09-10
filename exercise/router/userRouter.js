const express = require("express");
const { validateAddUser } = require("../middlewares/userValidator");
const UserController = require("../controller/userController");
const tryCatch = require("../middlewares/helper");

const router = express.Router();

router.get("/", UserController.getAllusers);
router.post("/addUser",validateAddUser, tryCatch(UserController.addUser));

module.exports = router;
