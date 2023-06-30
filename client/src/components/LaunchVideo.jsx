import React, { useEffect } from 'react';
import videoFile from '../video/nasa.mp4';
import './LaunchVideo.css';

const LaunchVideo = () => {
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
  });

  const handleVideoEnd = () => {
    window.location.href = '/login'; 
  };

  return (
    <div className="launch-video-container">
      <video id="launch-video" autoPlay muted className="launch-video-element">
        <source src={videoFile} type="video/mp4" />
       
      </video>
    </div>
  );
};

export default LaunchVideo;

