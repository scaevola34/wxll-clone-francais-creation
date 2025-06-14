
import { Artist as DBartist } from '@/hooks/useArtists';
import { Wall as DBWall } from '@/hooks/useWalls';

// Adapter for Artist data to match ArtistCarousel expectations
export const adaptArtistForCarousel = (artist: DBartist) => ({
  ...artist,
  imageUrl: artist.profile_image_url || '/placeholder.svg'
});

// Adapter for Wall data to match WallCarousel expectations  
export const adaptWallForCarousel = (wall: DBWall) => ({
  ...wall,
  imageUrl: wall.image_url || '/placeholder.svg',
  size: wall.surface_m2 || 0,
  budget: `${wall.width_m || 0}x${wall.height_m || 0}m`
});
