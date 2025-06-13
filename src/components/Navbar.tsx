
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/artistes", label: "Artistes" },
  { to: "/murs", label: "Murs" },
  { to: "/comment-ca-marche", label: "Comment ça marche ?" },
  { to: "/a-propos", label: "À propos" },
  { to: "/faq", label: "FAQ" }
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-3">
        {/* Desktop Navigation */}
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold text-gray-900 hover:text-wxll-blue transition-colors"
            onClick={closeMobileMenu}
          >
            WXLL<span className="text-wxll-blue">SPACE</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3 py-2 font-medium transition-all duration-300 rounded-lg ${
                  location.pathname === link.to
                    ? "text-wxll-blue bg-wxll-blue/10 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-wxll-blue after:rounded"
                    : "text-gray-700 hover:text-wxll-blue hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              className="ml-4 text-gray-700 hover:text-wxll-blue transition-colors font-medium px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="ml-2 px-6 py-2 bg-wxll-blue text-white rounded-full font-semibold shadow-md hover:bg-blue-600 transition-all transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              S'inscrire
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}>
          <div className="py-4 space-y-2 border-t border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                  location.pathname === link.to
                    ? "text-wxll-blue bg-wxll-blue/10 border-l-4 border-wxll-blue"
                    : "text-gray-700 hover:text-wxll-blue hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-4 border-gray-200" />
            <Link
              to="/login"
              onClick={closeMobileMenu}
              className="block px-4 py-3 text-gray-700 hover:text-wxll-blue hover:bg-gray-50 rounded-lg font-medium transition-colors"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              onClick={closeMobileMenu}
              className="block mx-4 mt-2 px-6 py-3 bg-wxll-blue text-white rounded-lg font-semibold text-center shadow-md hover:bg-blue-600 transition-colors"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
