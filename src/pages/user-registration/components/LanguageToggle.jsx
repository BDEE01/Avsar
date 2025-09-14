import React from 'react';
import Button from '../../../components/ui/Button';


const LanguageToggle = ({ currentLanguage, onLanguageChange }) => {
  const handleToggle = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    onLanguageChange(newLanguage);
  };

  return (
    <div className="flex justify-center mb-6">
      <Button
        variant="outline"
        size="sm"
        onClick={handleToggle}
        iconName="Globe"
        iconPosition="left"
      >
        {currentLanguage === 'en' ? 'हिंदी में देखें' : 'View in English'}
      </Button>
    </div>
  );
};

export default LanguageToggle;