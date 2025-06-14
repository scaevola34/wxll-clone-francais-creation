
import { Artist as DBartist } from '@/hooks/useArtists';
import { Wall as DBWall } from '@/hooks/useWalls';

// Adapter for Artist data to match ArtistCarousel expectations
export const adaptArtistForCarousel = (artist: DBartist) => ({
  ...artist,
  imageUrl: artist.profile_image_url || '/placeholder.svg',
  style: artist.style || 'Artiste', // Provide default value for required style property
  location: artist.location || 'Non spécifié', // Provide default for required location
  rating: 4.8, // Default rating since it's expected by carousel
  specialties: artist.style ? [artist.style] : ['Art urbain'], // Convert style to specialties array
  projectsCount: artist.projects_count || 0
});

// Adapter for Wall data to match WallCarousel expectations  
export const adaptWallForCarousel = (wall: DBWall) => ({
  ...wall,
  imageUrl: wall.image_url || '/placeholder.svg',
  size: `${wall.surface_m2 || 0}m²`, // Convert number to string with unit
  budget: `${wall.width_m || 0}x${wall.height_m || 0}m`, // Keep as dimension string
  title: wall.title || wall.Name || 'Mur disponible', // Provide default title
  location: wall.location || 'Non spécifié', // Provide default location
  surface_type: wall.type || undefined, // Map type to surface_type
  indoor: wall.indoor,
  owner_type: wall.owner_type
});
