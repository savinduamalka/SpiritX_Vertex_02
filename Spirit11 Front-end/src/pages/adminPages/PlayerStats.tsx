import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/adminComponents/SIdebar";
import natureImage from "../../assets/images/new.jpg";

interface PlayerStats {
  id: number;
  name: string;
  matches: number;
  runs: number;
  wickets: number;
}

export default function PlayerStats() {
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);

  useEffect(() => {
    // Fetch player stats from the backend
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/player-stats`)
      .then(response => setPlayerStats(response.data))
      .catch(error => console.error('Error fetching player stats:', error));
  }, []);

  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col md:flex-row"
      style={{ backgroundImage: `url(${natureImage})` }}
    >
      <Sidebar />
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Player Stats</h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Matches</th>
                <th className="px-4 py-2">Runs</th>
                <th className="px-4 py-2">Wickets</th>
              </tr>
            </thead>
            <tbody>
              {playerStats.map(stats => (
                <tr key={stats.id}>
                  <td className="border px-4 py-2">{stats.name}</td>
                  <td className="border px-4 py-2">{stats.matches}</td>
                  <td className="border px-4 py-2">{stats.runs}</td>
                  <td className="border px-4 py-2">{stats.wickets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

