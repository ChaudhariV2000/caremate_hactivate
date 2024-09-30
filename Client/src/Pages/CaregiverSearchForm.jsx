import React, { useState } from 'react';
import { Link } from "react-router-dom";

const CaregiverSearchForm = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    relationToPatient: 'self',
    location: '',
    mapLocation: { lat: null, lng: null },
    specialties: [],
    maxHourlyRate: '',
    languages: [],
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

  const handleMapClick = (event) => {
    // Placeholder for map functionality
    setFormData({
      ...formData,
      mapLocation: { lat: event.latLng.lat(), lng: event.latLng.lng() }
    });
  };

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      {[1, 2, 3, 4].map((num) => (
        <div key={num} className={`w-3 h-3 rounded-full mx-1 ${num <= step ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
      ))}
    </div>
  );

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200";
  const buttonClass = "w-full py-2 px-4 rounded-lg text-white font-semibold transition duration-200";
  const checkboxClass = "form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out";

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Find Your Ideal Caregiver</h2>
      {renderStepIndicator()}
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold text-gray-700" htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={inputClass}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700" htmlFor="age">Your Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
                min="0"
                className={inputClass}
                placeholder="Enter your age"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Care Recipient</label>
              <select
                name="relationToPatient"
                value={formData.relationToPatient}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="self">Myself</option>
                <option value="family">Family Member</option>
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold text-gray-700" htmlFor="location">Your Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="e.g., Mumbai, Maharashtra"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Point Your Location on Map</label>
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                Map Component (Click to set location)
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <label className="block mb-4 font-semibold text-gray-700">Required Specialties</label>
            <div className="grid grid-cols-2 gap-4">
              {['Elderly Care', 'Dementia Care', 'Alzheimers Care', 'Physical Therapy', 'Occupational Therapy', 'Speech Therapy', 'Home Health Aide', 'Companionship Care', 'Live-In Care', 'Respite Care'].map(specialty => (
                <div key={specialty} className="flex items-center">
                  <input
                    type="checkbox"
                    id={specialty}
                    name="specialties"
                    value={specialty}
                    checked={formData.specialties.includes(specialty)}
                    onChange={handleCheckboxChange}
                    className={checkboxClass}
                  />
                  <label htmlFor={specialty} className="ml-2 text-gray-700">{specialty}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700" htmlFor="maxHourlyRate">Maximum Hourly Rate (₹)</label>
              <input
                type="number"
                id="maxHourlyRate"
                name="maxHourlyRate"
                value={formData.maxHourlyRate}
                onChange={handleInputChange}
                min="0"
                className={inputClass}
                placeholder="Enter maximum hourly rate"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Required Languages</label>
              <div className="grid grid-cols-3 gap-4">
                {['Hindi', 'English', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Other'].map(language => (
                  <div key={language} className="flex items-center">
                    <input
                      type="checkbox"
                      id={language}
                      name="languages"
                      value={language}
                      checked={formData.languages.includes(language)}
                      onChange={handleCheckboxChange}
                      className={checkboxClass}
                    />
                    <label htmlFor={language} className="ml-2 text-gray-700">{language}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Availability Required</label>
              <div className="grid grid-cols-2 gap-4">
                {['Daily', 'All Day', 'Mornings', 'Evenings', 'Weekdays', 'Weekends'].map(time => (
                  <div key={time} className="flex items-center">
                    <input
                      type="checkbox"
                      id={time}
                      name="availability"
                      value={time}
                      checked={formData.availability.includes(time)}
                      onChange={handleCheckboxChange}
                      className={checkboxClass}
                    />
                    <label htmlFor={time} className="ml-2 text-gray-700">{time}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button type="button" onClick={handlePreviousStep} className={`${buttonClass} bg-gray-500 hover:bg-gray-600`}>
              Previous
            </button>
          )}
          {step < 4 ? (
            <button type="button" onClick={handleNextStep} className={`${buttonClass} bg-blue-500 hover:bg-blue-600 ${step > 1 ? 'ml-4' : 'ml-auto'}`}>
              Next
            </button>
          ) : (
            
            <Link to="/caregivers">
  <button type="button" className={`${buttonClass} bg-green-500 hover:bg-green-600 ml-auto`}>
    Search for Caregivers
  </button>
</Link>
            
          )}
        </div>
      </form>
    </div>
  );
};

export default CaregiverSearchForm;