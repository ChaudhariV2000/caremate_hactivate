import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HistoryIcon from "@mui/icons-material/History";
import MenuIcon from "@mui/icons-material/Menu";
import "./navbar.css"; // Make sure to update your CSS file

function Navbar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="Navbar">
      <div className="logo">Logo</div>
      <div className="middle-links">
        <ul className={`NavList ${isOpen ? "open" : "closed"}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <HomeIcon />
              <span>Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/room" className="nav-link">
              <CalendarMonthIcon />
              <span>Instant Meeting</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/schedule" className="nav-link">
              <CalendarMonthIcon />
              <span>Schedule</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/saved" className="nav-link">
              <HistoryIcon />
              <span>Saved Recordings</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="right-links">
        <ul className="NavList">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              <span>Login</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              <span>Register</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="toggle-button" onClick={toggleNavbar}>
        <MenuIcon />
      </div>
    </div>
  );
}

export default Navbar;
