import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Palette, MapPin, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

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
    <>
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
            
            {/* Dashboard Links - seulement si connecté */}
            {isAuthenticated && (
              <>
                <Link 
                  to="/artiste/profil" 
                  className={`relative text-wxll-dark hover:text-wxll-blue transition-colors font-medium py-2 flex items-center gap-1 ${
                    isActive('/artiste/profil') ? 'text-wxll-blue' : ''
                  }`}
                >
                  <User size={16} />
                  Dashboard Artiste
                  {isActive('/artiste/profil') && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-wxll-blue rounded-full"></div>
                  )}
                </Link>
                <Link 
                  to="/proprietaire/profil" 
                  className={`relative text-wxll-dark hover:text-wxll-blue transition-colors font-medium py-2 flex items-center gap-1 ${
                    isActive('/proprietaire/profil') ? 'text-wxll-blue' : ''
                  }`}
                >
                  <Settings size={16} />
                  Dashboard Propriétaire
                  {isActive('/proprietaire/profil') && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-wxll-blue rounded-full"></div>
                  )}
                </Link>
              </>
            )}
            
            {/* Auth Buttons - MODIFIÉ : utilise Link au lieu de modal */}
            <div className="flex items-center space-x-3 ml-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">
                    Bonjour {user?.email?.split('@')[0]}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleLogout}
                    className="text-wxll-dark hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} className="mr-1" />
                    Déconnexion
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-wxll-dark hover:text-wxll-blue hover:bg-wxll-blue/5"
                    >
                      Connexion
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button 
                      size="sm"
                      className="bg-wxll-blue hover:bg-blue-600 shadow-md hover:shadow-lg transition-all"
                    >
                      S'inscrire
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-wxll-dark hover:text-wxll-blue transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md absolute left-0 right-0 shadow-xl border-t animate-fade-in">
            <div className="container


