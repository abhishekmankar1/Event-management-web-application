// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove JWT token
    navigate('/login'); // Redirect to login
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="bg-indigo-600 text-white px-4 py-3 shadow flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">🎫 Event Manager</Link>
      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/create-event" className="hover:underline">Create</Link>
            <button onClick={handleLogout} className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-200 transition">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
