import React, { useEffect, useState } from 'react';
import { getTrending, getBookmarks, addBookmark, removeBookmark } from '../api';
import Sidebar from '../components/Sidebar';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

export default function TrendingPage() {
  const [articles, setArticles] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookmarkMsg, setBookmarkMsg] = useState('');

  useEffect(() => {
    async function fetchTrendingAndBookmarks() {
      setLoading(true);
      setError('');
      const [trendingRes, bookmarksRes] = await Promise.all([
        getTrending(),
        getBookmarks(),
      ]);
      if (trendingRes.articles) {
        setArticles(trendingRes.articles);
      } else {
        setError(trendingRes.message || 'Failed to fetch trending news');
      }
      if (bookmarksRes.bookmarks) {
        setBookmarks(bookmarksRes.bookmarks);
      }
      setLoading(false);
    }
    fetchTrendingAndBookmarks();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 md:ml-64 min-h-screen flex flex-col">
        <main className="flex-1 p-2 sm:p-4 md:p-8 overflow-y-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Trending News</h1>
          {bookmarkMsg && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded shadow z-50">
              {bookmarkMsg}
            </div>
          )}
          {loading && <div className="text-center">Loading...</div>}
          {error && <div className="text-center text-red-500 mb-4">{error}</div>}
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {articles.map((article, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow flex flex-col overflow-hidden relative"
              >
                <button
                  className="absolute top-3 right-3 text-blue-600 hover:text-blue-800 text-xl z-10"
                  onClick={() => handleBookmark(article)}
                  title={isBookmarked(article) ? 'Remove Bookmark' : 'Add Bookmark'}
                >
                  {isBookmarked(article) ? <FaBookmark /> : <FaRegBookmark />}
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
          {!loading && articles.length === 0 && !error && (
            <div className="text-center text-gray-500 mt-8">No trending news found.</div>
          )}
        </main>
      </div>
    </div>
  );
} 