require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const morgan = require('morgan');
const cors = require('cors');
const Reminder = require('./src/Model/reminder'); // Add this import

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

// Connect to database
connectDB();

// Import custom scheduler
const scheduler = require('./src/Jobs/customScheduler');

// Mount routes
app.use('/', require('./src/Routes/authroutes'));
app.use('/', require('./src/Routes/reminderRoutes'));
app.use('/', require('./src/Routes/twillioRoutes'));

// ✅ ADD TEST ENDPOINTS HERE (BEFORE startServer)
// Test endpoint to create immediate reminder
app.post('/api/test-reminder-now', async (req, res) => {
  try {
    // Create a reminder that runs in 10 seconds
    const runAt = new Date(Date.now() + 10000);

    const testReminder = new Reminder({
      username: 'test-user',
      title: 'Test Reminder',
      phoneNumber: '+919860173150', // Your number
      type: 'medication',
      date: runAt,
      time: runAt.toTimeString().split(' ')[0],
      repeat: 'never'
    });

    await testReminder.save();
    await scheduler.scheduleReminder(testReminder._id.toString(), runAt);

    res.json({
      success: true,
      reminderId: testReminder._id,
      willRunAt: runAt,
      message: 'Test reminder scheduled to run in 10 seconds'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all scheduled jobs
app.get('/api/scheduled-jobs', (req, res) => {
  try {
    const jobs = scheduler.getScheduledJobs();
    res.json({
      success: true,
      count: jobs.length,
      jobs: jobs
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Force run a specific reminder
app.post('/api/force-run-reminder/:id', async (req, res) => {
  try {
    await scheduler.runReminder(req.params.id);
    res.json({ success: true, message: 'Reminder executed manually' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Load existing reminders on startup
    await scheduler.loadScheduledReminders();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);

    });

  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

startServer();