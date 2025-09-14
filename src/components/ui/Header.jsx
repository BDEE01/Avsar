import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Job Matching',
      path: '/job-recommendation-form',
      icon: 'Search',
      description: 'Find your perfect job match'
    },
    {
      label: 'Results',
      path: '/job-recommendations-results',
      icon: 'Target',
      description: 'View your recommendations'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/job-recommendation-form');
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-3 transition-smooth hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1"
              aria-label="Avsar AI - Go to home"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon 
                  name="Zap" 
                  size={24} 
                  color="white" 
                  className="drop-shadow-sm"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-foreground tracking-tight">
                  Avsar AI
                </span>
                <span className="text-xs text-text-secondary font-medium -mt-1">
                  Smart Job Matching
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-subtle'
                    : 'text-text-secondary hover:text-foreground hover:bg-muted'
                  }
                `}
                aria-label={item?.description}
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  className={isActivePath(item?.path) ? 'text-primary-foreground' : 'text-current'}
                />
                <span>{item?.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Icon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                size={24} 
              />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="px-2 pt-2 pb-4 space-y-1">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-sm font-medium transition-smooth
                    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                    ${isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-subtle'
                      : 'text-text-secondary hover:text-foreground hover:bg-muted'
                    }
                  `}
                  aria-label={item?.description}
                >
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    className={isActivePath(item?.path) ? 'text-primary-foreground' : 'text-current'}
                  />
                  <div className="flex flex-col items-start">
                    <span>{item?.label}</span>
                    <span className={`text-xs ${isActivePath(item?.path) ? 'text-primary-foreground/80' : 'text-text-secondary'}`}>
                      {item?.description}
                    </span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;