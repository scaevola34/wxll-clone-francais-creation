
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Maximize2, Users, User, Home, Sun, Clock } from 'lucide-react';

interface WallCardProps {
  id: string;
  title: string;
  location: string;
  size: string;
  imageUrl: string;
  budget?: string;
  clientType?: string;
  locationType?: string;
  area?: number;
  timeframe?: string;
}

const WallCard: React.FC<WallCardProps> = ({
  id,
  title,
  location,
  size,
  imageUrl,
  budget,
  clientType,
  locationType,
  timeframe,
}) => {
  return (
    <Link to={`/murs/${id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-64 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {clientType && (
            <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              {clientType === 'B2B' ? (
                <>
                  <Users className="h-3 w-3" />
                  B2B
                </>
              ) : (
                <>
                  <User className="h-3 w-3" />
                  B2C
                </>
              )}
            </div>
          )}
          {locationType && (
            <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              {locationType === 'interior' ? (
                <>
                  <Home className="h-3 w-3" />
                  Intérieur
                </>
              ) : (
                <>
                  <Sun className="h-3 w-3" />
                  Extérieur
                </>
              )}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-wxll-dark mb-2">{title}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-3">
            <Maximize2 size={16} className="mr-1" />
            <span className="text-sm">{size}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {timeframe && (
              <div className="bg-gray-100 text-wxll-dark text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {timeframe === 'asap' ? 'Dès que possible' : 
                 timeframe === '3months' ? '< 3 mois' : 'Dans l\'année'}
              </div>
            )}
            
            {budget && (
              <div className="bg-wxll-light text-wxll-dark text-xs font-medium px-2 py-1 rounded-full inline-block">
                Budget: {budget}
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-600">Voir le mur</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-wxll-blue group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WallCard;
