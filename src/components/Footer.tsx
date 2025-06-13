
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-wxll-dark text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Section principale avec espacement amélioré */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-6">
              WXLL<span className="text-wxll-blue">SPACE</span>
            </h3>
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              La première plateforme française qui connecte les artistes de street art avec des propriétaires de murs.
            </p>
            <div className="flex space-x-6">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-wxll-blue transition-colors transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-wxll-blue transition-colors transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-wxll-blue transition-colors transform hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>
          
          {/* Navigation avec espacement mobile amélioré */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-6 text-white">Navigation</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-wxll-blue transition-colors text-lg leading-relaxed block py-1">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/artistes" className="text-gray-300 hover:text-wxll-blue transition-colors text-lg leading-relaxed block py-1">
                  Artistes
                </Link>
              </li>
              <li>
                <Link to="/murs" className="text-gray-300 hover:text-wxll-blue transition-colors text-lg leading-relaxed block py-1">
                  Murs
                </Link>
              </li>
              <li>
                <Link to="/comment-ca-marche" className="text-gray-300 hover:text-wxll-blue transition-colors text-lg leading-relaxed block py-1">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-gray-300 hover:text-wxll-blue transition-colors text-lg leading-relaxed block py-1">
                  À propos
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Ressources avec espacement */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-6 text-white">Ressources</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-wxll-blue transition-colors text-lg leading-relaxed block py-1">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-wxll-blue transition-colors text-lg leading-relaxed block py-1">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-wxll-blue transition-colors text-lg leading-relaxed block py-1">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Légal avec espacement */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-6 text-white">Légal</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/conditions-generales" className="text-gray-300 hover:text-wxll-blue transition-colors text-lg leading-relaxed block py-1">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link to="/politique-confidentialite" className="text-gray-300 hover:text-wxll-blue transition-colors text-lg leading-relaxed block py-1">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="text-gray-300 hover:text-wxll-blue transition-colors text-lg leading-relaxed block py-1">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright avec espacement amélioré */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-lg">
            &copy; {new Date().getFullYear()} WXLLSPACE. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
