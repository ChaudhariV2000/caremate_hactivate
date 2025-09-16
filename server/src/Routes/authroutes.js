const express = require("express");
// const urlencoded = require('body-parser').urlencoded;
const router = express.Router();
const { register, login, reminder, getAllReminders, updateReminder, deleteReminder, fetchCaregivers, setCaregivers, smsReply, voice, callStatus, callUser } = require("../Controller/user_controller");
const twilioClient = require('../config/twillio');
// app.use(urlencoded({ extended: false }));
// 
router.post("/signup", register);
router.post("/login", login);
// app.post("/reminder", reminder)
// app.get("/reminder", getAllReminders)
// app.put("/reminder/:id", updateReminder)
// app.delete("/reminder/:id", deleteReminder)
// app.post("/sms-reply", smsReply)
// router.get("/fetchCaregivers", fetchCaregivers);
// router.post("/setCaregivers", setCaregivers);
// app.post('/call-user', callUser);
// app.post('/voice', voice);
// app.post('/call-status', callStatus);
// Add this to your routes to test Twilio functionality
router.get('/test-twilio', async (req, res) => {
    try {
        // Test SMS
        const message = await twilioClient.messages.create({
            body: 'Test SMS from your app',
            from: process.env.TWILIO_PHONE_NUMBER,
            to: '+919860173150' // replace with your test number
        });

        // Test Call
        const call = await twilioClient.calls.create({
            to: '+919860173150', // replace with your test number
            from: process.env.TWILIO_PHONE_NUMBER,
            url: `${process.env.BASE_URL}/voice`,
            method: 'POST'
        });

        res.json({
            success: true,
            messageSid: message.sid,
            callSid: call.sid
        });
    } catch (error) {
        console.error('Twilio test failed:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


module.exports = router;
