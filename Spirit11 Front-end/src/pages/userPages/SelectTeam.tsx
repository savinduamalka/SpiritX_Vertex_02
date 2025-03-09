import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserSidebar from "../../components/userComponents/SideBar";
import natureImage from "../../assets/images/new.jpg";
import Alert from '@mui/material/Alert';

interface Player {
  playerId: string;
  name: string;
  category: string;
  price: number;
}

interface Team {
  userId: string;
  players: string[];
  budget: number;
}

export default function SelectTeam() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [team, setTeam] = useState<Team | null>(null);
  const [teamMembers, setTeamMembers] = useState<Player[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [availableBalance, setAvailableBalance] = useState<number | null>(null);
  const [spentBalance, setSpentBalance] = useState<number | null>(null);

  useEffect(() => {
    // Fetch players from the backend
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/players`)
      .then(response => setPlayers(response.data))
      .catch(() => setError('Error fetching players.'));

    // Fetch user's team from the backend
    const userId = sessionStorage.getItem('userId'); // Assuming userId is stored in session storage
    if (userId) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/teams/team/${userId}`)
        .then(response => {
          setTeam(response.data.team);
          setAvailableBalance(response.data.availableBalance);
          setSpentBalance(response.data.spentBalance);
        })
        .catch(() => setError('Error fetching team.'));

      // Fetch team members
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/teams/team-members/${userId}`)
        .then(response => setTeamMembers(response.data))
        .catch(() => setError('Error fetching team members.'));
    } else {
      setError('User ID not found in session storage.');
    }
  }, []);

  const handlePlayerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlayerId(e.target.value);
  };

  const handleAddPlayer = () => {
    const userId = sessionStorage.getItem('userId'); // Assuming userId is stored in session storage
    if (userId) {
      const selectedPlayer = players.find(player => player.playerId === selectedPlayerId);
      if (selectedPlayer) {
        if (team && team.players.length >= 11) {
          setError('You cannot have more than 11 players in your team.');
          return;
        }
        if (availableBalance !== null && availableBalance < selectedPlayer.price) {
          setError('You do not have enough budget to buy this player.');
          return;
        }
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/teams/select-player`, { userId, playerId: selectedPlayerId })
          .then(response => {
            setTeam(response.data.team);
            setSelectedPlayerId('');
            setError(null);
            setSuccess('Player added to team successfully.');
            setAvailableBalance(response.data.availableBalance);
            setSpentBalance(response.data.spentBalance);
            // Fetch updated team members
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/teams/team-members/${userId}`)
              .then(response => setTeamMembers(response.data))
              .catch(() => setError('Error fetching team members.'));
          })
          .catch(error => {
            setSuccess(null);
            setError(error.response?.data?.message || 'Error adding player to team.');
          });
      }
    } else {
      setError('User ID not found in session storage.');
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col md:flex-row"
      style={{ backgroundImage: `url(${natureImage})` }}
    >
      <UserSidebar />
      <div className="flex-1 p-6 flex flex-col items-center">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Select Your Team</h2>
          
          {error && <Alert severity="error" className="mb-4">{error}</Alert>}
          {success && <Alert severity="success" className="mb-4">{success}</Alert>}
          
          <div className="flex flex-col mb-6">
            <label className="text-sm font-medium">Select Player</label>
            <select
              value={selectedPlayerId}
              onChange={handlePlayerChange}
              className="p-2 border rounded-md"
            >
              <option value="">Select Player</option>
              {players.map(player => (
                <option key={player.playerId} value={player.playerId}>
                  {player.name} - {player.category} - LKR {player.price}
                </option>
              ))}
            </select>
          </div>

          <button onClick={handleAddPlayer} className="p-3 bg-blue-600 text-white rounded-md w-full">
            Add Player
          </button>

          <h2 className="text-xl font-bold mt-6">Your Team</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto mt-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Player Name</th>
                  <th className="px-4 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map(player => (
                  <tr key={player.playerId}>
                    <td className="border px-4 py-2">{player.name}</td>
                    <td className="border px-4 py-2">LKR {player.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold mt-6">Budget</h2>
          <p className="text-lg">Available Balance: LKR {availableBalance !== null ? availableBalance : 'Loading...'}</p>
          <p className="text-lg">Spent Balance: LKR {spentBalance !== null ? spentBalance : 'Loading...'}</p>
        </div>
      </div>
    </div>
  );
}
