import React from 'react';
import { Link } from 'react-router-dom';

interface ArtistCardProps {
  id: string;
  name: string;
  style: string;
  location: string;
  imageUrl: string;
  rating?: number;
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  id,
  name,
  style,
  location,
  imageUrl,
  rating = 4.8, // valeur par défaut si non fournie
}) => {
  return (
    <Link to={`/artistes/${id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        {/* Image de couverture */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={imageUrl}
            alt={`Oeuvre de ${name}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Localisation, bien visible en bas à gauche */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 px-3 py-1 rounded text-white text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 8c-4-4-6-6.5-6-9a6 6 0 1112 0c0 2.5-2 5-6 9z"
              />
            </svg>
            <span>{location}</span>
          </div>
          {/* Note étoile, en bas à droite */}
          <div className="absolute bottom-4 right-4 flex items-center bg-black/60 px-2 py-1 rounded text-yellow-400 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.538 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.783.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.287-3.967z" />
            </svg>
            <span>{rating}</span>
          </div>
        </div>
        {/* Infos sous la photo, sans avatar */}
        <div className="px-4 pt-4">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-gray-600">{style}</p>
        </div>
        {/* Zone d'action */}
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



