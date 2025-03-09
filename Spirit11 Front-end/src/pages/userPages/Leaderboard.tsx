import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserSidebar from "../../components/userComponents/SideBar";
import natureImage from "../../assets/images/new.jpg";
import Alert from '@mui/material/Alert';

interface Team {
  teamName: string;
  userId: string;
  points: number;
  playerCount: number;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/teams/leaderboard/all`)
      .then(response => setLeaderboard(response.data))
      .catch(() => setError('Error fetching leaderboard.'));
  }, []);

  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col md:flex-row"
      style={{ backgroundImage: `url(${natureImage})` }}
    >
      <UserSidebar />
      <div className="flex-1 p-6 flex flex-col items-center">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Leaderboard</h2>
          
          {error && <Alert severity="error" className="mb-4">{error}</Alert>}
          
          <div className="overflow-x-auto">
            <table className="w-full table-auto mt-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Team Owner</th>
                  <th className="px-4 py-2">Points</th>
                  <th className="px-4 py-2">Player Count</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map(team => (
                  <tr key={team.userId}>
                    <td className="border px-4 py-2">{team.teamName}</td>
                    <td className="border px-4 py-2">{team.points !== undefined ? team.points : 'N/A'}</td>
                    <td className="border px-4 py-2">{team.playerCount}</td>
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
