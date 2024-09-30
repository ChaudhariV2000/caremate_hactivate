const mongoose = require("mongoose");



//patient_login
const userLoginSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },

  password: { type: String, required: true },
});

//-------reminder----

const reminderSchema = new mongoose.Schema({
  username: {
    type: String,

    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['medication', 'appointment', 'daily routine'],
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  repeat: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly', 'never'],
    default: 'never',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("Pateints", userLoginSchema);
const Reminder = mongoose.model("Reminders", reminderSchema);
module.exports = { User, Reminder };

