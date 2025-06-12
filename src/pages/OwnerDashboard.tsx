
import React from 'react';
import { OwnerDashboard as OwnerDashboardComponent } from '@/components/OwnerDashboard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const OwnerDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <OwnerDashboardComponent />
      </div>
      <Footer />
    </div>
  );
};

export default OwnerDashboard;
