import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/adminComponents/AdminSidebar";
import natureImage from "../../assets/images/new.jpg";
import Alert from '@mui/material/Alert';

interface Player {
  playerId: string;
  name: string;
  category: string;
}

interface PlayerStats {
  playerId: string;
  name: string;
  category: string;
  totalRuns: number;
  ballsFaced: number;
  inningsPlayed: number;
  wickets: number;
  oversBowled: number;
  runsConceded: number;
}

export default function PlayerStats() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);
  const [newStats, setNewStats] = useState<PlayerStats>({
    playerId: '',
    name: '',
    category: '',
    totalRuns: 0,
    ballsFaced: 0,
    inningsPlayed: 0,
    wickets: 0,
    oversBowled: 0,
    runsConceded: 0
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    // Fetch players from the backend
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/players`)
      .then(response => setPlayers(response.data))
      .catch(() => setError('Error fetching players.'));

    // Fetch player stats from the backend
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/player-stats`)
      .then(response => setPlayerStats(response.data))
      .catch(() => setError('Error fetching player stats.'));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStats(prev => ({ ...prev, [name]: value }));
  };

  const handlePlayerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlayerId = e.target.value;
    const selectedPlayer = players.find(player => player.playerId === selectedPlayerId);
    if (selectedPlayer) {
      setNewStats(prev => ({
        ...prev,
        playerId: selectedPlayer.playerId,
        name: selectedPlayer.name,
        category: selectedPlayer.category
      }));
    }
  };

  const handleAddStats = () => {
    const token = sessionStorage.getItem('token');
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/player-stats`, newStats, {
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
    })
    .then(response => {
      setPlayerStats(prevStats => [...prevStats, response.data]);
      setNewStats({ playerId: '', name: '', category: '', totalRuns: 0, ballsFaced: 0, inningsPlayed: 0, wickets: 0, oversBowled: 0, runsConceded: 0 });
      setError(null);
      setSuccess('Player stats added successfully.');
      // Re-fetch player stats to refresh the component
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/player-stats`)
        .then(response => setPlayerStats(response.data))
        .catch(() => setError('Error fetching player stats.'));
    })
    .catch(() => {
      setSuccess(null);
      setError('Error adding player stats.');
    });
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col md:flex-row"
      style={{ backgroundImage: `url(${natureImage})` }}
    >
      <Sidebar />
      <div className="flex-1 p-6 flex flex-col items-center">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Add Player Stats</h2>
          
          {error && <Alert severity="error" className="mb-4">{error}</Alert>} {/* Use MUI Alert for error */}
          {success && <Alert severity="success" className="mb-4">{success}</Alert>} {/* Use MUI Alert for success */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium">Player ID</label>
              <select
                name="playerId"
                value={newStats.playerId}
                onChange={handlePlayerChange}
                className="p-2 border rounded-md"
              >
                <option value="">Select Player</option>
                {players.map(player => (
                  <option key={player.playerId} value={player.playerId}>
                    {player.playerId} - {player.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={newStats.name}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={newStats.category}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">Total Runs</label>
              <input
                type="number"
                name="totalRuns"
                value={newStats.totalRuns}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">Balls Faced</label>
              <input
                type="number"
                name="ballsFaced"
                value={newStats.ballsFaced}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">Innings Played</label>
              <input
                type="number"
                name="inningsPlayed"
                value={newStats.inningsPlayed}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">Wickets</label>
              <input
                type="number"
                name="wickets"
                value={newStats.wickets}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">Overs Bowled</label>
              <input
                type="number"
                name="oversBowled"
                value={newStats.oversBowled}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">Runs Conceded</label>
              <input
                type="number"
                name="runsConceded"
                value={newStats.runsConceded}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
              />
            </div>
          </div>

          <button onClick={handleAddStats} className="p-3 bg-blue-600 text-white rounded-md w-full">
            Add Stats
          </button>

          <h2 className="text-xl font-bold mt-6">Player Stats List</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto mt-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Total Runs</th>
                  <th className="px-4 py-2">Balls Faced</th>
                  <th className="px-4 py-2">Innings Played</th>
                  <th className="px-4 py-2">Wickets</th>
                  <th className="px-4 py-2">Overs Bowled</th>
                  <th className="px-4 py-2">Runs Conceded</th>
                </tr>
              </thead>
              <tbody>
                {playerStats.map(stats => (
                  <tr key={stats.playerId}>
                    <td className="border px-4 py-2">{stats.name}</td>
                    <td className="border px-4 py-2">{stats.category}</td>
                    <td className="border px-4 py-2">{stats.totalRuns}</td>
                    <td className="border px-4 py-2">{stats.ballsFaced}</td>
                    <td className="border px-4 py-2">{stats.inningsPlayed}</td>
                    <td className="border px-4 py-2">{stats.wickets}</td>
                    <td className="border px-4 py-2">{stats.oversBowled}</td>
                    <td className="border px-4 py-2">{stats.runsConceded}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
