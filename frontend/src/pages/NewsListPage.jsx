import React, { useEffect, useState } from 'react';
import { getNews, getToken, getBookmarks, addBookmark, removeBookmark, getTrending } from '../api';
import Sidebar from '../components/Sidebar';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

function parseJwt(token) {
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export default function NewsListPage() {
  const [articles, setArticles] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkMsg, setBookmarkMsg] = useState('');
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchAll(keyword) {
      setLoading(true);
      setError('');
      const [newsRes, bookmarksRes, trendingRes] = await Promise.all([
        getNews(keyword),
        getBookmarks(),
        getTrending(),
      ]);
      if (newsRes.articles) {
        setArticles(newsRes.articles);
        setError('');
      } else {
        setError(newsRes.message || 'Failed to fetch news');
      }
      if (bookmarksRes.bookmarks) {
        setBookmarks(bookmarksRes.bookmarks);
      }
      if (trendingRes.articles) {
        setTrending(trendingRes.articles);
      }
      setLoading(false);
    }
    fetchAll(searchTerm);
    // Parse user info from JWT
    const token = getToken();
    const payload = parseJwt(token);
    if (payload) {
      setUser({ name: payload.name || payload.email?.split('@')[0] || 'User' });
    }
    setPreferences([]);
  }, [searchTerm]);

  const isBookmarked = (article) => bookmarks.some(b => b.url === article.url);

  const handleBookmark = async (article) => {
    if (isBookmarked(article)) {
      const res = await removeBookmark(article.url);
      if (res.bookmarks) {
        setBookmarks(res.bookmarks);
        setBookmarkMsg('Removed from bookmarks');
      }
    } else {
      const res = await addBookmark(article);
      if (res.bookmarks) {
        setBookmarks(res.bookmarks);
        setBookmarkMsg('Added to bookmarks');
      } else if (res.message) {
        setBookmarkMsg(res.message);
      }
    }
    setTimeout(() => setBookmarkMsg(''), 1500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(search);
  };

  const handleClearSearch = () => {
    setSearch('');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar: hidden on small screens, visible on md+ */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 md:ml-64 min-h-screen flex flex-col">
        <main className="flex-1 p-2 sm:p-4 md:p-8 overflow-y-auto">
          {/* Welcome/Profile Section */}
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col items-center mb-4 sm:mb-8 mt-2">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-100 flex items-center justify-center text-xl sm:text-2xl font-bold text-blue-600 mb-2">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="text-lg sm:text-xl font-semibold mb-1">Welcome, {user?.name || 'User'}!</div>
            {preferences.length > 0 ? (
              <div className="text-gray-600 text-xs sm:text-sm">Your topics: {preferences.join(', ')}</div>
            ) : (
              <div className="text-gray-400 text-xs sm:text-sm">Set your preferences for personalized news.</div>
            )}
          </div>
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6 gap-2 w-full">
            <input
              type="text"
              className="w-full max-w-md border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Search news by keyword..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="flex gap-2 w-full sm:w-auto">
              <button type="submit" className="flex-1 sm:flex-none bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Search</button>
              {searchTerm && (
                <button type="button" onClick={handleClearSearch} className="flex-1 sm:flex-none text-gray-500 hover:text-blue-600">Clear</button>
              )}
            </div>
          </form>
          {searchTerm && (
            <div className="text-center text-gray-600 mb-2 sm:mb-4">Showing results for: <span className="font-semibold">{searchTerm}</span></div>
          )}
          {bookmarkMsg && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded shadow z-50">
              {bookmarkMsg}
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Latest News</h1>
          {loading && <div className="text-center">Loading...</div>}
          {error && articles.length === 0 && (
            <div className="text-center text-red-500 mb-4">{error}</div>
          )}
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {articles.map((article, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow flex flex-col overflow-hidden relative"
              >
                <button
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 text-blue-600 hover:text-blue-800 text-lg sm:text-xl z-10"
                  onClick={() => handleBookmark(article)}
                  title={isBookmarked(article) ? 'Remove Bookmark' : 'Add Bookmark'}
                >
                  {isBookmarked(article) ? <FaBookmark /> : <FaRegBookmark />}
                </button>
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-40 sm:h-48 object-cover"
                    onError={e => { e.target.onerror = null; e.target.src = '/fallback.jpg'; }}
                  />
                )}
                <div className="p-3 sm:p-4 flex flex-col flex-1">
                  <h2 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 line-clamp-2">{article.title}</h2>
                  {article.publishedAt && (
                    <div className="text-xs text-gray-500 mb-1">
                      {new Date(article.publishedAt).toLocaleString()}
                    </div>
                  )}
                  <p className="text-gray-600 mb-2 sm:mb-4 flex-1 line-clamp-3">{article.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-400">{article.source?.name}</span>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded hover:bg-blue-700 text-xs sm:text-sm font-medium transition"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!loading && articles.length === 0 && !error && (
            <div className="text-center text-gray-500 mt-8">No news articles found.</div>
          )}
        </main>
      </div>
    </div>
  );
} 