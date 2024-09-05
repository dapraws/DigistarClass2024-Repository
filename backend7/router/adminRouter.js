const express = require("express");
const router = express.Router();

router.get("/");

router.post("/addUser", (req, res) => {
  res.status(404).send("POST ALL Admin");
});

module.exports = router;
