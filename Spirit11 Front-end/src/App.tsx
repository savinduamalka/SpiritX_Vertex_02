import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/adminPages/Dashboard';
import Players from './pages/adminPages/Players';
import PlayerStats from './pages/adminPages/PlayerStats';
import Summary from './pages/adminPages/Summary';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/players" element={<Players />} />
      <Route path="/admin/player-stats" element={<PlayerStats />} />
      <Route path="/admin/summary" element={<Summary />} />
    </Routes>
  );
};

export default App;

