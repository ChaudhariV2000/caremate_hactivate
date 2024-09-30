import Navbar from "../Component/Navbar";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';


const Home = () => {
  // const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      <ul>
        <li>{data}</li>



      </ul>
    </>
  );
};

export default Home;
