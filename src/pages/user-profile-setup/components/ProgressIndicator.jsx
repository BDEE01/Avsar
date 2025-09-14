import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, completedSteps }) => {
  const steps = [
    { id: 1, name: 'Education', icon: 'GraduationCap' },
    { id: 2, name: 'Skills', icon: 'Code' },
    { id: 3, name: 'Interests', icon: 'Target' },
    { id: 4, name: 'Location', icon: 'MapPin' }
  ];

  return (
    <div className="bg-card rounded-lg p-6 mb-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Profile Setup Progress</h2>
        <span className="text-sm text-text-secondary">
          {completedSteps?.length} of {totalSteps} completed
        </span>
      </div>
      <div className="flex items-center space-x-4">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex flex-col items-center space-y-2">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-smooth ${
                  completedSteps?.includes(step?.id)
                    ? 'bg-success text-success-foreground'
                    : currentStep === step?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary'
                }`}
              >
                {completedSteps?.includes(step?.id) ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name={step?.icon} size={20} />
                )}
              </div>
              <span
                className={`text-xs font-medium ${
                  currentStep === step?.id ? 'text-primary' : 'text-text-secondary'
                }`}
              >
                {step?.name}
              </span>
            </div>
            
            {index < steps?.length - 1 && (
              <div
                className={`flex-1 h-0.5 ${
                  completedSteps?.includes(step?.id) && completedSteps?.includes(steps?.[index + 1]?.id)
                    ? 'bg-success' :'bg-border'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-4 bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-smooth"
          style={{ width: `${(completedSteps?.length / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;