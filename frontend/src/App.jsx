// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import AddNewsPage from './pages/AddNewsPage';
import NewsListPage from './pages/NewsListPage';
import EditNewsPage from './pages/EditNewsPage'; // ✅ Import Edit Page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/add" element={<AddNewsPage />} />
        <Route path="/news" element={<NewsListPage />} />
        <Route path="/edit/:id" element={<EditNewsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
