// src/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Home.css';

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="home-page">
      <h1>Welcome to MelechConnect!</h1>
      <p>Your platform for connecting with professionals.</p>
      <div className="button-container">
        <button className="home-button" onClick={() => navigate('/login')}>
          Electrician/Mechanic
        </button>
        <br/>
        <button className="home-button" onClick={() => navigate('/user-dashboard')}>
          User
        </button>
      </div>
    </div>
  );
};

export default Home;
