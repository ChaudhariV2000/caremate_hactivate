const express = require("express");
const router = express.Router();
const { register, login, getProfile } = require("../Controller/user_controller");
const { authenticateToken } = require("../Controller/auth")

router.post("/signup", register);

router.post("/login", login);
router.get('/profile', authenticateToken, getProfile);

module.exports = router;
