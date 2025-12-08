import React from 'react';
import './Main.css';
import NasaImage from './NasaImage';
import Header from '../Header';

const Main = () => {
  const handleLogout = () => {
    // Sign out from Google if the user logged in with Google OAuth
    if (window.google && window.google.accounts && window.google.accounts.id) {
      try {
        // Disable auto-select to prevent automatic re-login
        window.google.accounts.id.disableAutoSelect();
        console.log('Google auto-select disabled');
      } catch (error) {
        console.error('Error disabling Google auto-select:', error);
      }
    }
    
    // Clear all authentication data from localStorage
    localStorage.removeItem('token');
    
    // Clear any other stored user data if exists
    localStorage.removeItem('user');
    
    // Redirect to login page
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
