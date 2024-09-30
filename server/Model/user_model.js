const mongoose = require("mongoose");




const userLoginSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },

  password: { type: String, required: true },
});

const User = mongoose.model("Pateints", userLoginSchema);
module.exports = User;

