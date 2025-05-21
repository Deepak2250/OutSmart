// components/AuthModal.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { loginUser , registerUser } from "../../services/AuthService";
import { FaTimes, FaGoogle } from "react-icons/fa";

const AuthModal = ({ toggleForm }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setIsAuthenticated } = useContext(AuthContext);

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
      if (isLogin) {
        await loginUser(email, password);
      } else {
        await registerUser(name, email, password);
      }
      setIsAuthenticated(true);
      toggleForm(); // close modal on success
    } catch (err) {
      setError(err.message || "Failed to authenticate");
    } finally {
      setLoading(false);
    }
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
            {isLogin ? "Login" : "Register"}
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

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-800"
              } transition-colors`}
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-white text-black py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors mt-2"
              disabled={loading}
              onClick={() => alert("Google OAuth not implemented")}
            >
              <FaGoogle /> Continue with Google
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
                  {isLogin ? "Register" : "Login"}
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
