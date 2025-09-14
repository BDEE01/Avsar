import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileStepIndicator = ({ currentStep, totalSteps, currentLanguage = 'en' }) => {
  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  const stepLabels = [
    { en: 'Personal Info', hi: 'व्यक्तिगत जानकारी' },
    { en: 'Education', hi: 'शिक्षा' },
    { en: 'Skills', hi: 'कौशल' },
    { en: 'Location', hi: 'स्थान' },
    { en: 'Review', hi: 'समीक्षा' }
  ];

  return (
    <div className="w-full mb-8">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-foreground">
          {getLabel(`Step ${currentStep} of ${totalSteps}`, `चरण ${currentStep} का ${totalSteps}`)}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round((currentStep / totalSteps) * 100)}% {getLabel('complete', 'पूर्ण')}
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 mb-6">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      {/* Step Indicators */}
      <div className="flex items-center justify-between">
        {stepLabels?.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={stepNumber} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  isCompleted
                    ? 'bg-primary text-primary-foreground'
                    : isCurrent
                    ? 'bg-primary/20 text-primary border-2 border-primary' :'bg-muted text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <Icon name="Check" size={16} />
                ) : (
                  stepNumber
                )}
              </div>
              <span className={`text-xs mt-2 text-center max-w-16 ${
                isCurrent ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}>
                {getLabel(step?.en, step?.hi)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileStepIndicator;