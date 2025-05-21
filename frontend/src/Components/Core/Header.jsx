import { useState } from "react";
import { FaTimes, FaGoogle } from "react-icons/fa";

const AuthModal = ({ showForm, toggleForm }) => {
  const [isLogin, setIsLogin] = useState(true);

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Changed to backdrop blur with reduced opacity */}
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

          <form className="space-y-4">
            {!isLogin && (
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            )}
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            {!isLogin && (
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              {isLogin ? "Login" : "Register"}
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-white text-black py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <FaGoogle /> Continue with Google
            </button>

            <div className="text-center mt-4">
              <p className="text-sm">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={switchForm}
                  className="font-medium underline"
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

const Header = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-3xl font-extrabold text-black font-['Shadows Into Light']">
            TripBuddy
          </h1>

          <button
            onClick={toggleForm}
            className="bg-black text-white px-4 py-2 md:px-6 md:py-2 rounded-full font-bold hover:bg-gray-800 transition-colors"
          >
            Login
          </button>
        </div>
      </header>

      {showForm && <AuthModal showForm={showForm} toggleForm={toggleForm} />}
    </>
  );
};

export default Header;
