const { configDotenv } = require("dotenv");
const Reminder = require("../Model/reminder");
configDotenv('env')
const twilioClient = require("../config/twillio");
const axios = require("axios");

class CustomScheduler {
    constructor() {
        this.jobs = new Map();
        this.isProcessing = false;
    }

    // Schedule a new reminder
    async scheduleReminder(reminderId, runAt) {
        const now = Date.now();
        const delay = runAt.getTime() - now;

        if (delay <= 0) {
            // Run immediately if time has passed
            await this.runReminder(reminderId);
            return;
        }

        // Schedule timeout
        const timeoutId = setTimeout(async () => {
            await this.runReminder(reminderId);
            this.jobs.delete(reminderId);
        }, delay);

        // Store the job
        this.jobs.set(reminderId, {
            timeoutId,
            runAt,
            status: 'scheduled'
        });

        console.log(`--------Scheduled reminder ${reminderId} to run at ${runAt}`);
    }

    // Run a reminder immediately
    async runReminder(reminderId) {
        try {
            console.log(`-----Running reminder: ${reminderId}`);

            const reminder = await Reminder.findById(reminderId);
            if (!reminder || reminder.completed) {
                console.log(`❌ Reminder ${reminderId} not found or completed`);
                this.jobs.delete(reminderId); // Remove from scheduler
                return;
            }

            const job = this.jobs.get(reminderId);
            if (job && job.status === 'running') {
                console.log(`⏸️  Reminder ${reminderId} is already running, skipping`);
                return;
            }

            if (job) {
                job.status = 'running';
            }

            // Send SMS
            // console.log(`📱 Sending SMS to: ${reminder.phoneNumber}`);
            // await twilioClient.messages.create({
            //     body: `Reminder: ${reminder.title} - Time: ${reminder.date.toLocaleString()}`,
            //     from: process.env.TWILIO_PHONE_NUMBER,
            //     to: reminder.phoneNumber,
            // });

            // Make phone call
            console.log(`----------- Making call to: ${reminder.phoneNumber}`);
            await twilioClient.calls.create({
                to: reminder.phoneNumber,
                from: process.env.TWILIO_PHONE_NUMBER,
                url: `${process.env.BASE_URL}/voice?reminderId=${reminder._id}`,
                method: "POST",
            });

            // Handle repetition
            if (reminder.repeat && reminder.repeat !== "none") {
                let nextDate = new Date(reminder.date);
                if (reminder.repeat === "never") {
                    try {
                        reminder.completed = true;
                        await reminder.save();
                        console.log(`Reminder ${reminderId} marked as completed`);
                        const res = await axios.delete(`${process.env.BASE_URL}/reminder/${reminder._id}`);
                    } catch (err) {
                        console.error("Error calling backend delete:", err);
                    }
                } else {
                    if (reminder.repeat === "daily") nextDate.setDate(nextDate.getDate() + 1);
                    else if (reminder.repeat === "weekly") nextDate.setDate(nextDate.getDate() + 7);
                    else if (reminder.repeat === "monthly") nextDate.setMonth(nextDate.getMonth() + 1);
                    else if (reminder.repeat === "yearly") nextDate.setFullYear(nextDate.getFullYear() + 1);


                    reminder.date = nextDate;
                    await reminder.save();


                    await this.scheduleReminder(reminder._id.toString(), nextDate);
                    console.log(`-------------Scheduled next reminder for: ${nextDate}`);
                }
            } else {
                reminder.completed = true;
                await reminder.save();
                console.log(`🎯 Reminder ${reminderId} marked as completed`);

            }

            console.log(`✅ Completed reminder: ${reminderId}`);

            // ✅ REMOVE FROM SCHEDULER AFTER COMPLETION
            this.jobs.delete(reminderId);

        } catch (error) {
            console.error(`❌ Error running reminder ${reminderId}:`, error);
            // ✅ MARK AS FAILED BUT KEEP IN SCHEDULER FOR RETRY
            const job = this.jobs.get(reminderId);
            if (job) {
                job.status = 'failed';
            }
        }
    }

    // Cancel a scheduled reminder
    cancelReminder(reminderId) {
        const job = this.jobs.get(reminderId);
        if (job) {
            clearTimeout(job.timeoutId);
            this.jobs.delete(reminderId);
            console.log(`❌ Cancelled reminder: ${reminderId}`);
        }
    }

    // Load all reminders from database on startup
    async loadScheduledReminders() {
        try {
            const reminders = await Reminder.find({
                completed: false,
                date: { $gt: new Date() } // Future reminders
            });

            // console.log(`📋 Loading ${reminders.length} scheduled reminders`);

            for (const reminder of reminders) {
                await this.scheduleReminder(reminder._id.toString(), reminder.date);
            }

        } catch (error) {
            console.error('Error loading scheduled reminders:', error);
        }
    }

    // Get all scheduled jobs
    getScheduledJobs() {
        return Array.from(this.jobs.entries()).map(([reminderId, job]) => ({
            reminderId,
            runAt: job.runAt,
            status: job.status
        }));
    }
}

module.exports = new CustomScheduler();