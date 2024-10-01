import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Menu, X, Home, Bell, Users, MessageCircle, Phone, LogOut, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-purple-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-white text-2xl font-bold">
              <img src="Caremate_icon.png" alt="Caremate Logo" className="h-10 w-10 mr-3" />
              Caremate
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <NavLink to="/" icon={<Home className="mr-2" size={20} />}>Home</NavLink>
              <NavLink to="/Reminder" icon={<Bell className="mr-2" size={20} />}>Reminders</NavLink>
              <NavLink to="/cg" icon={<Users className="mr-2" size={20} />}>Caregivers</NavLink>
              <NavLink to="/Video" icon={<MessageCircle className="mr-2" size={20} />}>Contact</NavLink>
              <div className="relative">
                <button onClick={toggleProfile} className="flex items-center text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-md text-lg font-medium focus:outline-none transition duration-150 ease-in-out">
                  <User className="mr-2" size={20} />
                  Profile
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <DropdownMenu>
                      <DropdownItem to="/profile" icon={<Settings size={18} />}>View Profile</DropdownItem>
                      <DropdownItem to="/" icon={<LogOut size={18} />}>Logout</DropdownItem>
                    </DropdownMenu>
                  )}
                </AnimatePresence>
              </div>
              <Link to="/Emergency_page">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 text-white text-lg py-2 px-6 rounded-full shadow-lg hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-150 ease-in-out"
                >
                  Emergency
                </motion.button>
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white hover:text-gray-300 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-indigo-800 shadow-lg rounded-b-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavLink to="/" icon={<Home size={20} />}>Home</MobileNavLink>
              <MobileNavLink to="/Reminder" icon={<Bell size={20} />}>Reminders</MobileNavLink>
              <MobileNavLink to="/cg" icon={<Users size={20} />}>Find Caregivers</MobileNavLink>
              <MobileNavLink to="/Video" icon={<MessageCircle size={20} />}>Contact Us</MobileNavLink>
              <MobileNavLink to="/profile" icon={<User size={20} />}>Profile</MobileNavLink>
              <Link to="/Emergency_page" className="block w-full">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-red-600 text-white text-lg py-2 px-4 rounded-md shadow-md hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-150 ease-in-out mt-2"
                >
                  Emergency
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink = ({ to, children, icon }) => (
  <Link to={to} className="flex items-center text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-md text-lg font-medium transition duration-150 ease-in-out">
    {icon}
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, icon }) => (
  <Link to={to} className="flex items-center text-white hover:bg-indigo-700 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-medium">
    {icon}
    <span className="ml-2">{children}</span>
  </Link>
);

const DropdownMenu = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="absolute right-0 mt-2 w-48 bg-indigo-800 rounded-md shadow-lg py-1 z-10"
  >
    {children}
  </motion.div>
);

const DropdownItem = ({ to, children, icon }) => (
  <Link to={to} className="flex items-center px-4 py-2 text-lg text-white hover:bg-indigo-700">
    {icon}
    <span className="ml-2">{children}</span>
  </Link>
);

export default Navbar;