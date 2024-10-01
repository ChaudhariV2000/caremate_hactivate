import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Menu, X, Home, Bell, Users, MessageCircle, Phone, LogOut } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <nav className="bg-gradient-to-r  from-indigo-500 to-blue-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
           <Link to="/" className="flex items-center text-white text-xl font-bold">
             <img src="/Caremate_icon.png" alt="Caremate Logo" className="h-8 w-8 mr-2" />
             Caremate
           </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink to="/" icon={<Home className="mr-1" size={18} />}>Home</NavLink>
              <NavLink to="/Reminder" icon={<Bell className="mr-1" size={18} />}>Set Reminder</NavLink>
              <NavLink to="/cg" icon={<Users className="mr-1" size={18} />}>Find Caregivers</NavLink>
              <div className="relative">
                <Link to = '/Video' className="flex items-center text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium focus:outline-none transition duration-150 ease-in-out">
                  <MessageCircle className="mr-1" size={18} />
                  Contact
                </Link>
              </div>
              <div className="relative">
                <button onClick={toggleProfile} className="flex items-center text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium focus:outline-none transition duration-150 ease-in-out">
                  <User className="mr-1" size={18} />
                  Profile
                </button>
                {isProfileOpen && (
                  <DropdownMenu>
                    <DropdownItem to="/profile">View Profile</DropdownItem>
                    <DropdownItem to="/">
                      <LogOut className="mr-1" size={18} />
                          Logout
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </div>
              <Link to="/Emergency_page">
                <button className="bg-red-600 text-white text-sm py-2 px-4 rounded-full shadow-lg hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-150 ease-in-out transform hover:scale-105">
                  Emergency
                </button>
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white hover:text-gray-300 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/" icon={<Home size={18} />}>Home</MobileNavLink>
            <MobileNavLink to="/Reminder" icon={<Bell size={18} />}>Set Reminder</MobileNavLink>
            <MobileNavLink to="/cg" icon={<Users size={18} />}>Find Caregivers</MobileNavLink>
            <MobileNavLink to="/" icon={<Phone size={18} />}>Contact Us</MobileNavLink>
            <MobileNavLink to="/profile" icon={<User size={18} />}>Profile</MobileNavLink>
            <MobileNavLink to="/Emergency_page" icon={<User size={18} />}>Emergency</MobileNavLink>
          </div>
        </div>
        )}
    </nav>
    );
};

    const NavLink = ({ to, children, icon }) => (
        <Link to={to} className="flex items-center text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
            {icon}
            {children}
        </Link>
    );

    const MobileNavLink = ({ to, children, icon }) => (
        <Link to={to} className="flex items-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">
            {icon}
            <span className="ml-2">{children}</span>
        </Link>
    );

    const DropdownMenu = ({ children }) => (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            {children}
        </div>
    );

    const DropdownItem = ({ to, children }) => (
        <Link to={to} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            {children}
        </Link>
    );

export default Navbar;