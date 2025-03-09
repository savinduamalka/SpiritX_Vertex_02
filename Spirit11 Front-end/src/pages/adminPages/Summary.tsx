import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/adminComponents/Sidebar";
import natureImage from "../../assets/images/new.jpg";

interface Summary {
  totalMatches: number;
  totalRuns: number;
  totalWickets: number;
}

export default function Summary() {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    // Fetch tournament summary from the backend
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/summary`)
      .then(response => setSummary(response.data))
      .catch(error => console.error('Error fetching summary:', error));
  }, []);

  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col md:flex-row"
      style={{ backgroundImage: `url(${natureImage})` }}
    >
      <Sidebar />
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Tournament Summary</h2>
          {summary ? (
            <div>
              <p>Total Matches: {summary.totalMatches}</p>
              <p>Total Runs: {summary.totalRuns}</p>
              <p>Total Wickets: {summary.totalWickets}</p>
            </div>
          ) : (
            <p>Loading summary...</p>
          )}
        </div>
      </div>
    </div>
  );
}

