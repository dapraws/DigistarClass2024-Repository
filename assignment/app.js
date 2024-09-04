const express = require("express");
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
