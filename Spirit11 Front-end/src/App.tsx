import React, { JSX, useEffect, useState } from 'react';
import { Routes, Route, Navigate, BrowserRouter as Router, useNavigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/adminPages/Dashboard';
import Players from './pages/adminPages/Players';
import PlayerStats from './pages/adminPages/PlayerStats';
import Summary from './pages/adminPages/Summary';
import SelectTeam from './pages/userPages/SelectTeam';
import Budget from './pages/userPages/Budget';
import Leaderboard from './pages/userPages/Leaderboard';
import Team from './pages/userPages/Team';
import Home from './pages/userPages/home';
import axios from 'axios';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = sessionStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

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

const App: React.FC = () => {
  return (
    <Router>
      <LogoutButton />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/admin" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/admin/players" element={<PrivateRoute><Players /></PrivateRoute>} />
        <Route path="/admin/player-stats" element={<PrivateRoute><PlayerStats /></PrivateRoute>} />
        <Route path="/admin/summary" element={<PrivateRoute><Summary /></PrivateRoute>} />
        <Route path="/select-team" element={<PrivateRoute><SelectTeam /></PrivateRoute>} />
        <Route path="/team" element={<PrivateRoute><Team /></PrivateRoute>} />
        <Route path="/budget" element={<PrivateRoute><Budget /></PrivateRoute>} />
        <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;

