
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState('login');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openAuth = (tab: string = 'login') => {
    setAuthInitialTab(tab);
    setShowAuthModal(true);
  };

  return (
    <>
      <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-wxll-dark">
            WXLL<span className="text-wxll-blue">SPACE</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-wxll-dark hover:text-wxll-blue transition-colors">
              Accueil
            </Link>
            <Link to="/artistes" className="text-wxll-dark hover:text-wxll-blue transition-colors">
              Artistes
            </Link>
            <Link to="/murs" className="text-wxll-dark hover:text-wxll-blue transition-colors">
              Murs
            </Link>
            <Link to="/comment-ca-marche" className="text-wxll-dark hover:text-wxll-blue transition-colors">
              Comment ça marche
            </Link>
            <Link to="/a-propos" className="text-wxll-dark hover:text-wxll-blue transition-colors">
              À propos
            </Link>
            <Button className="btn-primary" onClick={() => openAuth('login')}>
              Connexion
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-wxll-dark"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white absolute left-0 right-0 py-4 shadow-md z-40 animate-fade-in">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-wxll-dark hover:text-wxll-blue transition-colors py-2"
                onClick={toggleMenu}
              >
                Accueil
              </Link>
              <Link 
                to="/artistes" 
                className="text-wxll-dark hover:text-wxll-blue transition-colors py-2"
                onClick={toggleMenu}
              >
                Artistes
              </Link>
              <Link 
                to="/murs" 
                className="text-wxll-dark hover:text-wxll-blue transition-colors py-2"
                onClick={toggleMenu}
              >
                Murs
              </Link>
              <Link 
                to="/comment-ca-marche" 
                className="text-wxll-dark hover:text-wxll-blue transition-colors py-2"
                onClick={toggleMenu}
              >
                Comment ça marche
              </Link>
              <Link 
                to="/a-propos" 
                className="text-wxll-dark hover:text-wxll-blue transition-colors py-2"
                onClick={toggleMenu}
              >
                À propos
              </Link>
              <Button 
                className="btn-primary w-full"
                onClick={() => {
                  toggleMenu();
                  openAuth('login');
                }}
              >
                Connexion
              </Button>
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
