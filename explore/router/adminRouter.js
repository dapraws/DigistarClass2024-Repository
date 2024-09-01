const express = require("express");
const router = express.Router();
const AdminController = require("../controller/adminController");

router.get("/", AdminController.getAllAdmin);
router.get("/addAdmin", AdminController.addAdmin);

module.exports = router;
