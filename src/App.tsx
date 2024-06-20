
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/SIdeBar';
import CmsPages from './pages/CmsPages';
import Home from './pages/Home';

function App() {
  return (
    <Router>
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signature" element={<CmsPages />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
