import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserSidebar from "../../components/userComponents/SideBar";
import natureImage from "../../assets/images/new.jpg";
import Alert from '@mui/material/Alert';

interface Player {
  playerId: string;
  name: string;
  category: string;
  university: string;
  totalRuns: number;
  ballsFaced: number;
  inningsPlayed: number;
  wickets: number;
  oversBowled: number;
  runsConceded: number;
}

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<Player[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = sessionStorage.getItem('userId'); // Assuming userId is stored in session storage
    if (userId) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/teams/team-members/${userId}`)
        .then(response => {
          const playerIds = response.data.map((player: { playerId: string }) => player.playerId);
          return axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/player-stats/multiple`, { playerIds });
        })
        .then(response => setTeamMembers(response.data))
        .catch(() => setError('Error fetching team members.'));
    } else {
      setError('User ID not found in session storage.');
    }
  }, []);

  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col md:flex-row"
      style={{ backgroundImage: `url(${natureImage})` }}
    >
      <UserSidebar />
      <div className="flex-1 p-6 flex flex-col items-center">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Your Team</h2>
          
          {error && <Alert severity="error" className="mb-4">{error}</Alert>}
          
          <div className="overflow-x-auto">
            <table className="w-full table-auto mt-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Player Name</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">University</th>
                  <th className="px-4 py-2">Total Runs</th>
                  <th className="px-4 py-2">Balls Faced</th>
                  <th className="px-4 py-2">Innings Played</th>
                  <th className="px-4 py-2">Wickets</th>
                  <th className="px-4 py-2">Overs Bowled</th>
                  <th className="px-4 py-2">Runs Conceded</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map(player => (
                  <tr key={player.playerId}>
                    <td className="border px-4 py-2">{player.name}</td>
                    <td className="border px-4 py-2">{player.category}</td>
                    <td className="border px-4 py-2">{player.university}</td>
                    <td className="border px-4 py-2">{player.totalRuns}</td>
                    <td className="border px-4 py-2">{player.ballsFaced}</td>
                    <td className="border px-4 py-2">{player.inningsPlayed}</td>
                    <td className="border px-4 py-2">{player.wickets}</td>
                    <td className="border px-4 py-2">{player.oversBowled}</td>
                    <td className="border px-4 py-2">{player.runsConceded}</td>
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
