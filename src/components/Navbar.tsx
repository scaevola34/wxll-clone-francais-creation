
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Palette, MapPin } from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState('login');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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

  const openAuth = (tab: string = 'login') => {
    setAuthInitialTab(tab);
    setShowAuthModal(true);
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
            
            {/* CTA Buttons */}
            <div className="flex items-center space-x-3 ml-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => openAuth('login')}
                className="text-wxll-dark hover:text-wxll-blue hover:bg-wxll-blue/5"
              >
                Connexion
              </Button>
              <Button 
                size="sm"
                className="bg-wxll-blue hover:bg-blue-600 shadow-md hover:shadow-lg transition-all"
                onClick={() => openAuth('register')}
              >
                S'inscrire
              </Button>
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
            <div className="container mx-auto px-4 py-6">
              {/* Navigation Links */}
              <div className="space-y-4 mb-6">
                <Link 
                  to="/" 
                  className={`block py-3 px-4 rounded-lg transition-colors font-medium ${
                    isActive('/') 
                      ? 'bg-wxll-blue text-white' 
                      : 'text-wxll-dark hover:bg-wxll-blue/10 hover:text-wxll-blue'
                  }`}
                  onClick={toggleMenu}
                >
                  🏠 Accueil
                </Link>
                <Link 
                  to="/artistes" 
                  className={`block py-3 px-4 rounded-lg transition-colors font-medium ${
                    isActive('/artistes') 
                      ? 'bg-wxll-blue text-white' 
                      : 'text-wxll-dark hover:bg-wxll-blue/10 hover:text-wxll-blue'
                  }`}
                  onClick={toggleMenu}
                >
                  🎨 Artistes
                </Link>
                <Link 
                  to="/murs" 
                  className={`block py-3 px-4 rounded-lg transition-colors font-medium ${
                    isActive('/murs') 
                      ? 'bg-wxll-blue text-white' 
                      : 'text-wxll-dark hover:bg-wxll-blue/10 hover:text-wxll-blue'
                  }`}
                  onClick={toggleMenu}
                >
                  🧱 Murs
                </Link>
                <Link 
                  to="/comment-ca-marche" 
                  className={`block py-3 px-4 rounded-lg transition-colors font-medium ${
                    isActive('/comment-ca-marche') 
                      ? 'bg-wxll-blue text-white' 
                      : 'text-wxll-dark hover:bg-wxll-blue/10 hover:text-wxll-blue'
                  }`}
                  onClick={toggleMenu}
                >
                  ❓ Comment ça marche
                </Link>
              </div>
              
              {/* Mobile CTA Buttons */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <Button 
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => {
                    toggleMenu();
                    openAuth('login');
                  }}
                >
                  Connexion
                </Button>
                
                <div className="grid grid-cols-1 gap-3">
                  <Button 
                    className="w-full bg-wxll-blue hover:bg-blue-600 justify-start"
                    onClick={() => {
                      toggleMenu();
                      openAuth('register');
                    }}
                  >
                    <Palette className="mr-2 h-4 w-4" />
                    Je suis artiste
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full border-wxll-blue text-wxll-blue hover:bg-wxll-blue hover:text-white justify-start"
                    onClick={() => {
                      toggleMenu();
                      openAuth('register');
                    }}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    J'ai un mur
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialTab={authInitialTab}
      />
    </>
  );
};

export default Navbar;
