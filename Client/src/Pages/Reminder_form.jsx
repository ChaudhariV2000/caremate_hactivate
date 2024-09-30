import React, { useState } from "react";
import { FaClock, FaCalendarAlt, FaUser, FaHeading, FaCalendarCheck, FaRedoAlt } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const ScheduleReminders = () => {
  const [formData, setFormData] = useState({
    username: "",
    title: "",
    type: "",
    date: "",
    time: "",
    repeat: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post('https://bbb2-27-0-59-131.ngrok-free.app/reminder', formData); // Replace with your actual API endpoint

      // Optionally reset form data after submission
      setFormData({
        username: "",
        title: "",
        type: "",
        date: "",
        time: "",
        repeat: ""
      });

      // Optionally navigate to the reminders list after successful submission
      navigate("/reminders"); // Adjust the path according to your routing setup
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 font-serif">Schedule Reminders</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="relative">
            <label htmlFor="username" className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
              <FaUser className="inline mr-1" />Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              placeholder="Enter your username"
            />
          </div>

          {/* Title Field */}
          <div className="relative">
            <label htmlFor="title" className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
              <FaHeading className="inline mr-1" />Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              placeholder="Enter reminder title"
            />
          </div>

          {/* Reminder Type Field */}
          <div className="relative">
            <label htmlFor="type" className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
              <FaCalendarCheck className="inline mr-1" />Reminder Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
            >
              <option value="">Select type</option>
              <option value="medication">Medication</option>
              <option value="appointment">Appointment</option>
              <option value="daily_routine">Daily Routine</option>
            </select>
          </div>

          {/* Date and Time Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label htmlFor="date" className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                <FaCalendarAlt className="inline mr-1" />Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="relative">
              <label htmlFor="time" className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                <FaClock className="inline mr-1" />Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Repeat Field */}
          <div className="relative">
            <label htmlFor="repeat" className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
              <FaRedoAlt className="inline mr-1" />Repeat
            </label>
            <select
              id="repeat"
              name="repeat"
              value={formData.repeat}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
            >
              <option value="">Select repeat option</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="never">Never</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white py-3 px-4 rounded-md hover:from-blue-600 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out font-semibold text-lg shadow-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving Reminder...
              </span>
            ) : (
              "Save Reminder"
            )}
          </button>
        </form>

        {/* Link to Reminders List */}
        <div className="mt-4">
          <button
            onClick={() => navigate("/reminders")} // Add onClick to navigate
            className="w-full bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition duration-200 ease-in-out font-semibold text-lg shadow-md"
          >
            View Reminders List
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleReminders;
