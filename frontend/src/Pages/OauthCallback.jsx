import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../utils/Auth";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    const fetchJWT = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/auth/google/callback?code=${code}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to authenticate');
        }

        const data = await response.json();
        const token = data.token || response.headers.get("Authorization")?.replace("Bearer ", "");

        if (token) {
          saveToken(token);
          navigate("/", { state: { message: "Login successful" } });
        } else {
          throw new Error('No token received');
        }
      } catch (err) {
        console.error("OAuth error:", err);
        navigate("/oauth-error", { state: { error: "Google login failed" } });
      }
    };

    if (code) fetchJWT();
    else navigate("/oauth-error", { state: { error: "No authorization code provided" } });
  }, [navigate]);

  return <p>Completing login with Google...</p>;
};

export default OAuthCallback;