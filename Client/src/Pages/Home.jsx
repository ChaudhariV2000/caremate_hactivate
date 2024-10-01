import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaVideo, FaHeartbeat, FaBell, FaUserMd } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="font-sans bg-gradient-to-b from-purple-100 to-pink-100">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-32 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center relative z-10"
        >
          <h2 className="text-6xl font-bold text-white mb-6 shadow-text">Compassionate Care at Your Fingertips</h2>
          <p className="text-2xl text-white mb-10 max-w-3xl mx-auto shadow-text">Connecting elderly individuals with caregivers, family members, and health professionals for remote assistance.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white py-3 px-8 rounded-full text-xl hover:bg-purple-500 transition duration-300 shadow-2xl"
          >
            <Link to="/Signup">Get Started</Link>
          </motion.button>
        </motion.div>
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"}}></div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#fff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,218.7C672,203,768,149,864,128C960,107,1056,117,1152,133.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center text-purple-600 mb-12">Our Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FaCalendarAlt className="text-4xl text-purple-500" />, title: "Daily Task Reminders", description: "Never miss important tasks or medications with our smart reminder system." },
              { icon: <FaVideo className="text-4xl text-pink-500" />, title: "Video Calling", description: "Stay connected with loved ones and healthcare providers through high-quality video calls." },
              { icon: <FaHeartbeat className="text-4xl text-red-500" />, title: "Health Tracking", description: "Monitor vital signs and health metrics to ensure optimal well-being." },
              { icon: <FaBell className="text-4xl text-yellow-500" />, title: "Emergency Alerts", description: "Instant notifications to caregivers and family members in case of emergencies." },
              { icon: <FaUserMd className="text-4xl text-green-500" />, title: "Caregiver Marketplace", description: "Access a network of verified and skilled caregivers for personalized care." },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gradient-to-r from-purple-100 to-pink-100 py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold text-purple-600 mb-8">What Our Users Say</h3>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto flex items-center bg-white p-8 rounded-lg shadow-xl"
          >
            <img src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="User" className="w-32 h-32 rounded-full object-cover mr-8 border-4 border-purple-300" />
            <div className="text-left">
              <p className="text-xl text-gray-600 italic">"CareMate has given me peace of mind knowing that my mother is well taken care of, even when I can't be there in person. The daily check-ins and easy communication with her caregiver are invaluable."</p>
              <p className="mt-4 font-semibold text-purple-600">- Sarah Johnson, Daughter of CareMate User</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold mb-4">Ready to Experience Better Care?</h3>
          <p className="text-xl mb-8">Join CareMate today and discover a new level of support for your loved ones.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-600 py-3 px-8 rounded-full text-xl hover:bg-purple-100 transition duration-300 shadow-lg"
          >
            Sign Up Now
          </motion.button>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center text-purple-600 mb-12">Care in Action</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "https://images.unsplash.com/photo-1574279606130-09958dc756f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
              "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80",
              "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            ].map((src, index) => (
              <motion.img
                key={index}
                src={src}
                alt={`Care ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <Link to="/cg_reg" className="text-purple-600 hover:text-purple-800 transition duration-300">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-100 text-purple-600 py-3 px-8 rounded-full text-xl hover:bg-purple-200 transition duration-300 shadow-lg"
            >
              Are you a caregiver? Click here to join CareMate
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg text-center hover:shadow-xl transition duration-300 border border-purple-100">
      <div className="mb-4 transform hover:scale-110 transition duration-300">{icon}</div>
      <h4 className="text-xl font-bold text-purple-600 mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;