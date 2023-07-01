import React from 'react';
import './Main.css';
import NasaImage from './NasaImage';

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location = '/login';
  };

  return (
    <div className="main-container">
      <nav className="navbar">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <NasaImage />
    </div>
  );
};

export default Main;
