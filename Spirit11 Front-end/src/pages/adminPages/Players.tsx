import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/adminComponents/SIdebar";
import natureImage from "../../assets/images/new.jpg";

interface Player {
  id: number;
  name: string;
  university: string;
  category: string;
}

export default function Players() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayer, setNewPlayer] = useState({ name: '', university: '', category: '' });

  useEffect(() => {
    // Fetch players from the backend
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/players`)
      .then(response => setPlayers(response.data))
      .catch(error => console.error('Error fetching players:', error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPlayer({ ...newPlayer, [name]: value });
  };

  const handleAddPlayer = () => {
    // Add player to the backend
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/players`, newPlayer)
      .then(response => setPlayers([...players, response.data]))
      .catch(error => console.error('Error adding player:', error));
  };

  const handleDeletePlayer = (id: number) => {
    // Delete player from the backend
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/players/${id}`)
      .then(() => setPlayers(players.filter(player => player.id !== id)))
      .catch(error => console.error('Error deleting player:', error));
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col md:flex-row"
      style={{ backgroundImage: `url(${natureImage})` }}
    >
      <Sidebar />
      <div className="flex-1 p-4 flex flex-col items-center">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Players</h2>
          <div className="mb-4 flex flex-col md:flex-row">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newPlayer.name}
              onChange={handleInputChange}
              className="p-2 border rounded mb-2 md:mb-0 md:mr-2"
            />
            <input
              type="text"
              name="university"
              placeholder="University"
              value={newPlayer.university}
              onChange={handleInputChange}
              className="p-2 border rounded mb-2 md:mb-0 md:mr-2"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newPlayer.category}
              onChange={handleInputChange}
              className="p-2 border rounded mb-2 md:mb-0 md:mr-2"
            />
            <button onClick={handleAddPlayer} className="p-2 bg-blue-500 text-white rounded">Add Player</button>
          </div>
          <ul>
            {players.map(player => (
              <li key={player.id} className="flex justify-between items-center p-2 border-b">
                <span>{player.name} - {player.university} - {player.category}</span>
                <button onClick={() => handleDeletePlayer(player.id)} className="p-2 bg-red-500 text-white rounded">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
