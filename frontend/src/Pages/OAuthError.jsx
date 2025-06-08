import { Link, useLocation } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const OAuthError = () => {
  const location = useLocation();
  const { error, details, provider } = location.state || {};
  const providerName = provider ? provider.charAt(0).toUpperCase() + provider.slice(1) : 'OAuth';

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="border border-black rounded-xl p-8 max-w-md w-full text-center shadow-lg">
        <div className="mb-4 flex justify-center text-black">
          <FaExclamationTriangle size={48} />
        </div>
        <h1 className="text-3xl font-bold mb-2">Authentication Failed</h1>
        <p className="text-gray-700 mb-4">
          {error || `We couldn't log you in with ${providerName}. Please try again or use a different method.`}
        </p>
        {details && (
          <p className="text-sm text-gray-500 mb-6 p-4 bg-gray-50 rounded-lg">
            Error details: {details}
          </p>
        )}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block w-full px-6 py-2 border border-black text-black font-semibold rounded hover:bg-black hover:text-white transition"
          >
            Return to Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-block w-full px-6 py-2 bg-black text-white font-semibold rounded hover:bg-gray-800 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default OAuthError;
