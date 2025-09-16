const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    phoneNumber: { type: String, required: true }, // store in E.164: +9198...
    type: { type: String },
    date: { type: Date, required: true }, // full timestamp
    time: { type: String, required: true },
    repeat: { type: String, enum: ['never', 'yearly', 'daily', 'weekly', 'monthly'], default: 'none' },
    completed: { type: Boolean, default: false },
    taken: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Reminder', ReminderSchema);
