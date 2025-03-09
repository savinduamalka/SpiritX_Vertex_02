import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/adminComponents/Sidebar";
import natureImage from "../../assets/images/new.jpg";
import Alert from '@mui/material/Alert';

interface Summary {
  overallRuns: number;
  overallWickets: number;
  highestRunScorer: string;
  highestWicketTaker: string;
}

export default function Summary() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch tournament summary from the backend
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tournament-summary`)
      .then(response => setSummary(response.data))
      .catch(error => {
        console.error('Error fetching summary:', error);
        setError('Error fetching summary.');
      });
  }, []);

  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col md:flex-row"
      style={{ backgroundImage: `url(${natureImage})` }}
    >
      <Sidebar />
      <div className="flex-1 p-6 flex flex-col items-center">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Tournament Summary</h2>
          
          {error && <Alert severity="error" className="mb-4">{error}</Alert>} {/* Use MUI Alert for error */}
          
          {summary ? (
            <div>
              <p className="text-lg mb-2"><strong>Overall Runs:</strong> {summary.overallRuns}</p>
              <p className="text-lg mb-2"><strong>Overall Wickets:</strong> {summary.overallWickets}</p>
              <p className="text-lg mb-2"><strong>Highest Run Scorer:</strong> {summary.highestRunScorer}</p>
              <p className="text-lg mb-2"><strong>Highest Wicket Taker:</strong> {summary.highestWicketTaker}</p>
            </div>
          ) : (
            <p>Loading summary...</p>
          )}
        </div>
      </div>
    </div>
  );
}

