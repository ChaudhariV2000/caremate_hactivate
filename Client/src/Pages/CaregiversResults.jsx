import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const CaregiversResults = () => {
    const location = useLocation();
    const [allCaregivers, setAllCaregivers] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const { caregivers = [], searchCriteria = {} } = location.state || {};

    // Fetch all caregivers when component mounts
    useEffect(() => {
        const fetchAllCaregivers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/allCaregivers`);
                if (response.data.success) {
                    setAllCaregivers(response.data.caregivers);
                }
            } catch (error) {
                console.error("Error fetching all caregivers:", error);
            }
        };

        fetchAllCaregivers();
    }, []);

    // Determine which caregivers to display
    const displayCaregivers = showAll ? allCaregivers : caregivers;

    if ((!displayCaregivers || displayCaregivers.length === 0) && !showAll) {
        return (
            <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    No Caregivers Found
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    We couldn't find any caregivers matching your criteria.
                </p>

                {/* Button to show all caregivers */}
                <div className="text-center space-y-4">
                    <button
                        onClick={() => setShowAll(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
                    >
                        Browse All Caregivers
                    </button>
                    <br />
                    <Link to="/cg">
                        <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg">
                            Back to Search
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto mt-10 p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                    {showAll ? 'All Caregivers' : 'Search Results'}
                    ({displayCaregivers.length})
                </h2>

                <div className="space-x-4">
                    {!showAll && (
                        <button
                            onClick={() => setShowAll(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                        >
                            Show All Caregivers
                        </button>
                    )}
                    {showAll && (
                        <button
                            onClick={() => setShowAll(false)}
                            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
                        >
                            Back to Search Results
                        </button>
                    )}
                    <Link to="/cg">
                        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
                            New Search
                        </button>
                    </Link>
                </div>
            </div>

            {showAll && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
                    <p>Showing all available caregivers. Use the search feature to filter by specific criteria.</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayCaregivers.map((caregiver) => (
                    <div key={caregiver._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="text-center mb-4">
                            <img
                                src={caregiver.imageUrl || '/default-avatar.png'}
                                alt={caregiver.name}
                                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                            />
                            <h3 className="text-xl font-semibold text-gray-800">{caregiver.name}</h3>
                            <p className="text-gray-600">{caregiver.age} years old</p>
                        </div>

                        <div className="space-y-2">
                            <p><span className="font-semibold">Experience:</span> {caregiver.experience} years</p>
                            <p><span className="font-semibold">Hourly Rate:</span> ₹{caregiver.hourlyRate}</p>
                            <p><span className="font-semibold">Location:</span> {caregiver.location}</p>

                            <div>
                                <span className="font-semibold">Specialties:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {caregiver.specialties.map((spec, index) => (
                                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <span className="font-semibold">Languages:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {caregiver.languages.map((lang, index) => (
                                        <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4"
                                onClick={() => {
                                    navigator.clipboard.writeText(caregiver.phoneNumber);
                                    alert(`Phone number copied to clipboard: ${caregiver.phoneNumber}`);
                                }}
                            >
                                📞 Copy Phone Number
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CaregiversResults;