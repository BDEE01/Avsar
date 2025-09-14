import React from 'react';
import { Link } from 'react-router-dom';


const LoginHeader = ({ currentLanguage = 'en' }) => {
  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
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

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/user-registration"
              className="text-muted-foreground hover:text-foreground transition-micro"
            >
              {getLabel('Register', 'रजिस्टर करें')}
            </Link>
            <Link
              to="/user-login"
              className="text-primary font-medium"
            >
              {getLabel('Login', 'लॉगिन')}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Link
              to="/user-registration"
              className="text-muted-foreground hover:text-foreground transition-micro text-sm"
            >
              {getLabel('Register', 'रजिस्टर करें')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;