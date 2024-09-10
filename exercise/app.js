const express = require("express");
const userRouter = require("./router/userRouter");
const adminRouter = require("./router/adminRouter");
const db = require("./db/dbConfig");
const errorHandler = require("./middlewares/errorHandler");

db.connectDB()

const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/users/", userRouter);
app.use("/admin", adminRouter);

app.use("*", (req, res, next)=>{
  try {
    throw new Error("404 Not Found")
  } catch (error) {
    return next(error)
  }
})

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Listennig to Port " + PORT);
});


