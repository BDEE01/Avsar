import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginFooter = ({ currentLanguage = 'en' }) => {
  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  const currentYear = new Date()?.getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-foreground">
                Avsar AI
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {getLabel(
                'Connecting youth with meaningful internship opportunities through AI-powered recommendations.',
                'एआई-संचालित सिफारिशों के माध्यम से युवाओं को सार्थक इंटर्नशिप अवसरों से जोड़ना।'
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {getLabel('Quick Links', 'त्वरित लिंक')}
            </h3>
            <div className="space-y-2">
              <Link
                to="/user-registration"
                className="block text-sm text-muted-foreground hover:text-foreground transition-micro"
              >
                {getLabel('Create Account', 'खाता बनाएं')}
              </Link>
              <Link
                to="/user-login"
                className="block text-sm text-muted-foreground hover:text-foreground transition-micro"
              >
                {getLabel('Sign In', 'साइन इन करें')}
              </Link>
              <button
                onClick={() => {
                  alert(getLabel(
                    'Help section coming soon!',
                    'सहायता अनुभाग जल्द आ रहा है!'
                  ));
                }}
                className="block text-sm text-muted-foreground hover:text-foreground transition-micro"
              >
                {getLabel('Help & Support', 'सहायता और समर्थन')}
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {getLabel('Contact', 'संपर्क')}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Mail" size={14} />
                <span>support@avsarai.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Phone" size={14} />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="MapPin" size={14} />
                <span>
                  {getLabel('Mumbai, India', 'मुंबई, भारत')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Avsar AI. {getLabel('All rights reserved.', 'सभी अधिकार सुरक्षित।')}
            </p>
            
            <div className="flex items-center space-x-6">
              <button
                onClick={() => {
                  alert(getLabel(
                    'Privacy Policy coming soon!',
                    'गोपनीयता नीति जल्द आ रही है!'
                  ));
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-micro"
              >
                {getLabel('Privacy Policy', 'गोपनीयता नीति')}
              </button>
              <button
                onClick={() => {
                  alert(getLabel(
                    'Terms of Service coming soon!',
                    'सेवा की शर्तें जल्द आ रही हैं!'
                  ));
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-micro"
              >
                {getLabel('Terms of Service', 'सेवा की शर्तें')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LoginFooter;