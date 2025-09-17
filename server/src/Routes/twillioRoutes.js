const express = require('express');
const router = express.Router();
const twilioController = require('../Controller/twillioController');

router.post('/call-user', twilioController.callUser);

router.post('/voice', twilioController.voice);

router.post('/call-status', twilioController.callStatus);

router.post('/sms-reply', twilioController.smsReply);

module.exports = router;
