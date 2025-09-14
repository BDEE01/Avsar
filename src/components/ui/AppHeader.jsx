import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AppHeader = ({ isAuthenticated = false, onLanguageChange, currentLanguage = 'en' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/recommendations-dashboard', label: 'Dashboard', labelHi: 'डैशबोर्ड' },
    { path: '/profile-setup', label: 'Profile', labelHi: 'प्रोफाइल' },
    { path: '/profile-management', label: 'Settings', labelHi: 'सेटिंग्स' },
  ];

  const authItems = [
    { path: '/user-login', label: 'Login', labelHi: 'लॉगिन' },
    { path: '/user-registration', label: 'Register', labelHi: 'रजिस्टर' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    if (onLanguageChange) {
      onLanguageChange(newLanguage);
    }
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const getLabel = (item) => {
    return currentLanguage === 'hi' ? item?.labelHi : item?.label;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={isAuthenticated ? '/recommendations-dashboard' : '/'} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-foreground">
                Avsar AI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-micro ${
                      isActivePath(item?.path)
                        ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {getLabel(item)}
                  </Link>
                ))}
              </>
            ) : (
              <>
                {authItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-micro ${
                      isActivePath(item?.path)
                        ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {getLabel(item)}
                  </Link>
                ))}
              </>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLanguageToggle}
              className="hidden sm:flex"
            >
              <Icon name="Globe" size={16} className="mr-1" />
              {currentLanguage === 'en' ? 'हिं' : 'EN'}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="md:hidden"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-micro ${
                      isActivePath(item?.path)
                        ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {getLabel(item)}
                  </Link>
                ))}
              </>
            ) : (
              <>
                {authItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-micro ${
                      isActivePath(item?.path)
                        ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {getLabel(item)}
                  </Link>
                ))}
              </>
            )}
            
            {/* Mobile Language Toggle */}
            <button
              onClick={handleLanguageToggle}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-micro"
            >
              <Icon name="Globe" size={16} className="inline mr-2" />
              {currentLanguage === 'en' ? 'Switch to Hindi' : 'Switch to English'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default AppHeader;