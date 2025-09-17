const express = require("express");
const router = express.Router();
const { createCaregiver, searchCaregivers, getAllCaregivers } = require("../Controller/caregiversController")

router.post("/addCaregivers", createCaregiver);
router.post('/search', searchCaregivers);
router.get('/allCaregivers', getAllCaregivers);

module.exports = router;