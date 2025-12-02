import React from 'react';
import './Main.css';
import NasaImage from './NasaImage';
import Header from '../Header';

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location = '/login';
  };

  return (
    <div className="main-container">
      <Header onLogout={handleLogout} />
      <NasaImage />
    </div>
  );
};

export default Main;
