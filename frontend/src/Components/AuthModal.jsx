// components/AuthModal.jsx
const client_id = '816584322810-trqogmgnpdabc5ctevfr0mtjj3ps5odc.apps.googleusercontent.com';
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { loginUser, registerUser } from "../services/AuthService";
import { FaTimes, FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { FaGithub } from "react-icons/fa";
import { config } from "../config";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ toggleForm }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const handleGoogleLogin = () => {
    const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${encodeURIComponent(config.googleClientId)}&` +
      `redirect_uri=${encodeURIComponent(config.googleRedirectUri)}&` +
      `response_type=code&` +
      `scope=openid%20email%20profile&` +
      `access_type=offline&` +
      `prompt=consent&` +
      `state=google`;
    
    console.log('Redirecting to Google OAuth:', {
      clientId: config.googleClientId,
      redirectUri: config.googleRedirectUri
    });
    
    window.location.href = googleAuthURL;
  };

  const handleGithubLogin = () => {
    const githubAuthURL = `https://github.com/login/oauth/authorize?` +
      `client_id=${config.githubClientId}&` +
      `redirect_uri=${encodeURIComponent(config.githubRedirectUri)}&` +
      `scope=user:email&` +
      `allow_signup=true&` +
      `state=github`;
    window.location.href = githubAuthURL;
  };

  const switchForm = () => {
    setIsLogin(!isLogin);
    setError(null);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      let response;
      if (isLogin) {
        response = await loginUser(email, password);
        toast.success("Login successful!");
      } else {
        response = await registerUser(name, email, password);
        toast.success("Registration successful!");
      }
      
      setIsAuthenticated(true);
      if (response.user) {
        setUser(response.user);
      }
      toggleForm(); // close modal on success
    } catch (err) {
      setError(err.message || "Failed to authenticate");
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toggleForm(); // Close the auth modal
    navigate('/forgot-password'); // Navigate to forgot password page
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-white/10 backdrop-blur-md z-40"
        onClick={toggleForm}
      />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 z-50">
        <button
          onClick={toggleForm}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
        >
          <FaTimes size={20} />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h2>

          {error && (
            <div className="mb-4 text-red-600 text-center font-semibold">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  required
                  disabled={loading}
                />
              </div>
            )}

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
                disabled={loading}
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
                disabled={loading}
              />
            </div>

            {!isLogin && (
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  required
                  disabled={loading}
                />
              </div>
            )}

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-800"
              } transition-colors`}
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-white text-black py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors mt-2"
              disabled={loading}
              onClick={handleGoogleLogin}
            >
              <FaGoogle /> Continue with Google
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-white text-black py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors mt-2"
              disabled={loading}
              onClick={handleGithubLogin}
            >
              <FaGithub /> Continue with Github
            </button>

            <div className="text-center mt-4">
              <p className="text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={switchForm}
                  className="font-medium underline"
                  disabled={loading}
                >
                  {isLogin ? "Create one" : "Sign in"}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
