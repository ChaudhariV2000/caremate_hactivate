import React, { useState } from 'react';
import axios from 'axios';

const CaregiverRegistrationForm = () => {
  const [formData, setFormData] = useState({
    _id:'50',
    name: '',
    age: '',
    experience: '',
    specialties: [],
    hourlyRate: '',
    location: '',
    languages: [],
    imageUrl: '',
    phoneNumber: '',
    email: '',
    description: '',
    availability: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, [name]: [...formData[name], value] });
    } else {
      setFormData({ ...formData, [name]: formData[name].filter(item => item !== value) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/setCaregivers', formData);
      console.log('Caregiver registered:', response.data);
      // Handle successful registration (e.g., show success message, redirect)
    } catch (error) {
      console.error('Registration error:', error);
      // Handle registration error (e.g., show error message)
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Caregiver Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="age" className="block mb-2 font-semibold text-gray-700">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="experience" className="block mb-2 font-semibold text-gray-700">Years of Experience</label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Specialties</label>
          <div className="grid grid-cols-2 gap-2">
            {['Elderly Care', 'Dementia Care', 'Alzheimers Care', 'Physical Therapy', 'Occupational Therapy', 'Speech Therapy', 'Home Health Aide', 'Companionship Care', 'Live-In Care', 'Respite Care'].map(specialty => (
              <div key={specialty} className="flex items-center">
                <input
                  type="checkbox"
                  id={specialty}
                  name="specialties"
                  value={specialty}
                  checked={formData.specialties.includes(specialty)}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <label htmlFor={specialty} className="ml-2 text-gray-700">{specialty}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="hourlyRate" className="block mb-2 font-semibold text-gray-700">Hourly Rate (₹)</label>
          <input
            type="number"
            id="hourlyRate"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="location" className="block mb-2 font-semibold text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Languages</label>
          <div className="grid grid-cols-3 gap-2">
            {['Hindi', 'English', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Other'].map(language => (
              <div key={language} className="flex items-center">
                <input
                  type="checkbox"
                  id={language}
                  name="languages"
                  value={language}
                  checked={formData.languages.includes(language)}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <label htmlFor={language} className="ml-2 text-gray-700">{language}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="imageUrl" className="block mb-2 font-semibold text-gray-700">Profile Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block mb-2 font-semibold text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2 font-semibold text-gray-700">Description (Max 1000 characters)</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            maxLength={1000}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Availability</label>
          <div className="grid grid-cols-2 gap-2">
            {['Daily', 'All Day', 'Mornings', 'Evenings', 'Weekdays', 'Weekends'].map(time => (
              <div key={time} className="flex items-center">
                <input
                  type="checkbox"
                  id={time}
                  name="availability"
                  value={time}
                  checked={formData.availability.includes(time)}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <label htmlFor={time} className="ml-2 text-gray-700">{time}</label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          Register as Caregiver
        </button>
      </form>
    </div>
  );
};

export default CaregiverRegistrationForm;