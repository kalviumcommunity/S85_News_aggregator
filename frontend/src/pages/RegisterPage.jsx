import React, { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';
import { HiMail, HiLockClosed, HiUser } from 'react-icons/hi';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const res = await register(name, email, password);
    if (res.message && res.message.toLowerCase().includes('success')) {
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setError(res.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-2 sm:p-0">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-4 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4 text-center">News Aggregator</h2>
        {error && <div className="mb-4 text-red-500 w-full text-center">{error}</div>}
        {success && <div className="mb-4 text-green-600 w-full text-center">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4 w-full">
            <label className="block mb-1 font-medium">Name</label>
            <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
              <HiUser className="text-gray-400 mr-2" />
              <input
                type="text"
                className="w-full bg-transparent outline-none"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="Enter your name"
              />
            </div>
          </div>
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
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-lg">Register</button>
          <div className="mt-4 text-center w-full">
            <a href="/login" className="text-blue-600 hover:underline">Already have an account? Login</a>
          </div>
        </form>
      </div>
    </div>
  );
} 