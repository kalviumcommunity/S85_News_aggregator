import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '../api';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken('');
    navigate('/login');
  };

  return (
    <nav className="w-full bg-white shadow flex flex-col sm:flex-row items-center px-4 sm:px-8 py-2 sm:py-3">
      <Link to="/news" className="text-xl sm:text-2xl font-bold text-blue-600 mb-2 sm:mb-0">News Aggregator</Link>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 ml-0 sm:ml-4">
        <Link to="/news" className="text-gray-700 hover:text-blue-600">News</Link>
        <Link to="/trending" className="text-gray-700 hover:text-blue-600">Trending</Link>
        <Link to="/bookmarks" className="text-gray-700 hover:text-blue-600">Bookmarks</Link>
        <Link to="/preferences" className="text-gray-700 hover:text-blue-600">Preferences</Link>
      </div>
    </nav>
  );
} 