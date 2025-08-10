import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaFire, FaBookmark, FaSlidersH, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { setToken, getToken } from '../api';

function parseJwt(token) {
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = getToken();
  const payload = parseJwt(token);
  const user = {
    name: payload?.name || (payload?.email ? payload.email.split('@')[0] : 'User'),
    email: payload?.email || 'user@email.com',
    avatar: '', // You can use a static image or initials
  };

  const handleLogout = () => {
    setToken('');
    navigate('/login');
  };

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 bg-white p-2 rounded shadow"
        onClick={() => setOpen(o => !o)}
        aria-label="Open sidebar"
      >
        <span className="block w-6 h-0.5 bg-blue-600 mb-1"></span>
        <span className="block w-6 h-0.5 bg-blue-600 mb-1"></span>
        <span className="block w-6 h-0.5 bg-blue-600"></span>
      </button>
      {/* Sidebar: hidden on mobile, visible on md+ or when open on mobile */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow flex flex-col justify-between z-20 transition-transform duration-300 md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'} md:block`}
      >
        <div>
          <div className="px-6 py-6 text-2xl font-bold text-blue-600">News Aggregator</div>
          <nav className="flex flex-col gap-2 px-2">
            <NavLink to="/news" className={({isActive}) => `flex items-center gap-3 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}` }>
              <FaHome /> News Feed
            </NavLink>
            <NavLink to="/trending" className={({isActive}) => `flex items-center gap-3 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}` }>
              <FaFire /> Trending
            </NavLink>
            <NavLink to="/bookmarks" className={({isActive}) => `flex items-center gap-3 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}` }>
              <FaBookmark /> Bookmarks
            </NavLink>
            <NavLink to="/preferences" className={({isActive}) => `flex items-center gap-3 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}` }>
              <FaSlidersH /> Preferences
            </NavLink>
          </nav>
        </div>
        <div className="px-6 py-6 border-t flex flex-col gap-3 items-start">
          <div className="flex items-center gap-3">
            {user.avatar ? (
              <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
            ) : (
              <FaUserCircle className="w-10 h-10 text-gray-400" />
            )}
            <div>
              <div className="font-semibold text-gray-800">{user.name}</div>
              <div className="text-xs text-gray-500">{user.email}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-3 flex items-center gap-2 text-red-600 hover:text-red-800 font-medium px-2 py-1 rounded transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>
    </>
  );
} 