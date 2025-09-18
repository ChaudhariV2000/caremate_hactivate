const twilioClient = require('../config/twillio');
const Reminder = require('../Model/reminder');

exports.callUser = async (req, res) => {
    const { phone, reminderId } = req.body;
    try {
        const url = `${process.env.BASE_URL}/voice?reminderId=${reminderId || ''}`;
        const call = await twilioClient.calls.create({
            to: phone,
            from: process.env.TWILIO_PHONE_NUMBER,
            url,
            method: 'POST'
        });
        res.json({ sid: call.sid });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.voice = async (req, res) => {
    const reminderId = req.query.reminderId;
    const VoiceResponse = require('twilio').twiml.VoiceResponse;
    const twiml = new VoiceResponse();

    twiml.say('Please confirm if you have taken your medication. Press 1 for yes, press 2 for no.');

    twiml.gather({
        numDigits: 1,
        action: `/call-status?reminderId=${reminderId}`,
        method: 'POST'
    });


    twiml.redirect(`/voice?reminderId=${reminderId}`);

    res.type('text/xml').send(twiml.toString());
};

exports.callStatus = async (req, res) => {
    const digit = req.body.Digits;
    const reminderId = req.query.reminderId;
    const VoiceResponse = require('twilio').twiml.VoiceResponse;
    const twiml = new VoiceResponse();

    if (digit === '1') {
        twiml.say('Thank you — your medication has been recorded. Goodbye.');
        if (reminderId) {
            try {
                await Reminder.findByIdAndUpdate(reminderId, { taken: true });
            } catch (err) { console.error(err); }
        }
    } else if (digit === '2') {
        twiml.say('Please remember to take your medication. Goodbye.');
    } else {
        console.log(digit)
        twiml.say('ThankYou. Goodbye.');
    }
    twiml.hangup();
    res.type('text/xml').send(twiml.toString());
};

exports.smsReply = async (req, res) => {
    const messageBody = req.body.Body ? req.body.Body.trim().toLowerCase() : '';
    const fromNumber = req.body.From;
    const MessagingResponse = require('twilio').twiml.MessagingResponse;
    const twiml = new MessagingResponse();

    if (messageBody === 'yes') {
        twiml.message('Thank you for confirming!');
        try {
            await Reminder.findOneAndUpdate({ phoneNumber: fromNumber, taken: false }, { taken: true });
        } catch (err) { console.error(err); }
    } else if (messageBody === 'no') {
        twiml.message('Please remember to take your medication.');
    } else {
        twiml.message('Invalid response. Please reply YES or NO.');
    }
    res.type('text/xml').send(twiml.toString());
};
