import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import './Login.css';
import gifImage from '../../video/Nasaastronaut.gif';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use env variable if set, otherwise detect environment
      const getApiUrl = () => {
        if (process.env.REACT_APP_API_URL) {
          return process.env.REACT_APP_API_URL;
        }
        // Check if running in production (Vercel)
        if (
          window.location.hostname !== 'localhost' &&
          window.location.hostname !== '127.0.0.1'
        ) {
          return 'https://nasa-apodapi-webapp-lyart.vercel.app';
        }
        return 'http://localhost:8080';
      };
      const url = getApiUrl();
      const { data: res } = await axios.post(`${url}/api/auth`, data);
      localStorage.setItem('token', res.data);
      window.location = '/main';
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="background-container">
      <div className="content-container">
        <div className="image-description">
          <img src={gifImage} alt="Animated GIF" className="gif-image" />
          <p className="description">
            <a href="https://api.nasa.gov/">
              NASA Astronomy Picture of the Day API (APOD)
            </a>{' '}
            showcases captivating images of the universe. Each day, a new
            photograph or video is featured, capturing astronomical wonders such
            as galaxies, nebulas, and planets. With informative descriptions,
            APOD offers a daily dose of cosmic exploration, inspiring awe and
            fostering a deeper appreciation for the vastness of space.
          </p>
        </div>
        <div className="login-section">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="login-heading">Login to Your Account</h1>

            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="login-form-email"
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="login-form-password"
            />
            {error && <div className="login-form-password-error">{error}</div>}
            <button className="login-form-submit-button" type="submit">
              Login
            </button>
          </form>

          <Link className="form-submit-signup" to="/signup">
            <h4 className="login-to-signup">Don't have an account? Sign Up!</h4>
          </Link>
          <p className="or">OR</p>
          <div className="google-auth-container">
            <GoogleAuth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
