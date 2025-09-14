import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessMessage = ({ message, onContinue, currentLanguage = 'en' }) => {
  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  return (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
        <Icon name="CheckCircle" size={32} className="text-success" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">
          {getLabel('Account Created Successfully!', 'खाता सफलतापूर्वक बनाया गया!')}
        </h3>
        <p className="text-muted-foreground">
          {message || getLabel(
            'Welcome to Avsar AI! Your account has been created and you can now set up your profile.',
            'अवसर AI में आपका स्वागत है! आपका खाता बन गया है और अब आप अपनी प्रोफाइल सेट कर सकते हैं।'
          )}
        </p>
      </div>

      <Button
        onClick={onContinue}
        iconName="ArrowRight"
        iconPosition="right"
        size="lg"
      >
        {getLabel('Continue to Profile Setup', 'प्रोफाइल सेटअप पर जाएं')}
      </Button>
    </div>
  );
};

export default SuccessMessage;