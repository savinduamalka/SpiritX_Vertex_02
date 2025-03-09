import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/adminComponents/Sidebar";
import natureImage from "../../assets/images/new.jpg";
import Alert from '@mui/material/Alert'; // Import MUI Alert

interface Player {
  playerId: string; // Change id to playerId
  name: string;
  university: string;
  category: string;
}

export default function Players() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayer, setNewPlayer] = useState({ name: '', university: '', category: '' });
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // Add success state

  useEffect(() => {
    // Fetch players from the backend
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/players`)
      .then(response => setPlayers(response.data))
      .catch(error => console.error('Error fetching players:', error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingPlayer) {
      setEditingPlayer({ ...editingPlayer, [name]: value });
    } else {
      setNewPlayer({ ...newPlayer, [name]: value });
    }
  };

  const handleAddPlayer = () => {
    const token = sessionStorage.getItem('token'); // Get the token from session storage

    // Add player to the backend
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/players`, newPlayer, {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the request headers
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        // Add player to state locally to reflect changes immediately
        setPlayers(prevPlayers => [...prevPlayers, response.data]);
        setNewPlayer({ name: '', university: '', category: '' }); // Reset the form
        setError(null);
        setSuccess('Player added successfully.'); // Set success message
      })
      .catch(error => {
        console.error('Error adding player:', error);
        setSuccess(null);
        setError('Error adding player.');
      });
  };

  const handleDeletePlayer = (playerId: string) => { // Change id to playerId
    console.log('Deleting player with id:', playerId); // Debugging log

    if (!playerId) {
      setError('Player ID is undefined.');
      return;
    }

    const token = sessionStorage.getItem('token'); // Get the token from session storage

    // Delete player from the backend
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/players/${playerId}`, {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the request headers
      }
    })
      .then(response => {
        if (response.status === 200) {
          setPlayers(players.filter(player => player.playerId !== playerId));
          setError(null);
          setSuccess('Player deleted successfully.'); // Set success message
        } else {
          setSuccess(null);
          setError('Error deleting player.');
        }
      })
      .catch(error => {
        console.error('Error deleting player:', error);
        setSuccess(null);
        setError('Error deleting player.');
      });
  };

  const handleEditPlayer = (playerId: string) => { // Change id to playerId
    const playerToEdit = players.find(player => player.playerId === playerId);
    if (playerToEdit) {
      setEditingPlayer(playerToEdit);
      // Set the form to the values of the player being edited
      setNewPlayer({ name: playerToEdit.name, university: playerToEdit.university, category: playerToEdit.category });
    }
  };

  const handleUpdatePlayer = () => {
    const token = sessionStorage.getItem('token'); // Get the token from session storage

    if (editingPlayer) {
      axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/players/${editingPlayer.playerId}`, editingPlayer, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the request headers
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.status === 200) {
            setPlayers(players.map(player => player.playerId === editingPlayer.playerId ? response.data : player));
            setEditingPlayer(null);
            setNewPlayer({ name: '', university: '', category: '' }); // Reset the form after update
            setError(null);
            setSuccess('Player updated successfully.'); // Set success message
          } else {
            setSuccess(null);
            setError('Error updating player.');
          }
        })
        .catch(error => {
          console.error('Error updating player:', error);
          setSuccess(null);
          setError('Error updating player.');
        });
    }
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
          
          {error && <Alert severity="error" className="mb-4">{error}</Alert>} {/* Use MUI Alert for error */}
          {success && <Alert severity="success" className="mb-4">{success}</Alert>} {/* Use MUI Alert for success */}
          
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="name"
              placeholder="Player Name"
              value={editingPlayer ? editingPlayer.name : newPlayer.name}
              onChange={handleInputChange}
              className="p-3 border rounded-md w-full md:w-1/3"
            />
            <input
              type="text"
              name="university"
              placeholder="University"
              value={editingPlayer ? editingPlayer.university : newPlayer.university}
              onChange={handleInputChange}
              className="p-3 border rounded-md w-full md:w-1/3"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={editingPlayer ? editingPlayer.category : newPlayer.category}
              onChange={handleInputChange}
              className="p-3 border rounded-md w-full md:w-1/3"
            />
            {editingPlayer ? (
              <button 
                onClick={handleUpdatePlayer} 
                className="p-3 bg-green-600 text-white rounded-md w-full md:w-1/4 mt-2 md:mt-0">
                Update Player
              </button>
            ) : (
              <button 
                onClick={handleAddPlayer} 
                className="p-3 bg-blue-600 text-white rounded-md w-full md:w-1/4 mt-2 md:mt-0">
                Add Player
              </button>
            )}
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
                  <tr key={player.playerId} className="border-b">
                    <td className="p-4">{player.name}</td>
                    <td className="p-4">{player.university}</td>
                    <td className="p-4">{player.category}</td>
                    <td className="p-4 text-center flex gap-4 justify-center">
                      <button
                        onClick={() => handleEditPlayer(player.playerId)}
                        className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePlayer(player.playerId)} 
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
