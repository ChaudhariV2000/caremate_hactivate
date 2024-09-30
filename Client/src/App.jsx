import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Helmet } from 'react-helmet';
import Home from "./Pages/Home";
import CG_page from "./Pages/Cargivers.jsx";
import CaregiverRegForm from "./Pages/CaregiverRegForm.jsx"
import CaregiverSearchForm from "./Pages/CaregiverSearchForm.jsx";
import AuthModal from "./Pages/Signup_login.jsx"
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Video from "./Pages/video";
import Room from "./Pages/Room";
import Profile from "./Pages/Profile.jsx";
import Emergency_page from "./Pages/Emergency_page";
import Reminder_form from "./Pages/Reminder_form.jsx";
import RemindersList from './Pages/reminder_list.jsx';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const toggleChatbot = () => setIsChatbotOpen(!isChatbotOpen);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/cg_reg') {
      window.scrollTo(0, 0);
    }
  }, []);

  return (



    <Router>
      <Helmet>
        <title>Caremate</title>
        <link rel="icon" type="image/png" href="./Caremate_icon.png" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar openAuthModal={openAuthModal} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Video" element={<Video />} />
            <Route path="/room/:roomId" element={<Room />} />
            <Route path="/cg" element={<CaregiverSearchForm />} />
            <Route path="/caregivers" element={<CG_page />} />
            <Route path="/cg_reg" element={<CaregiverRegForm />} />
            <Route path="/Signup" element={<AuthModal />} />
            <Route path="/Emergency_page" element={<Emergency_page />} />
            <Route path="/Reminder" element={<Reminder_form />} />
            <Route path="/reminders" element={<RemindersList />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
        <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
      </div>
    </Router>
  );
}

export default App;