import React from "react";
import { Link, useLocation } from "react-router-dom";

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

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          WXLL<span className="text-sky-400">SPACE</span>
        </Link>
        <div className="flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-2 py-1 font-medium transition-colors ${
                location.pathname === link.to
                  ? "text-sky-400 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-sky-400 after:rounded"
                  : "text-gray-800 hover:text-sky-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="ml-4 text-gray-700 hover:text-sky-400 transition-colors"
          >
            Connexion
          </Link>
          <Link
            to="/register"
            className="ml-2 px-4 py-2 bg-sky-400 text-white rounded-full font-semibold shadow hover:bg-sky-500 transition-all"
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
