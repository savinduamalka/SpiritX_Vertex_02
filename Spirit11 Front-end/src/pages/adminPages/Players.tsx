import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/adminComponents/Sidebar";
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

  const handleEditPlayer = (id: number) => {
    // Handle editing player functionality (to be implemented)
    console.log(`Edit player with id: ${id}`);
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col md:flex-row"
      style={{ backgroundImage: `url(${natureImage})` }}
    >
      <Sidebar />
      <div className="flex-1 p-6 flex flex-col items-center">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Manage Players</h2>
          
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="name"
              placeholder="Player Name"
              value={newPlayer.name}
              onChange={handleInputChange}
              className="p-3 border rounded-md w-full md:w-1/3"
            />
            <input
              type="text"
              name="university"
              placeholder="University"
              value={newPlayer.university}
              onChange={handleInputChange}
              className="p-3 border rounded-md w-full md:w-1/3"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newPlayer.category}
              onChange={handleInputChange}
              className="p-3 border rounded-md w-full md:w-1/3"
            />
            <button 
              onClick={handleAddPlayer} 
              className="p-3 bg-blue-600 text-white rounded-md w-full md:w-1/4 mt-2 md:mt-0">
              Add Player
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-md">
              <thead>
                <tr className="text-left bg-gray-100 text-gray-700">
                  <th className="p-4">Name</th>
                  <th className="p-4">University</th>
                  <th className="p-4">Category</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {players.map(player => (
                  <tr key={player.id} className="border-b">
                    <td className="p-4">{player.name}</td>
                    <td className="p-4">{player.university}</td>
                    <td className="p-4">{player.category}</td>
                    <td className="p-4 text-center flex gap-4 justify-center">
                      <button
                        onClick={() => handleEditPlayer(player.id)}
                        className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePlayer(player.id)}
                        className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                      >
                        Delete
                      </button>
                    </td>
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
