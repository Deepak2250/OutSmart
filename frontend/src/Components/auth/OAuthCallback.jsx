import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { saveToken } from "../../utils/Auth";
import { getApiUrl, API_ENDPOINTS, DEFAULT_HEADERS } from '../../config';
import { toast } from "sonner";
import { useAuth } from "../../context/AuthProvider";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuthenticated, fetchUserProfile } = useAuth();
  const processedRef = useRef(false);

  useEffect(() => {
    const processOAuth = async () => {
      // Prevent double processing
      if (processedRef.current) return;
      
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const error = params.get("error");

      // If no code and no error, just wait - might be first mount
      if (!code && !error) return;

      processedRef.current = true;

      // Detect provider from path
      const path = location.pathname;
      let provider;
      if (path.includes('github')) {
        provider = 'github';
      } else if (path.includes('google')) {
        provider = 'google';
      }

      // Validate provider
      if (!provider) {
        console.error('Unknown OAuth provider');
        navigate("/oauth-error", { 
          state: { 
            error: "Unknown OAuth Provider",
            details: "Could not determine the authentication provider from the callback URL."
          } 
        });
        return;
      }

      // Handle OAuth errors from provider
      if (error) {
        console.error('OAuth error from provider:', error);
        navigate("/oauth-error", {
          state: {
            error: `${provider} authentication error`,
            details: error
          }
        });
        return;
      }

      try {
        console.log(`Attempting to exchange code for token with provider: ${provider}...`);

        // Choose backend API endpoint based on provider
        const apiEndpoint = provider === 'github'
          ? API_ENDPOINTS.auth.githubCallback
          : API_ENDPOINTS.auth.googleCallback;

        const response = await fetch(
          getApiUrl(apiEndpoint) + `?code=${encodeURIComponent(code)}`,
          {
            headers: DEFAULT_HEADERS
          }
        );

        if (!response.ok) {
          let errorDetail;
          try {
            const errorData = await response.json();
            errorDetail = errorData.message || errorData.error || response.statusText;
            console.error('Error response from server:', errorData);
          } catch (e) {
            errorDetail = response.statusText;
            console.error('Failed to parse error response:', e);
          }

          throw new Error(`Failed to authenticate: ${errorDetail}`);
        }

        const data = await response.json();
        console.log('Received response from server:', { 
          hasToken: !!data.token, 
          hasAuthHeader: !!response.headers.get("Authorization"),
          provider: provider
        });

        const token = data.token || response.headers.get("Authorization")?.replace("Bearer ", "");

        if (token) {
          saveToken(token);
          await fetchUserProfile(token);
          setIsAuthenticated(true);
          toast.success(`Successfully logged in with ${provider}!`);
          navigate("/", { state: { message: `Login successful with ${provider}` } });
        } else {
          console.error('No token in response:', { 
            data, 
            headers: Object.fromEntries(response.headers.entries()),
            provider: provider 
          });
          throw new Error('No token received from server');
        }
      } catch (err) {
        console.error("OAuth error:", err);
        toast.error(err.message || `Failed to complete ${provider} login`);
        navigate("/oauth-error", {
          state: {
            error: `${provider} login failed`,
            details: err.message,
            provider: provider
          }
        });
      }
    };

    processOAuth();
  }, [navigate, setIsAuthenticated, fetchUserProfile, location]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500 mb-4"></div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Almost there!</h2>
      <p className="text-gray-600">Completing your login...</p>
    </div>
  );
};

export default OAuthCallback; 