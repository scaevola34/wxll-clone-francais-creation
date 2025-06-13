
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, MessageCircle, FolderOpen, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, userType, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActivePath = (path: string) => location.pathname === path;

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/artistes', label: 'Artistes' },
    { href: '/murs', label: 'Murs' },
    { href: '/comment-ca-marche', label: 'Comment ça marche' },
    { href: '/a-propos', label: 'À propos' },
    { href: '/faq', label: 'FAQ' },
  ];

  const authenticatedLinks = [
    { href: '/messages', label: 'Messages', icon: MessageCircle },
    { href: '/mes-projets', label: 'Mes Projets', icon: FolderOpen },
    { 
      href: userType === 'artist' ? '/dashboard/artiste' : '/dashboard/proprietaire', 
      label: 'Dashboard' 
    },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              WXLLSPACE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                  isActivePath(link.href) 
                    ? 'text-purple-600 border-b-2 border-purple-600 pb-1' 
                    : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Authenticated Navigation */}
                <div className="flex items-center space-x-4">
                  {authenticatedLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-purple-600 ${
                          isActivePath(link.href) 
                            ? 'text-purple-600' 
                            : 'text-gray-700'
                        }`}
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {link.label}
                      </Link>
                    );
                  })}
                </div>

                {/* Notifications */}
                <NotificationBell />

                {/* Logout */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="flex items-center gap-2 text-gray-700 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Se connecter
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    S'inscrire
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-6">
                {/* Main Navigation */}
                <div className="space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block text-lg font-medium transition-colors hover:text-purple-600 ${
                        isActivePath(link.href) 
                          ? 'text-purple-600' 
                          : 'text-gray-900'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Authenticated Navigation */}
                {isAuthenticated && (
                  <>
                    <hr className="border-gray-200" />
                    <div className="space-y-4">
                      {authenticatedLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.href}
                            to={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 text-lg font-medium transition-colors hover:text-purple-600 ${
                              isActivePath(link.href) 
                                ? 'text-purple-600' 
                                : 'text-gray-900'
                            }`}
                          >
                            {Icon && <Icon className="h-5 w-5" />}
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* Mobile Actions */}
                <hr className="border-gray-200" />
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Notifications</span>
                      <NotificationBell />
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Déconnexion
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Se connecter
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        S'inscrire
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
