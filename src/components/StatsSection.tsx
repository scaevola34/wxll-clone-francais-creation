
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const StatsSection = () => {
  const [stats, setStats] = useState({
    artists: 0,
    walls: 0,
    projects: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch artists count
        const { count: artistsCount, error: artistsError } = await supabase
          .from('artists')
          .select('*', { count: 'exact', head: true });

        // Fetch walls count
        const { count: wallsCount, error: wallsError } = await supabase
          .from('wall_owners')
          .select('*', { count: 'exact', head: true });

        // Fetch projects count
        const { count: projectsCount, error: projectsError } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true });

        if (artistsError || wallsError || projectsError) {
          console.error('Error fetching stats:', { artistsError, wallsError, projectsError });
          return;
        }

        setStats({
          artists: artistsCount || 0,
          walls: wallsCount || 0,
          projects: projectsCount || 0,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  if (stats.loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const statItems = [
    {
      number: `${stats.artists}+`,
      label: 'Artistes',
      color: 'text-wxll-artist',
      borderColor: 'border-wxll-artist'
    },
    {
      number: `${stats.walls}+`,
      label: 'Murs',
      color: 'text-wxll-wall-owner',
      borderColor: 'border-wxll-wall-owner'
    },
    {
      number: `${stats.projects}+`,
      label: 'Projets',
      color: 'text-wxll-blue',
      borderColor: 'border-wxll-blue'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {statItems.map((stat, index) => (
            <div 
              key={index} 
              className={`p-6 bg-white rounded-lg shadow-sm border-2 ${stat.borderColor} hover:shadow-md transition-shadow`}
            >
              <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>
                {stat.number}
              </div>
              <div className="text-gray-600 text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
