import React from "react";
import { FaPhone, FaMapMarkerAlt, FaHeartbeat, FaWalking, FaBed } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Profile = () => {
  const healthScore = 468;
  const healthScorePercentage = 95;

  const heartRateData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Heart Rate (bpm)",
        data: [72, 75, 78, 76, 74, 73, 71],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const bloodPressureData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Systolic",
        data: [120, 118, 122, 121, 119, 120, 117],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Diastolic",
        data: [80, 79, 81, 80, 78, 79, 77],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly Health Data",
      },
    },
  };

  const performanceMetrics = [
    { icon: FaHeartbeat, label: "Avg. Heart Rate", value: "72 bpm" },
    { icon: FaWalking, label: "Daily Steps", value: "5,234" },
    { icon: FaBed, label: "Sleep Quality", value: "Good" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Information Section */}
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-3">
          <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
          <div className="flex flex-col md:flex-row items-center">
            <img
              src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
              alt="Martha Smith"
              className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
            />
            <div>
              <h3 className="text-2xl font-semibold">Martha Smith</h3>
              <p className="text-gray-600 mb-2">Age: 72 | Gender: Female</p>
              <p className="flex items-center text-gray-600 mb-1">
                <FaPhone className="mr-2" /> (555) 123-4567
              </p>
              <p className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2" /> 123 Elm Street, Anytown, USA 12345
              </p>
            </div>
          </div>
        </div>

        {/* Overall Performance Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Overall Performance</h2>
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <svg className="w-48 h-48">
                <circle
                  className="text-gray-300"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="90"
                  cx="96"
                  cy="96"
                />
                <circle
                  className="text-blue-600"
                  strokeWidth="10"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="90"
                  cx="96"
                  cy="96"
                  strokeDasharray={`${healthScorePercentage * 5.65}, 565`}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-4xl font-bold">{healthScore}</span>
                <span className="text-xl font-semibold block">{healthScorePercentage}%</span>
              </div>
            </div>
          </div>
          <p className="text-center mb-6 text-gray-600">
            Your health score is better than 95% of people your age.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <metric.icon className="text-3xl text-blue-500 mb-2" />
                <span className="text-sm font-medium text-gray-600">{metric.label}</span>
                <span className="text-lg font-semibold">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Section */}
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Heart Rate</h3>
              <div className="h-96">
                <Bar
                  data={heartRateData}
                  options={{
                    ...options,
                    plugins: {
                      ...options.plugins,
                      title: {
                        ...options.plugins.title,
                        text: "Weekly Heart Rate",
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Blood Pressure</h3>
              <div className="h-96">
                <Bar
                  data={bloodPressureData}
                  options={{
                    ...options,
                    plugins: {
                      ...options.plugins,
                      title: {
                        ...options.plugins.title,
                        text: "Weekly Blood Pressure",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
