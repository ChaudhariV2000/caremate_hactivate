const express = require("express");
const urlencoded = require('body-parser').urlencoded;
const app = express.Router();
const { register, login, reminder, getAllReminders, updateReminder, deleteReminder, fetchCaregivers, setCaregivers, smsReply, voice, callStatus, callUser } = require("../Controller/user_controller");
app.use(urlencoded({ extended: false }));

app.post("/signup", register);
app.post("/login", login);
app.post("/reminder", reminder)
app.get("/reminder", getAllReminders)
app.put("/reminder/:id", updateReminder)
app.delete("/reminder/:id", deleteReminder)
app.post("/sms-reply", smsReply)
app.get("/fetchCaregivers", fetchCaregivers);
app.post("/setCaregivers", setCaregivers);
app.post('/call-user', callUser);
app.post('/voice', voice);
app.post('/call-status', callStatus);


module.exports = app;
