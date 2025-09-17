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
        console.log(reminders)
        res.status(200).json(reminders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateReminder = async (req, res) => {
    try {
        console.log("✏️ Update reminder request received:", req.body);

        const { id } = req.params; // reminder ID from URL
        const { title, phoneNumber, type, time, date, repeat } = req.body;

        // Parse new date/time if provided
        let when;
        if (date && time) {
            const dateTimeString = `${date}T${time}:00`;
            when = new Date(dateTimeString);
        }

        // Format phone number if updated
        let formattedPhone = phoneNumber;
        if (phoneNumber && phoneNumber.length === 10 && !phoneNumber.startsWith('+')) {
            formattedPhone = `+91${phoneNumber}`;
        }

        // Update reminder in DB
        const updatedReminder = await Reminder.findByIdAndUpdate(
            id,
            {
                ...(title && { title }),
                ...(formattedPhone && { phoneNumber: formattedPhone }),
                ...(type && { type }),
                ...(when && { date: when, time }),
                ...(repeat && { repeat })
            },
            { new: true } // return updated doc
        );

        if (!updatedReminder) {
            return res.status(404).json({ success: false, message: 'Reminder not found' });
        }

        // ✅ Reschedule if time changed
        if (when) {
            await scheduler.cancelReminder(id); // cancel old job
            await scheduler.scheduleReminder(id, when); // schedule new one
        }

        res.status(200).json({
            success: true,
            reminder: updatedReminder,
            message: 'Reminder updated successfully'
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


