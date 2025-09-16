const Reminder = require('../Model/reminder');
const scheduler = require('../Jobs/customScheduler'); // Add this

exports.createReminder = async (req, res) => {
    try {
        console.log("📝 Create reminder request received:", req.body);

        const { username, title, phoneNumber, type, time, date, repeat } = req.body;

        // Validation and date parsing (your existing code)
        const dateTimeString = `${date}T${time}:00`;
        const when = new Date(dateTimeString);

        // Format phone number
        let formattedPhone = phoneNumber;
        if (phoneNumber.length === 10 && !phoneNumber.startsWith('+')) {
            formattedPhone = `+91${phoneNumber}`;
        }

        // Create reminder
        const reminder = new Reminder({
            username, title,
            phoneNumber: formattedPhone,
            type, date: when, time, repeat
        });
        await reminder.save();

        // ✅ USE CUSTOM SCHEDULER instead of Agenda
        await scheduler.scheduleReminder(reminder._id.toString(), when);

        res.status(201).json({
            success: true,
            reminder,
            message: 'Reminder created and scheduled'
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getAllReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find();
        res.status(200).json(reminders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update other methods similarly...