const express = require('express');
const router = express.Router();
const twilioController = require('../Controller/twillioController');

router.post('/call-user', twilioController.callUser);      // manual trigger if needed
router.post('/voice', twilioController.voice);            // Twilio will request this when call is placed
router.post('/call-status', twilioController.callStatus); // Twilio gather posts here
router.post('/sms-reply', twilioController.smsReply);     // Twilio incoming message webhook

module.exports = router;
