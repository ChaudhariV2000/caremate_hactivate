import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./Pages/Home";
import CG_page from "./Pages/Cargivers.jsx";
import CaregiverCard from './Component/CaregiverCard';
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Video from "./Pages/video";
import Room from "./Pages/Room";


function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element = {<Home />}/>
          <Route path="/cg" element = {<CG_page />}/>
          <Route path="/Video" element = {<Video/>}/>
          <Route path="/room/:roomId" element = {<Room />}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
