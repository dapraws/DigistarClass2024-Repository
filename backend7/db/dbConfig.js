const mongoose = require("mongoose");

const uri =
  "mongodb+srv://ilhamrecca:I9jmmmKcMVLSkTvd@backend-7.gjhf4.mongodb.net/?retryWrites=true&w=majority&appName=Backend-7";
// const uri =
//   "mongodb+srv://digistar:digistar@digistar.srv94.mongodb.net/?retryWrites=true&w=majority&appName=digistar";
// const clientOptions = {serverApi: {version: '1', strict: true, deprecationErrors: true}}
async function connectDB() {
  try {
    await mongoose.connect(uri);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Yeay connect");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
async function disconnectDB() {
  try {
    await mongoose.diconnect();
    console.log("yeay disconnect");
  } catch (error) {
    process.exit(1);
  }
}

module.exports = {
  connectDB,
  disconnectDB,
};
