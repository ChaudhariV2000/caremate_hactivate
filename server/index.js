// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./src/config/db');
// const morgan = require('morgan');
// const cors = require('cors');
// const Reminder = require('./src/Model/reminder');

// const app = express();
// app.use(express.json());
// app.use(morgan('dev'));
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://caremate-hactivate-frontend.onrender.com"
// ];

// app.use(cors({
//   origin: allowedOrigins,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));


// connectDB();

// const scheduler = require('./src/Jobs/customScheduler');


// app.use('/', require('./src/Routes/authroutes'));
// app.use('/', require('./src/Routes/reminderRoutes'));
// app.use('/', require('./src/Routes/twillioRoutes'));
// app.use('/', require('./src/Routes/careGiversRoute'));

// const PORT = process.env.PORT || 5000;

// async function startServer() {
//   try {

//     await scheduler.loadScheduledReminders();

//     app.listen(PORT, () => {
//       console.log(` Server running on port ${PORT}`);

//     });

//   } catch (err) {
//     console.error('Failed to start server:', err);
//     process.exit(1);
//   }
// }

// startServer();

require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const morgan = require('morgan');
const cors = require('cors');
const cron = require('node-cron');
const Reminder = require('./src/Model/reminder');
const scheduler = require('./src/Jobs/customScheduler');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

const allowedOrigins = [
  "http://localhost:5173",
  "https://caremate-hactivate-frontend.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Routes
app.use('/', require('./src/Routes/authroutes'));
app.use('/', require('./src/Routes/reminderRoutes'));
app.use('/', require('./src/Routes/twillioRoutes'));
app.use('/', require('./src/Routes/careGiversRoute'));

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Load existing reminders into memory
    await scheduler.loadScheduledReminders();

    // ✅ Cron job: check for due reminders every minute
    cron.schedule('* * * * *', async () => {
      const now = new Date();
      try {
        const reminders = await Reminder.find({
          completed: false,
          date: { $lte: now }
        });

        for (const reminder of reminders) {
          // Run the reminder
          await scheduler.runReminder(reminder._id);
        }
      } catch (err) {
        console.error('Error running scheduled reminders:', err);
      }
    });

    console.log('📅 Cron job for reminders started');

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
