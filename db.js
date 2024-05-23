const mongoose = require("mongoose");
const url = "mongodb+srv://triduc2k3:ductri01@stackoverflow.zfgeary.mongodb.net/?retryWrites=true&w=majority&appName=stackoverflow"

module.exports.connect = () => {
    mongoose
      .connect(url)
      .then(() => console.log("MongoDB is connected successfully"))
      .catch((err) => console.log("Error: ", err));
  };