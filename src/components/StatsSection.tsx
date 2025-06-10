import React, { useEffect, useState } from 'react';
import { Users, MapPin, Brush } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const StatsSection = () => {
  const [stats, setStats] = useState({
    artists: 500,
    walls: 750,
    projects: 1200
  });

  useEffect(() => {
    // Function to fetch real stats from Supabase
    const fetchStats = async () => {
      try {
        console.log('Fetching stats from Supabase...');
        
        // Fetch artists count
        const { count: artistsCount } = await supabase
          .from('artists')
          .select('*', { count: 'exact', head: true });
        
        // Fetch walls count  
        const { count: wallsCount } = await supabase
          .from('walls')
          .select('*', { count: 'exact', head: true });
        
        // Fetch projects count
        const { count: projectsCount } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true });
        
        console.log('Stats from Supabase:', { artistsCount, wallsCount, projectsCount });
        
        // Update stats if we have data, otherwise keep default values
        if (artistsCount !== null || wallsCount !== null || projectsCount !== null) {
          setStats({
            artists: artistsCount || 500,
            walls: wallsCount || 750,
            projects: projectsCount || 1200
          });
        }
      } catch (error) {
        console.log('Stats will use default values until Supabase tables are ready:', error);
        // Keep default values if Supabase is not ready yet
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    {
      icon: <Users className="w-12 h-12 text-wxll-artist" />,
      value: `${stats.artists}+`,
      label: "Artistes",
      description: "Artistes talentueux à travers la France"
    },
    {
      icon: <MapPin className="w-12 h-12 text-wxll-wall-owner" />,
      value: `${stats.walls}+`,
      label: "Murs",
      description: "Espaces disponibles pour créer"
    },
    {
      icon: <Brush className="w-12 h-12 text-wxll-blue" />,
      value: `${stats.projects}+`,
      label: "Projets",
      description: "Œuvres street art déjà réalisées"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsData.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-8 rounded-lg border border-gray-100 hover:border-wxll-blue transition-colors"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold text-wxll-dark mb-2">
                {stat.value}
              </h3>
              <h4 className="text-xl font-semibold text-wxll-blue mb-2">
                {stat.label}
              </h4>
              <p className="text-gray-600">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
