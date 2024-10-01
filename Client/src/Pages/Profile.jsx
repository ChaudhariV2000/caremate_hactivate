import React, { useState } from "react";
import { FaPhone, FaMapMarkerAlt, FaHeartbeat, FaWalking, FaBed, FaCheckCircle } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Profile = () => {
  const healthScore = 468;
  const healthScorePercentage = 95;

  const [tasks, setTasks] = useState([
    { id: 1, title: "Morning Walk", time: "6:30 am - 7:00 am", completed: false, color: "bg-green-100" },
    { id: 2, title: "Check Blood Pressure", time: "8:00 am - 8:15 am", completed: true, color: "bg-yellow-100" },
    { id: 3, title: "Take Medication", time: "9:00 am - 9:15 am", completed: false, color: "bg-blue-100" },
    { id: 4, title: "Call Grandchildren", time: "2:00 pm - 2:30 pm", completed: false, color: "bg-blue-100" },
    { id: 5, title: "Evening Exercise", time: "5:00 pm - 5:30 pm", completed: false, color: "bg-green-100" }
  ]);

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasks = tasks.filter(task => task.completed).length;

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
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-3">
          <h2 className="text-2xl font-semibold mb-4">Overall Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
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
              <div className="grid grid-cols-1 gap-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <metric.icon className="text-3xl text-blue-500 mb-2" />
                    <span className="text-sm font-medium text-gray-600">{metric.label}</span>
                    <span className="text-lg font-semibold">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4">Analytics</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Heart Rate</h4>
                  <div className="h-64">
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
                  <h4 className="text-lg font-semibold mb-2">Blood Pressure</h4>
                  <div className="h-64">
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

        {/* Today's Tasks Section */}
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Today's Tasks</h2>
            <span className="text-gray-600 text-sm">{completedTasks}/{tasks.length} Completed</span>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            {tasks.map((task, index) => (
              <div key={task.id} className={`relative flex items-center mb-4 p-4 rounded-lg ${task.color}`}>
                <div className={`absolute left-4 w-4 h-4 -ml-2 rounded-full ${task.completed ? 'bg-green-500' : 'border-2 border-gray-300 bg-white'}`}></div>
                <div className="ml-6 flex-grow">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.time}</p>
                </div>
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`w-6 h-6 rounded-full ${task.completed ? 'bg-green-500 text-white' : 'border-2 border-gray-300'} flex items-center justify-center`}
                >
                  {task.completed && <FaCheckCircle />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
