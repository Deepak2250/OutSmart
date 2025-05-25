import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Pages/Home";
import SearchBar from "./Components/Core/SearchBar";
import OAuthCallback from "./Pages/OauthCallback";
import OAuthError from "./Pages/OAuthError";
import Profile from "./Pages/Profile";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="google/callback" element={<OAuthCallback />} />
        <Route path="/oauth-error" element={<OAuthError />} />
        <Route path="/profile" element = {<Profile/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
