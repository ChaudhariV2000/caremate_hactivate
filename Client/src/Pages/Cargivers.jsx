import React, { useState, useEffect } from 'react';
// Assuming you have SearchForm component defined elsewhere
// import SearchForm from './SearchForm';

const App = () => {
  const [caregivers, setCaregivers] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({});

  // Fetch caregivers based on search criteria (placeholder function)
  useEffect(() => {
    fetchCaregivers(searchCriteria);
  }, [searchCriteria]);

  const fetchCaregivers = async (criteria) => {
    // Implement API call to fetch caregivers
    // Example of updating caregivers (replace with actual API call)
    const fetchedCaregivers = [
      {
        _id: 1,
        name: 'John Doe',
        age: 45,
        experience: 10,
        specialties: ['Elderly Care', 'Physical Therapy'],
        hourlyRate: 25,
        location: 'New York, USA',
        languages: ['English', 'Spanish'],
        rating: 4.8,
        imageUrl: 'https://media.geeksforgeeks.org/gfg-gg-logo.svg',
      },
      {
        _id: 1,
        name: 'John Doe',
        age: 45,
        experience: 10,
        specialties: ['Elderly Care', 'Physical Therapy'],
        hourlyRate: 25,
        location: 'New York, USA',
        languages: ['English', 'Spanish'],
        rating: 4.8,
        imageUrl: 'https://media.geeksforgeeks.org/gfg-gg-logo.svg',
      },
      {
        _id: 1,
        name: 'John Doe',
        age: 45,
        experience: 10,
        specialties: ['Elderly Care', 'Physical Therapy'],
        hourlyRate: 25,
        location: 'New York, USA',
        languages: ['English', 'Spanish'],
        rating: 4.8,
        imageUrl: 'https://media.geeksforgeeks.org/gfg-gg-logo.svg',
      },
      {
        _id: 1,
        name: 'John Doe',
        age: 45,
        experience: 10,
        specialties: ['Elderly Care', 'Physical Therapy'],
        hourlyRate: 25,
        location: 'New York, USA',
        languages: ['English', 'Spanish'],
        rating: 4.8,
        imageUrl: 'https://media.geeksforgeeks.org/gfg-gg-logo.svg',
      },
      // ... other caregiver objects
    ];
    setCaregivers(fetchedCaregivers);
  };

  const CaregiverCard = ({ caregiver }) => {
    return (
      <div
        className="w-full border shadow-lg rounded-lg overflow-hidden transition duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:bg-gray-100"
      >
        <img
          className="w-full h-48 object-cover"
          src={caregiver.imageUrl}
          alt={`Caregiver ${caregiver.name}`}
        />
        <div className="p-4 bg-white">
          <h2 className="text-xl font-bold">{caregiver.name}</h2>
          <div className="flex flex-wrap justify-between items-center mt-2">
            <div className="flex items-center space-x-2">
              <p className="text-gray-600">Age: {caregiver.age}</p>
              <p className="text-gray-600">Exp: {caregiver.experience} yrs</p>
            </div>
            <p className="text-gray-600 text-right">Rating: {caregiver.rating}/5</p>
          </div>
          <div className="flex flex-wrap justify-between mt-4">
            <p className="text-sm text-gray-600">
              Specialties: {caregiver.specialties.join(', ')}
            </p>
            <p className="text-sm text-gray-600 text-right">
              ${caregiver.hourlyRate}/hr
            </p>
          </div>
          <div className="flex items-center mt-4">
            <p className="text-sm text-gray-600">Location: {caregiver.location}</p>
            <div className="flex items-center ml-auto">
              {caregiver.languages.map((lang) => (
                <span
                  key={lang}
                  className="inline-block bg-gray-200 px-2 py-1 rounded-full mr-2 text-xs text-gray-600"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Caregiver Finder</h1>
      {/* Add SearchForm component here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 caregiver-list ">
        {caregivers.length === 0 ? (
          <p>No caregivers found.</p>
        ) : (
          caregivers.map((caregiver) => (
            <CaregiverCard key={caregiver._id} caregiver={caregiver} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
