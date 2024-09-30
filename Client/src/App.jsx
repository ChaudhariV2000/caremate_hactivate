import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./Pages/Home";
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
          <Route path="/Video" element = {<Video/>}/>
          <Route path="/room/:roomId" element = {<Room />}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
