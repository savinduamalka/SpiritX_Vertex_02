import React, { JSX } from 'react';
import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';
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

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = sessionStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
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

