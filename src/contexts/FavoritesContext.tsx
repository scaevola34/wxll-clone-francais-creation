
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FavoritesContextType {
  favoriteArtists: string[];
  favoriteWalls: string[];
  toggleArtistFavorite: (artistId: string) => void;
  toggleWallFavorite: (wallId: string) => void;
  isArtistFavorite: (artistId: string) => boolean;
  isWallFavorite: (wallId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favoriteArtists, setFavoriteArtists] = useState<string[]>([]);
  const [favoriteWalls, setFavoriteWalls] = useState<string[]>([]);

  const toggleArtistFavorite = (artistId: string) => {
    setFavoriteArtists(prev => 
      prev.includes(artistId) 
        ? prev.filter(id => id !== artistId)
        : [...prev, artistId]
    );
  };

  const toggleWallFavorite = (wallId: string) => {
    setFavoriteWalls(prev => 
      prev.includes(wallId) 
        ? prev.filter(id => id !== wallId)
        : [...prev, wallId]
    );
  };

  const isArtistFavorite = (artistId: string) => favoriteArtists.includes(artistId);
  const isWallFavorite = (wallId: string) => favoriteWalls.includes(wallId);

  return (
    <FavoritesContext.Provider value={{
      favoriteArtists,
      favoriteWalls,
      toggleArtistFavorite,
      toggleWallFavorite,
      isArtistFavorite,
      isWallFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
