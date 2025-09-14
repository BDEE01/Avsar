import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  const currentLang = languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];

  return (
    <div className="absolute top-4 right-4">
      <div className="relative group">
        <Button
          variant="ghost"
          size="sm"
          iconName="Globe"
          iconPosition="left"
          className="text-text-secondary hover:text-text-primary"
        >
          <span className="mr-1">{currentLang?.flag}</span>
          {currentLang?.name}
        </Button>
        
        <div className="absolute right-0 top-full mt-2 w-40 bg-surface border border-border rounded-lg shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="py-2">
            {languages?.map((lang) => (
              <button
                key={lang?.code}
                onClick={() => onLanguageChange(lang?.code)}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                  currentLanguage === lang?.code
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <span>{lang?.flag}</span>
                <span>{lang?.name}</span>
                {currentLanguage === lang?.code && (
                  <Icon name="Check" size={16} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;