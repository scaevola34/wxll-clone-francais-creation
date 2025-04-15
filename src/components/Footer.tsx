
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-wxll-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">WXLL<span className="text-wxll-blue">SPACE</span></h3>
            <p className="text-gray-300 mb-4">
              La première plateforme française qui connecte les artistes de street art avec des propriétaires de murs.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-wxll-blue">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-wxll-blue">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-wxll-blue">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-wxll-blue transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/artistes" className="text-gray-300 hover:text-wxll-blue transition-colors">
                  Artistes
                </Link>
              </li>
              <li>
                <Link to="/murs" className="text-gray-300 hover:text-wxll-blue transition-colors">
                  Murs
                </Link>
              </li>
              <li>
                <Link to="/comment-ca-marche" className="text-gray-300 hover:text-wxll-blue transition-colors">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-gray-300 hover:text-wxll-blue transition-colors">
                  À propos
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-wxll-blue transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-wxll-blue transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-wxll-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/conditions-generales" className="text-gray-300 hover:text-wxll-blue transition-colors">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link to="/politique-confidentialite" className="text-gray-300 hover:text-wxll-blue transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="text-gray-300 hover:text-wxll-blue transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} WXLLSPACE. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
