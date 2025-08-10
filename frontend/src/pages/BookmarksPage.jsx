import React, { useEffect, useState } from 'react';
import { getBookmarks, removeBookmark } from '../api';
import Sidebar from '../components/Sidebar';
import { FaBookmark } from 'react-icons/fa';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    async function fetchBookmarks() {
      setLoading(true);
      setError('');
      const res = await getBookmarks();
      if (res.bookmarks) {
        setBookmarks(res.bookmarks);
      } else {
        setError(res.message || 'Failed to fetch bookmarks');
      }
      setLoading(false);
    }
    fetchBookmarks();
  }, []);

  const handleRemove = async (url) => {
    const res = await removeBookmark(url);
    if (res.bookmarks) {
      setBookmarks(res.bookmarks);
      setMsg('Removed from bookmarks');
    }
    setTimeout(() => setMsg(''), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 md:ml-64 min-h-screen flex flex-col">
        <main className="flex-1 p-2 sm:p-4 md:p-8 overflow-y-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Bookmarked News</h1>
          {msg && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded shadow z-50">
              {msg}
            </div>
          )}
          {loading && <div className="text-center">Loading...</div>}
          {error && <div className="text-center text-red-500 mb-4">{error}</div>}
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {bookmarks.map((article, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow flex flex-col overflow-hidden relative"
              >
                <button
                  className="absolute top-3 right-3 text-blue-600 hover:text-blue-800 text-xl z-10"
                  onClick={() => handleRemove(article.url)}
                  title="Remove Bookmark"
                >
                  <FaBookmark />
                </button>
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                    onError={e => { e.target.onerror = null; e.target.src = '/fallback.jpg'; }}
                  />
                )}
                <div className="p-4 flex flex-col flex-1">
                  <h2 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h2>
                  <p className="text-gray-600 mb-4 flex-1 line-clamp-3">{article.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-400">{article.source?.name}</span>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm font-medium transition"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!loading && bookmarks.length === 0 && !error && (
            <div className="text-center text-gray-500 mt-8">No bookmarks yet.</div>
          )}
        </main>
      </div>
    </div>
  );
} 