import React, { useState } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';

export default function Topbar({ onSearch, searchValue, setSearchValue }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchValue);
  };

  return (
    <header className="w-full bg-white shadow flex flex-col sm:flex-row items-center px-4 sm:px-8 py-2 sm:py-3 sticky top-0 z-10">
      <div className="text-xl sm:text-2xl font-bold text-blue-600 mr-0 sm:mr-8 mb-2 sm:mb-0">NewsHub</div>
      <form onSubmit={handleSubmit} className="flex-1 flex items-center max-w-full sm:max-w-xl mx-auto w-full mb-2 sm:mb-0">
        <input
          type="text"
          className="flex-1 border rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Search news..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded-r hover:bg-blue-700 transition flex items-center text-sm">
          <FaSearch className="w-4 h-4" />
        </button>
      </form>
      <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
        <FaUserCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
      </div>
    </header>
  );
} 