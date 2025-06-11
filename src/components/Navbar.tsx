import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Palette, MapPin, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, userType, isAuthenticated, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
        : 'bg-white/90 backdrop-blur-sm shadow-sm py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-wxll-dark hover:opacity-80 transition-opacity">
          WXLL<span className="text-wxll-blue">SPACE</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`relative text-wxll-dark hover:text-wxll-blue transition-colors font-medium py-2 ${
              isActive('/') ? 'text-wxll-blue' : ''
            }`}
          >
            Accueil
            {isActive('/') && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-wxll-blue rounded-full"></div>
            )}
          </Link>
          <Link 
            to="/artistes" 
            className={`relative text-wxll-dark hover:text-wxll-blue transition-colors font-medium py-2 ${
              isActive('/artistes') ? 'text-wxll-blue' : ''
            }`}
          >
            Artistes
            {isActive('/artistes') && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-wxll-blue rounded-full"></div>
            )}
          </Link>
          <Link 
            to="/murs" 
            className={`relative text-wxll-dark hover:text-wxll-blue transition-colors font-medium py-2 ${
              isActive('/murs') ? 'text-wxll-blue' : ''
            }`}
          >
            Murs
            {isActive('/murs') && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-wxll-blue rounded-full"></div>
            )}
          </Link>
          <Link 
            to="/comment-ca-marche" 
            className={`relative text-wxll-dark hover:text-wxll-blue transition-colors font-medium py-2 ${
              isActive('/comment-ca-marche') ? 'text-wxll-blue' : ''
            }`}
          >
            Comment ça marche
            {isActive('/comment-ca-marche') && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-wxll-blue rounded-full"></div>
            )}
          </Link>
          
          {/* Dashboard Links - seulement le bon type si connecté */}
          {isAuthenticated && userType && (
            <>
              {userType === 'artist' && (
                <Link 
                  to="/artiste/profil" 
                  className={`relative text-wxll-dark hover:text-wxll-blue transition-colors font-medium py-2 flex items-center gap-1 ${
                    isActive('/artiste/profil') ? 'text-wxll-blue' : ''
                  }`}
                >
                  <User size={16} />
                  Mon Dashboard
                  {isActive('/artiste/profil') && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-wxll-blue rounded-full"></div>
                  )}
                </Link>
              )}
              
              {userType === 'owner' && (
                <Link 
                  to="/proprietaire/profil" 
                  className={`relative text-wxll-dark hover:text-wxll-blue transition-colors font-medium py-2 flex items-center gap-1 ${
                    isActive('/proprietaire/profil') ? 'text-wxll-blue' : ''
                  }`}
                >
                  <Settings size={16} />
                  Mon Dashboard
                  {isActive('/proprietaire/profil') && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-wxll-blue rounded-full"></div>
                  )}
                </Link>
              )}
            </>
          )}
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-3 ml-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  Bonjour {user?.email?.split('@')[0]}
                </span>
                <Button




