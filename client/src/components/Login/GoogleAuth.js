import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/config";

function GoogleAuth() {
  const navigate = useNavigate();
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [error, setError] = useState(null);

  const handleCallbackResponse = useCallback(
    async (response) => {
      console.log("Google Sign-In Response received");

      try {
        const { data: res } = await axios.post(
          `${API_BASE_URL}/api/auth/google`,
          { credential: response.credential },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        localStorage.setItem("token", res.data);
        navigate("/main");
      } catch (err) {
        console.error("Google Sign-In Error:", err);

        if (err.response) {
          setError(err.response.data.message || "Failed to sign in with Google");
        } else if (err.request) {
          setError(
            "Cannot connect to server. Please ensure the backend is running and reachable."
          );
        } else {
          setError("Failed to sign in with Google. Please try again.");
        }
      }
    },
    [navigate]
  );

  useEffect(() => {
    const initializeGoogle = () => {
      if (
        window.google &&
        window.google.accounts &&
        window.google.accounts.id
      ) {
        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

        if (!clientId) {
          console.error("Missing REACT_APP_GOOGLE_CLIENT_ID");
          setError("Google Sign-In is not configured.");
          return;
        }

        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCallbackResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
            context: "signin",
          });

          const btn = document.getElementById("signInDiv");
          if (btn) {
            window.google.accounts.id.renderButton(btn, {
              theme: "outline",
              size: "large",
              text: "signin_with",
            });
          }

          setIsGoogleLoaded(true);
        } catch (e) {
          console.error("Google Initialize Error:", e);
          setError("Failed to initialize Google Sign-In.");
        }
      } else {
        setTimeout(initializeGoogle, 100);
      }
    };

    initializeGoogle();
  }, [handleCallbackResponse]);

  return (
    <div>
      <div id="signInDiv"></div>

      {!isGoogleLoaded && !error && (
        <div style={{ color: "#666", fontSize: "14px" }}>
          Loading Google Sign-In...
        </div>
      )}

      {error && (
        <div style={{ color: "#d32f2f", fontSize: "14px", marginTop: "10px" }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default GoogleAuth;
