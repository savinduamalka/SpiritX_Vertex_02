import React, { useState, useEffect } from "react";
import axios from "axios";
import natureImage from "../../assets/images/new.jpg";
import Sidebar from "../../components/adminComponents/Sidebar";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/all-users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/teams/all-teams`);
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/players/all-players`);
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchUsers();
    fetchTeams();
    fetchPlayers();
  }, []);

  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col md:flex-row"
      style={{ backgroundImage: `url(${natureImage})` }}
    >
      <Sidebar />
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        {/* Glass morphism card with blur effect */}
        <div className="backdrop-blur-md bg-white/70 p-8 rounded-lg shadow-lg text-center max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Spirit11 Admin Dashboard</h1>
          <p className="text-lg text-gray-600 mb-6">
            "Success is not just about winning games; it's about growing as a team and achieving greatness together."
          </p>
          <p className="text-lg text-gray-600">
            "Here at Spirit11, we believe in the power of teamwork, dedication, and passion for the game."
          </p>
        </div>
        
        {/* Additional blur components */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
          {/* Stats Card 1 */}
          <div className="backdrop-blur-sm bg-blue-500/40 p-6 rounded-lg shadow-md text-white">
            <h3 className="text-xl font-bold mb-2">Total Users</h3>
            <p className="text-3xl font-bold">{users.length}</p>
          </div>
          
          {/* Stats Card 2 */}
          <div className="backdrop-blur-sm bg-green-500/40 p-6 rounded-lg shadow-md text-white">
            <h3 className="text-xl font-bold mb-2">Active Teams</h3>
            <p className="text-3xl font-bold">{teams.length}</p>
          </div>
          
          {/* Stats Card 3 */}
          <div className="backdrop-blur-sm bg-purple-500/40 p-6 rounded-lg shadow-md text-white">
            <h3 className="text-xl font-bold mb-2">Total Players</h3>
            <p className="text-3xl font-bold">{players.length}</p>
          </div>
        </div>
        
        {/* Footer blur component */}
        <div className="backdrop-blur-lg bg-black/30 p-4 rounded-lg mt-8 text-white max-w-md">
          <p className="text-center">© 2025 Spirit11 - Elevating the game together</p>
        </div>
      </div>
    </div>
  );
}
