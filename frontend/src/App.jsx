import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './Pages/Home';
import SearchBar from './Components/Core/SearchBar';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchBar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;