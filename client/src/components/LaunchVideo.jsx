import React, { useEffect } from 'react';
import videoFile from '../video/nasa.mp4';
import './LaunchVideo.css';

const LaunchVideo = () => {
  const handleVideoEnd = () => {
    window.location.href = '/login'; 
  };

  useEffect(() => {
    const videoElement = document.getElementById('launch-video');
    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnd);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, []); // Empty dependency array is correct here

  return (
    <div className="launch-video-container">
      <video id="launch-video" autoPlay muted className="launch-video-element">
        <source src={videoFile} type="video/mp4" />
      </video>
    </div>
  );
};

export default LaunchVideo;
