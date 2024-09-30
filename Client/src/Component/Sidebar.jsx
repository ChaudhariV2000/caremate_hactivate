import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HistoryIcon from "@mui/icons-material/History";
import MenuIcon from "@mui/icons-material/Menu";
import "./sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); // State to manage sidebar visibility

  const toggleSidebar = () => {
    console.log("Toggling sidebar");
    setIsOpen(!isOpen);
  };

  return (
    <div className={`Sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <MenuIcon /> : <MenuIcon />}
      </div>
      <ul className="SideLst">
        <li className="row">
          <Link to="/" className="Link">
            <div id="icon">
              <HomeIcon />
            </div>
            <div id="title">Home</div>
          </Link>
        </li>
        <li className="row">
          <Link to="/meet" className="Link">
            <div id="icon">
              <CalendarMonthIcon />
            </div>
            <div id="title">Instant Meeting</div>
          </Link>
        </li>
        <li className="row">
          <Link to="/schedule" className="Link">
            <div id="icon">
              <CalendarMonthIcon />
            </div>
            <div id="title">Schedule</div>
          </Link>
        </li>
        <li className="row">
          <Link to="/saved" className="Link">
            <div id="icon">
              <HistoryIcon />
            </div>
            <div id="title">Saved Recordings</div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
