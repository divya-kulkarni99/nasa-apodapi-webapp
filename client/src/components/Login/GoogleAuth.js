import { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function GoogleAuth() {
    

  const navigate = useNavigate();
  
  async function handleCallbackResponse(response) {
    console.log("Encoded JWT: " + response.credential);
    
    try {
      // Send the credential to our backend for verification
      const url = "https://nasa-apodapi-webapp-lyart.vercel.app/api/auth/google";
      const { data: res } = await axios.post(url, { credential: response.credential });
      
      // Store the token from our backend
      localStorage.setItem("token", res.data);
      
      // Navigate to main page
      navigate("/main");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Failed to sign in with Google. Please try again.");
    }
  }

  useEffect(() => {
    if (typeof google !== "undefined" && google.accounts && google.accounts.id) {
        /*global google*/
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCallbackResponse,
      });

      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
      });
    } else {
      console.error("Google API client not available.");
    }
  }, );

  return (
<div>
  <div 
  id="signInDiv">
  </div>
   </div>);
}

export default GoogleAuth;
