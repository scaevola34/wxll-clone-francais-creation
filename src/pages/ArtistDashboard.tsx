
import React from 'react';
import { ArtistDashboard as ArtistDashboardComponent } from '@/components/ArtistDashboard';

const ArtistDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <ArtistDashboardComponent />
      </div>
      <Footer />
    </div>
  );
};

export default ArtistDashboard;
