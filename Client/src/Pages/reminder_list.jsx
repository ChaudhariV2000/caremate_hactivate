import React, { useEffect, useState } from "react";
import axios from "axios";

const RemindersList = () => {
    const [reminders, setReminders] = useState([]);
    const [editingReminder, setEditingReminder] = useState(null); // state for reminder being edited
    const [formData, setFormData] = useState({
        title: "",
        type: "",
        date: "",
        time: "",
        repeat: ""
    });

    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getAllReminder`);
                console.log("API Response:", response.data);

                setReminders(response.data);
            } catch (error) {
                console.error("Error fetching reminders:", error);
            }
        };

        fetchReminders();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/reminder/${id}`);
            setReminders(reminders.filter((reminder) => reminder._id !== id));
        } catch (error) {
            console.error("Error deleting reminder:", error);
        }
    };

    const handleEdit = (reminder) => {
        setEditingReminder(reminder._id);
        setFormData({
            title: reminder.title,
            type: reminder.type,
            date: new Date(reminder.date).toISOString().split("T")[0], // pre-fill date
            time: reminder.time,
            repeat: reminder.repeat
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/updateReminder/${editingReminder}`,
                formData
            );

            // Update state with new reminder
            setReminders(reminders.map(r => r._id === editingReminder ? response.data.reminder : r));

            setEditingReminder(null); // close modal
        } catch (error) {
            console.error("Error updating reminder:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6">My Reminders</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reminders.map((reminder) => (
                    <div key={reminder._id} className="bg-white rounded-lg shadow-lg p-4">
                        <h3 className="text-xl font-semibold">{reminder.title}</h3>
                        <p className="text-gray-700">Type: {reminder.type}</p>
                        <p className="text-gray-700">
                            Date: {new Date(reminder.date).toISOString().split("T")[0]}
                        </p>
                        <p className="text-gray-700">Time: {reminder.time}</p>
                        <p className="text-gray-700">Repeat: {reminder.repeat}</p>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => handleEdit(reminder)}
                                className="text-blue-500 hover:underline"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(reminder._id)}
                                className="text-red-500 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {editingReminder && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Edit Reminder</h2>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="w-full border p-2 mb-2 rounded"
                        />
                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            placeholder="Type"
                            className="w-full border p-2 mb-2 rounded"
                        />
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full border p-2 mb-2 rounded"
                        />
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full border p-2 mb-2 rounded"
                        />
                        <input
                            type="text"
                            name="repeat"
                            value={formData.repeat}
                            onChange={handleChange}
                            placeholder="Repeat"
                            className="w-full border p-2 mb-2 rounded"
                        />

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setEditingReminder(null)}
                                className="mr-2 px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RemindersList;
