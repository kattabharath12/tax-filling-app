
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/api/auth/me');
        setUser(data);
      } catch (err) {
        setError('Failed to fetch user profile. Please login again.');
        localStorage.removeItem('token');
        navigate('/');
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (error) {
    return <p className="text-red-600 mt-10 text-center">{error}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-3xl mb-4">Welcome, {user?.name || 'User'}</h1>
      <p>Email: {user?.email}</p>
      <p>State: {user?.state}</p>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
      <div className="mt-8">
        <h2 className="text-xl mb-2">Dashboard content coming soon...</h2>
      </div>
    </div>
  );
};

export default Dashboard;
