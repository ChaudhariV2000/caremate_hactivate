const express = require('express');
const router = express.Router();
const reminderController = require('../Controller/reminderController');
const Reminder = require('../Model/reminder')

router.post('/create', reminderController.createReminder);

router.get('/getAllReminder', reminderController.getAllReminders);

router.put('/updateReminder/:id', reminderController.updateReminder);

router.delete("/reminder/:id", async (req, res) => {
    try {
        const deletedReminder = await Reminder.findByIdAndDelete(req.params.id);
        if (!deletedReminder) {
            return res.status(404).json({ message: "Reminder not found" });
        }
        res.json({ success: true, message: "Reminder deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting reminder", error });

    }
});


module.exports = router;
