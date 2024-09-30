require('dotenv').config({ path: './database/.env' });
const express = require("express");
const connectDB = require("./database/db");
const cors = require("cors");
const cron = require('node-cron');
const twilio = require('twilio');
const axios = require('axios');
const { Reminder } = require("./Model/user_model")

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
};
// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Connect to the database
connectDB();

// Routes
app.use("/", require("./Routes/authroutes"));

//--------

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
const twilioClient = twilio(accountSid, authToken);

// Twilio phone number
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

cron.schedule('* * * * *', async () => {
  const now = new Date();
  const reminders = await Reminder.find({
    date: { $lte: now },
    completed: false,
  });

  for (const reminder of reminders) {
    console.log(`Reminder: ${reminder.title} - Time: ${reminder.time}`);


    try {
      await twilioClient.messages.create({
        body: `Reminder: ${reminder.title} - Time: ${reminder.time}`,
        from: twilioPhoneNumber,
        to: "+919860173150" // Replace with actual user phone number from the reminder
      });

      console.log(`SMS sent to ${reminder.userPhoneNumber}`);
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
    try {
      const response = await axios.post('https://bbb2-27-0-59-131.ngrok-free.app/call-user', {
        phone: reminder.phoneNumber,

      });

      console.log(`Route /user-route called successfully for ${reminder.userPhoneNumber}. Response:`, response.data);
    } catch (error) {
      console.error('Error calling user route:', error);
    }

    reminder.completed = true;
    await reminder.save();
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
