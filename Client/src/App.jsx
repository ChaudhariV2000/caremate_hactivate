import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "./Pages/Home";
// import Schedule from "./pages/Schedule";
// import Saved from "./pages/Saved";
// import "./App.css";
// import Room from "./pages/Room";
// import Meeting from "./pages/Meeting";
// import Register from "./pages/Register";
// import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

      </Routes>
    </Router>
  );
}

export default App;
