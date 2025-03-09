import React from 'react';
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

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/players" element={<Players />} />
        <Route path="/admin/player-stats" element={<PlayerStats />} />
        <Route path="/admin/summary" element={<Summary />} />
        <Route path="/select-team" element={<SelectTeam />} />
        <Route path="/team" element={<Team />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
};

export default App;

