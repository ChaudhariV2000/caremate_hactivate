import React, { useEffect, useState } from "react";
import axios from "axios";

const RemindersList = () => {
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const response = await axios.get("http://localhost:5000/reminder"); // Adjust the URL as needed
                setReminders(response.data);
            } catch (error) {
                console.error("Error fetching reminders:", error);
            }
        };

        fetchReminders();
    }, []);

    const handleDelete = async (id) => {
        try {
            alert(id)
            await axios.delete(`https://f8ae-27-0-59-131.ngrok-free.app/reminder/${id}`);

            setReminders(reminders.filter((reminder) => reminder._id !== id)); // Update state to remove deleted reminder
        } catch (error) {
            console.error("Error deleting reminder:", error);
        }
    };

    const handleEdit = (reminder) => {
        // Implement edit functionality (e.g., open a modal or redirect to an edit page)
        console.log("Edit reminder:", reminder);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6">My Reminders</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reminders.map((reminder) => (
                    <div key={reminder._id} className="bg-white rounded-lg shadow-lg p-4">
                        <h3 className="text-xl font-semibold">{reminder.title}</h3>
                        <p className="text-gray-700">Type: {reminder.type}</p>
                        <p className="text-gray-700">Date: {new Date().toLocaleDateString()}</p>
                        <p className="text-gray-700">Time: {new Date().toLocaleTimeString()}</p>
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
        </div>
    );
};

export default RemindersList;
