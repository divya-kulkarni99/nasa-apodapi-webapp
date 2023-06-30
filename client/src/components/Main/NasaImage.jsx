import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import './NasaImage.css';


const NASA_APOD_API_KEY = '12iL8nxkoBafRhI7RDtlw2NuDdRGPacpoAj5Ida9';
const NasaImage = () => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImageData = async () => {
      const today = moment().format('YYYY-MM-DD');

      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_APOD_API_KEY}&date=${today}`;
      
      try {
        const response = await axios.get(url);
        setImageData(response.data);
        console.log(response.data);
      } catch (error) {
        
        console.error('Error fetching NASA APOD data:', error);
      }
    };

    fetchImageData();
  }, []);

  if (!imageData) {
    return <div><h1>Image not found</h1></div>;
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


