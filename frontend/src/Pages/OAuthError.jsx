import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const OAuthError = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="border border-black rounded-xl p-8 max-w-md w-full text-center shadow-lg">
        <div className="mb-4 flex justify-center text-black">
          <FaExclamationTriangle size={48} />
        </div>
        <h1 className="text-3xl font-bold mb-2">Authentication Failed</h1>
        <p className="text-gray-700 mb-6">
          We couldn't log you in with Google. Please try again or use a different method.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 px-6 py-2 border border-black text-black font-semibold rounded hover:bg-black hover:text-white transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default OAuthError;
