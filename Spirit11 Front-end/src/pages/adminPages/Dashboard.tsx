import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import DashboardLayout from '../../components/adminComponents/DashboardLayout';

const Dashboard: React.FC = () => {
  return (
    <Router>
      <DashboardLayout />
    </Router>
  );
};

export default Dashboard;

