const express = require("express");
const adminRouter = require("./router/adminRouter");
const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log("Listening to PORT " + PORT);
});
