import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginRedirect = ({ currentLanguage = 'en' }) => {
  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center space-x-4">
        <div className="flex-1 h-px bg-border"></div>
        <span className="text-sm text-muted-foreground px-4">
          {getLabel('Already have an account?', 'पहले से खाता है?')}
        </span>
        <div className="flex-1 h-px bg-border"></div>
      </div>
      
      <Link
        to="/user-login"
        className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium transition-micro"
      >
        <Icon name="LogIn" size={16} />
        <span>{getLabel('Sign in to your account', 'अपने खाते में साइन इन करें')}</span>
      </Link>
    </div>
  );
};

export default LoginRedirect;