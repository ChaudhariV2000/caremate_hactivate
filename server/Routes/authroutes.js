const express = require("express");
const app = express.Router();
const { register, login, reminder, getAllReminders, updateReminder, deleteReminder,fetchCaregivers, setCaregivers } = require("../Controller/user_controller");

app.post("/signup", register);
app.post("/login", login);
app.post("/reminder", reminder)
app.get("/reminder", getAllReminders)
app.put("/reminder/:id", updateReminder)
app.delete("/reminder/:id", deleteReminder)

app.get("/fetchCaregivers", fetchCaregivers);
app.post("/setCaregivers", setCaregivers);

module.exports = app;
