const Reminder = require('../Model/reminder');
const scheduler = require('../Jobs/customScheduler'); // Add this

exports.createReminder = async (req, res) => {
    try {
        console.log("📝 Create reminder request received:", req.body);

        const { username, title, phoneNumber, type, time, date, repeat } = req.body;

        // Validation and date parsing (your existing code)
        const dateTimeString = `${date}T${time}:00`;
        let when = new Date(dateTimeString);
         // ❗ Adjust for 5 hour difference (subtract 5 hours)
        when = new Date(when.getTime() - (5 * 60 * 60 * 1000));

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

        const { id } = req.params;
        const { title, phoneNumber, type, time, date, repeat } = req.body;


        let when;
        if (date && time) {
            const dateTimeString = `${date}T${time}:00`;
            when = new Date(dateTimeString);
        }


        let formattedPhone = phoneNumber;
        if (phoneNumber && phoneNumber.length === 10 && !phoneNumber.startsWith('+')) {
            formattedPhone = `+91${phoneNumber}`;
        }

        const updatedReminder = await Reminder.findByIdAndUpdate(
            id,
            {
                ...(title && { title }),
                ...(formattedPhone && { phoneNumber: formattedPhone }),
                ...(type && { type }),
                ...(when && { date: when, time }),
                ...(repeat && { repeat })
            },
            { new: true }
        );

        if (!updatedReminder) {
            return res.status(404).json({ success: false, message: 'Reminder not found' });
        }

        if (when) {
            await scheduler.cancelReminder(id);
            await scheduler.scheduleReminder(id, when);
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


