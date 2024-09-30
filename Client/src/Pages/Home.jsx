import React from "react";
import { FaCalendarAlt, FaVideo, FaHeartbeat, FaBell, FaUserMd } from "react-icons/fa";
import axios from 'axios';
import { useEffect, useState } from "react";

const Home = () => {

  return (
    <div className="font-sans bg-gray-100">
      {/* Hero Section */}
      <header className="bg-white py-20 relative">
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Compassionate Care at Your Fingertips</h2>
          <p className="text-xl text-gray-600 mb-8">Connecting elderly individuals with caregivers, family members, and health professionals for remote assistance.</p>
          <button className="bg-gray-800 text-white py-2 px-6 rounded-full text-lg hover:bg-gray-700 transition duration-300">Get Started</button>
        </div>
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')", filter: "brightness(0.8)"}}></div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon={<FaCalendarAlt className="text-4xl text-gray-600" />} title="Daily Task Reminders" description="Never miss important tasks or medications with our smart reminder system." />
            <FeatureCard icon={<FaVideo className="text-4xl text-gray-600" />} title="Video Calling" description="Stay connected with loved ones and healthcare providers through high-quality video calls." />
            <FeatureCard icon={<FaHeartbeat className="text-4xl text-gray-600" />} title="Health Tracking" description="Monitor vital signs and health metrics to ensure optimal well-being." />
            <FeatureCard icon={<FaBell className="text-4xl text-gray-600" />} title="Emergency Alerts" description="Instant notifications to caregivers and family members in case of emergencies." />
            <FeatureCard icon={<FaUserMd className="text-4xl text-gray-600" />} title="Caregiver Marketplace" description="Access a network of verified and skilled caregivers for personalized care." />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">What Our Users Say</h3>
          <div className="max-w-4xl mx-auto flex items-center">
            <img src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="User" className="w-32 h-32 rounded-full object-cover mr-8" />
            <div className="text-left">
              <p className="text-xl text-gray-600 italic">"CareMate has given me peace of mind knowing that my mother is well taken care of, even when I can't be there in person. The daily check-ins and easy communication with her caregiver are invaluable."</p>
              <p className="mt-4 font-semibold">- Sarah Johnson, Daughter of CareMate User</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Experience Better Care?</h3>
          <p className="text-xl mb-8">Join CareMate today and discover a new level of support for your loved ones.</p>
          <button className="bg-white text-gray-800 py-2 px-6 rounded-full text-lg hover:bg-gray-200 transition duration-300">Sign Up Now</button>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Care in Action</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <img src="https://images.unsplash.com/photo-1574279606130-09958dc756f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Care 1" className="w-full h-64 object-cover rounded-lg shadow-md" />
            <img src="https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80" alt="Care 2" className="w-full h-64 object-cover rounded-lg shadow-md" />
            <img src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Care 3" className="w-full h-64 object-cover rounded-lg shadow-md" />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg text-center hover:shadow-lg transition duration-300">
      <div className="mb-4">{icon}</div>
      <h4 className="text-xl font-bold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;