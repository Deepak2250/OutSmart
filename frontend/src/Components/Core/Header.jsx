import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import AuthModal from "./AuthModal";

const Header = () => {
  const [showForm, setShowForm] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleForm = () => setShowForm(!showForm);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-3xl font-extrabold text-black font-['Shadows Into Light']">
            TripBuddy
          </h1>

          {isAuthenticated ? (
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/profile')}
                className="bg-black text-white px-4 py-2 rounded-full font-bold hover:bg-gray-800 transition-colors"
              >
                Profile
              </button>
              <button
                onClick={logout}
                className="bg-gray-600 text-white px-4 py-2 rounded-full font-bold hover:bg-gray-800 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={toggleForm}
              className="bg-black text-white px-4 py-2 rounded-full font-bold hover:bg-gray-800 transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {showForm && <AuthModal showForm={showForm} toggleForm={toggleForm} />}
    </>
  );
};

export default Header;