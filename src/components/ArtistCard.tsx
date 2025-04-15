
import React from 'react';
import { Link } from 'react-router-dom';

interface ArtistCardProps {
  id: string;
  name: string;
  style: string;
  location: string;
  imageUrl: string;
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  id,
  name,
  style,
  location,
  imageUrl,
}) => {
  return (
    <Link to={`/artistes/${id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-64 overflow-hidden">
          <img
            src={imageUrl}
            alt={`Oeuvre de ${name}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm opacity-90">{location}</p>
          </div>
        </div>
        <div className="p-4">
          <span className="inline-block bg-wxll-light text-wxll-dark text-xs font-medium px-3 py-1 rounded-full">
            {style}
          </span>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-600">Voir le profil</span>
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

export default ArtistCard;
