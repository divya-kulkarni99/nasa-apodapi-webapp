import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { API_BASE_URL } from '../../api/config';
import './NasaImage.css';

const NasaImage = () => {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageData = async () => {
      const today = moment().format('YYYY-MM-DD');
      const url = `${API_BASE_URL}/api/apod?date=${today}`;
      try {
        const response = await axios.get(url);
        setImageData(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching NASA APOD data:', error);
        setError('Failed to load NASA image. Please try again later.');
        setLoading(false);
      }
    };

    fetchImageData();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h1>Loading NASA Astronomy Picture of the Day...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!imageData) {
    return (
      <div className="container">
        <h1>Image not found</h1>
      </div>
    );
  }

  const formattedDate = moment(imageData.date).format('DD MMMM YYYY');

  return (
    <div className="container">
      <div className="image-container">
        <div className="image">
          <img src={imageData.url} alt={imageData.title} />
        </div>
        <div className="description">
          <h2>{imageData.title}</h2>
          <h3>{formattedDate}</h3>
          <p>{imageData.explanation}</p>
        </div>
      </div>
    </div>
  );
};

export default NasaImage;
