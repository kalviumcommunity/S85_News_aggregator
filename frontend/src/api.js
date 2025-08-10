const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Token management
export function setToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Auth
export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function register(name, email, password) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
}

// Preferences
export async function setPreferences(preferences) {
  const res = await fetch(`${API_BASE}/auth/preferences`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify({ preferences }),
  });
  return res.json();
}

// News
export async function getNews(keyword) {
  let url = `${API_BASE}/news`;
  if (keyword) {
    url += `?q=${encodeURIComponent(keyword)}`;
  }
  const res = await fetch(url, {
    headers: authHeaders(),
  });
  return res.json();
}

// Bookmarks
export async function getBookmarks() {
  const res = await fetch(`${API_BASE}/bookmarks`, {
    headers: authHeaders(),
  });
  return res.json();
}

export async function addBookmark(article) {
  const res = await fetch(`${API_BASE}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify({ article }),
  });
  return res.json();
}

export async function removeBookmark(url) {
  const res = await fetch(`${API_BASE}/bookmarks`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify({ url }),
  });
  return res.json();
}

// Trending news
export async function getTrending() {
  const res = await fetch(`${API_BASE}/trending`, {
    headers: authHeaders(),
  });
  return res.json();
} 