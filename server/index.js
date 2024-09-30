require('dotenv').config({ path: './database/.env' });
const express = require("express");
const connectDB = require("./database/db");
const cors = require("cors");
const cron = require('node-cron');
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
cron.schedule('* * * * *', async () => { // Runs every minute
  const now = new Date();
  const reminders = await Reminder.find({
    date: { $lte: now },
    completed: false
  });

  for (const reminder of reminders) {

    console.log(`Reminder: ${reminder.title} - Time: ${reminder.time}`);


    reminder.completed = true;
    await reminder.save();
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
