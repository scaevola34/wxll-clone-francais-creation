
import React from 'react';
import { OwnerDashboard as OwnerDashboardComponent } from '@/components/OwnerDashboard';

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
