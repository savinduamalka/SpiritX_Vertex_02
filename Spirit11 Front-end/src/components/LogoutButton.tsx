import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsVisible(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/logout`, {}, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        navigate('/login');
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!isVisible) return null;

  return (
    <button onClick={handleLogout} className="p-3 bg-red-600 text-white rounded-md fixed top-4 right-4 hover:bg-red-700 transition duration-300">
      Logout
    </button>
  );
};

export default LogoutButton;
