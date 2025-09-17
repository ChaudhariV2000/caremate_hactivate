const mongoose = require("mongoose");



//patient_login
const registerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,

  },
  password: { type: String, required: true },
  number: { type: String, required: true },
  address: { type: String, required: true },
  dob: { type: Date, required: true },
  imageUrl: { type: String },
});

const userLoginSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },

  password: { type: String, required: true },
});




const User = mongoose.model("Pateints", registerSchema);

module.exports = { User };

