
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Maximize2 } from 'lucide-react';

interface WallCardProps {
  id: string;
  title: string;
  location: string;
  size: string;
  imageUrl: string;
  budget?: string;
}

const WallCard: React.FC<WallCardProps> = ({
  id,
  title,
  location,
  size,
  imageUrl,
  budget,
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
          {budget && (
            <div className="mt-2 bg-wxll-light text-wxll-dark text-sm font-medium px-3 py-1 rounded-full inline-block">
              Budget: {budget}
            </div>
          )}
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
