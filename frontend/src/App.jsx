import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NewsListPage from './pages/NewsListPage';
import PreferencesPage from './pages/PreferencesPage';
import BookmarksPage from './pages/BookmarksPage';
import TrendingPage from './pages/TrendingPage';
import { getToken } from './api';

export default function App() {
  const isLoggedIn = !!getToken();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/trending" element={isLoggedIn ? <TrendingPage /> : <Navigate to="/login" />} />
        <Route path="/news" element={isLoggedIn ? <NewsListPage /> : <Navigate to="/login" />} />
        <Route path="/preferences" element={isLoggedIn ? <PreferencesPage /> : <Navigate to="/login" />} />
        <Route path="/bookmarks" element={isLoggedIn ? <BookmarksPage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isLoggedIn ? '/news' : '/login'} />} />
      </Routes>
    </Router>
  );
}
