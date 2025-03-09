import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserSidebar from "../../components/userComponents/SideBar";
import natureImage from "../../assets/images/new.jpg";
import Alert from '@mui/material/Alert';

interface Team {
  userId: string;
  budget: number;
}

export default function Budget() {
  const [availableBalance, setAvailableBalance] = useState<number | null>(null);
  const [spentBalance, setSpentBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = sessionStorage.getItem('userId'); // Assuming userId is stored in session storage
    if (userId) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/teams/team/${userId}`)
        .then(response => {
          setAvailableBalance(response.data.availableBalance);
          setSpentBalance(response.data.spentBalance);
        })
        .catch(() => setError('Error fetching budget.'));
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
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Your Budget</h2>
          
          {error && <Alert severity="error" className="mb-4">{error}</Alert>}
          
          <div className="text-center">
            <h3 className="text-2xl font-semibold">Available Balance</h3>
            <p className="text-xl mt-4">LKR {availableBalance !== null ? availableBalance : 'Loading...'}</p>
            <h3 className="text-2xl font-semibold mt-6">Spent Balance</h3>
            <p className="text-xl mt-4">LKR {spentBalance !== null ? spentBalance : 'Loading...'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
