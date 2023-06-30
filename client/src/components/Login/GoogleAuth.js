import { useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";


function GoogleAuth() {
    

  const navigate = useNavigate();
  function handleCallbackResponse(response) {
    console.log("Encoded JWT" + response.credential);
    var userObject = jwt_decode(response.credential);

    if (userObject) {
        navigate("/main");
      }
      
  }

  useEffect(() => {
    if (typeof google !== "undefined" && google.accounts && google.accounts.id) {
        /*global google*/
      google.accounts.id.initialize({
        client_id: '358187542223-qgouv75ntq2p6p9i610hq1cdmpnh34jf.apps.googleusercontent.com',
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
