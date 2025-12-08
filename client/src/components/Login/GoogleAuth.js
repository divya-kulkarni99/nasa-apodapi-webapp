import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GoogleAuth() {
  const navigate = useNavigate();
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [error, setError] = useState(null);

  const handleCallbackResponse = useCallback(
    async (response) => {
      console.log('Google Sign-In Response received');

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

        console.log('Sending credential to backend:', url);

        // Send the credential to our backend for verification
        const { data: res } = await axios.post(
          `${url}/api/auth/google`,
          {
            credential: response.credential,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );

        // Store the token from our backend
        localStorage.setItem('token', res.data);

        // Navigate to main page
        navigate('/main');
      } catch (error) {
        console.error('Google Sign-In Error:', error);
        if (error.response) {
          console.error('Error response:', error.response.data);
          setError(
            error.response.data.message || 'Failed to sign in with Google'
          );
        } else if (error.request) {
          console.error('No response received:', error.request);
          setError(
            'Cannot connect to server. Please make sure the backend is running on port 8080.'
          );
        } else {
          console.error('Error setting up request:', error.message);
          setError('Failed to sign in with Google. Please try again.');
        }
      }
    },
    [navigate]
  );

  useEffect(() => {
    // Wait for Google API to load
    const checkGoogleAPI = () => {
      if (
        typeof window.google !== 'undefined' &&
        window.google.accounts &&
        window.google.accounts.id
      ) {
        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

        if (!clientId) {
          console.error(
            'REACT_APP_GOOGLE_CLIENT_ID is not set in environment variables'
          );
          setError('Google Sign-In is not configured');
          return;
        }

        try {
          // Initialize Google Identity Services
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCallbackResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
            context: 'signin',
          });

          const signInDiv = document.getElementById('signInDiv');
          if (signInDiv) {
            // Render the button
            window.google.accounts.id.renderButton(signInDiv, {
              theme: 'outline',
              size: 'large',
              type: 'standard',
              text: 'signin_with',
              shape: 'rectangular',
              logo_alignment: 'left',
            });
            setIsGoogleLoaded(true);
          }
        } catch (err) {
          console.error('Error initializing Google Sign-In:', err);
          setError('Failed to initialize Google Sign-In');
        }
      } else {
        // Retry after a short delay if Google API not loaded yet
        setTimeout(checkGoogleAPI, 100);
      }
    };

    // Start checking after component mounts
    checkGoogleAPI();
  }, [handleCallbackResponse]);

  return (
    <div>
      <div id="signInDiv"></div>
      {!isGoogleLoaded && !error && (
        <div style={{ color: '#666', fontSize: '14px' }}>
          Loading Google Sign-In...
        </div>
      )}
      {error && (
        <div style={{ color: '#d32f2f', fontSize: '14px', marginTop: '10px' }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default GoogleAuth;
