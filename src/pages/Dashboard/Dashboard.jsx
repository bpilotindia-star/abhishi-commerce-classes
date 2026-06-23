import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import StudentDashboard from './StudentDashboard';

const Dashboard = () => {
  const { currentUser, userRole } = useAuth();

  if (!currentUser) return null;

  if (userRole === 'Admin') {
    return <AdminDashboard />;
  }

  // All other users (Student role) get the Student Dashboard
  return <StudentDashboard />;
};

export default Dashboard;

