// config/twillio.js
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
    console.error('Twilio credentials missing! Check environment variables:');
    console.error('TWILIO_ACCOUNT_SID:', accountSid ? '✓ Set' : '✗ Missing');
    console.error('TWILIO_AUTH_TOKEN:', authToken ? '✓ Set' : '✗ Missing');
    process.exit(1);
}

const twilioClient = twilio(accountSid, authToken);

// Test Twilio connectivity
twilioClient.api.accounts(accountSid)
    .fetch()
    .then(account => {
        console.log('Twilio connected successfully to account:', account.friendlyName);
    })
    .catch(err => {
        console.error('Twilio connection failed:', err.message);
    });

module.exports = twilioClient;