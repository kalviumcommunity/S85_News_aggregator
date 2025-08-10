import React, { useState, useEffect } from 'react';
import { setPreferences, getToken } from '../api';
import Sidebar from '../components/Sidebar';

const TOPICS = [
  'technology',
  'sports',
  'business',
  'entertainment',
  'health',
  'science',
];

export default function PreferencesPage() {
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchPreferences() {
      setFetching(true);
      setError('');
      try {
        const token = getToken();
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/preferences`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.preferences) {
          setSelected(data.preferences);
        }
      } catch (err) {
        setError('Failed to load preferences');
      }
      setFetching(false);
    }
    fetchPreferences();
  }, []);

  const toggleTopic = (topic) => {
    setSelected((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    const res = await setPreferences(selected);
    if (res.preferences) {
      setMessage('Preferences saved!');
    } else {
      setError(res.message || 'Failed to save preferences');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 md:ml-64 min-h-screen flex flex-col">
        <main className="flex-1 p-2 sm:p-4 md:p-8 overflow-y-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Select Your News Topics</h1>
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-4 sm:p-6 max-w-lg mx-auto flex flex-col gap-4">
            {fetching ? (
              <div className="text-center text-gray-500 mb-4">Loading preferences...</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                {TOPICS.map((topic) => (
                  <label key={topic} className={`flex items-center cursor-pointer rounded px-2 py-2 transition ${selected.includes(topic) ? 'bg-blue-100' : ''}`}>
                    <input
                      type="checkbox"
                      className="mr-2 accent-blue-600"
                      checked={selected.includes(topic)}
                      onChange={() => toggleTopic(topic)}
                    />
                    <span className="capitalize">{topic}</span>
                  </label>
                ))}
              </div>
            )}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-lg mt-2">Save Preferences</button>
            {message && <div className="mt-4 text-green-600 text-center">{message}</div>}
            {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
          </form>
        </main>
      </div>
    </div>
  );
} 