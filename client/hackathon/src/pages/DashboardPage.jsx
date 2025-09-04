import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import DonorDashboard from '../components/Dashboard/DonorDashboard.jsx';
import PatientDashboard from '../components/Dashboard/PatientDashboard.jsx';
import HospitalDashboard from '../components/Dashboard/HospitalDashboard.jsx';
import ProfessionalDashboard from '../components/Dashboard/ProfessionalDashboard.jsx';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Loading...</p>;

  switch (user.role.toLowerCase()) {
    case "donor":
      return <DonorDashboard />;
    case "patient":
      return <PatientDashboard />;
    case "hospital":
      return <HospitalDashboard />;
    case "professional":
      return <ProfessionalDashboard />;
    default:
      return <p>Unknown Role</p>;
  }
};

export default DashboardPage;
