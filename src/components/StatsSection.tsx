
import React from 'react';
import { Users, MapPin, Brush } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: <Users className="w-12 h-12 text-wxll-blue" />,
      value: "500+",
      label: "Artistes",
      description: "Artistes talentueux à travers la France"
    },
    {
      icon: <MapPin className="w-12 h-12 text-wxll-blue" />,
      value: "750+",
      label: "Murs",
      description: "Espaces disponibles pour créer"
    },
    {
      icon: <Brush className="w-12 h-12 text-wxll-blue" />,
      value: "1200+",
      label: "Projets",
      description: "Œuvres street art déjà réalisées"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
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
