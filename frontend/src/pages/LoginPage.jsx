import React, { useState } from 'react';
import { login, setToken } from '../api';
import { useNavigate } from 'react-router-dom';
import { HiMail, HiLockClosed } from 'react-icons/hi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.token) {
      setToken(res.token);
      window.location.href = '/news';
    } else {
      setError(res.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-2 sm:p-0">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-4 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4 text-center">News Aggregator</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600 mb-2">
              N
            </div>
          </div>
          {error && <div className="mb-4 text-red-500 w-full text-center">{error}</div>}
          <div className="mb-4 w-full">
            <label className="block mb-1 font-medium">Email</label>
            <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
              <HiMail className="text-gray-400 mr-2" />
              <input
                type="email"
                className="w-full bg-transparent outline-none"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="mb-6 w-full">
            <label className="block mb-1 font-medium">Password</label>
            <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
              <HiLockClosed className="text-gray-400 mr-2" />
              <input
                type="password"
                className="w-full bg-transparent outline-none"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-lg">Login</button>
          <div className="mt-4 text-center w-full">
            <a href="/register" className="text-blue-600 hover:underline">Don't have an account? Register</a>
          </div>
        </form>
      </div>
    </div>
  );
} 