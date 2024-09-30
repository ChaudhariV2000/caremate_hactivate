const express = require("express");
const app = express.Router();
const { register, login, reminder } = require("../Controller/user_controller");

app.post("/signup", register);
app.post("/login", login);
app.post("/reminder", reminder)

module.exports = app;
