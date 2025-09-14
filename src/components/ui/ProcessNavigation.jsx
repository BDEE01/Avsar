import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ProcessNavigation = ({ 
  currentStep = 'form',
  isProcessing = false,
  hasResults = false,
  onNewSearch = null 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    {
      id: 'form',
      label: 'Job Preferences',
      path: '/job-recommendation-form',
      icon: 'FileText',
      description: 'Enter your job criteria'
    },
    {
      id: 'processing',
      label: 'AI Matching',
      path: null,
      icon: 'Cpu',
      description: 'Finding perfect matches'
    },
    {
      id: 'results',
      label: 'Recommendations',
      path: '/job-recommendations-results',
      icon: 'Target',
      description: 'View your job matches'
    }
  ];

  const getCurrentStepIndex = () => {
    if (isProcessing) return 1;
    if (location?.pathname === '/job-recommendations-results') return 2;
    return 0;
  };

  const currentStepIndex = getCurrentStepIndex();

  const handleStepClick = (step, index) => {
    if (!step?.path) return;
    
    // Allow navigation to form anytime
    if (step?.id === 'form') {
      navigate(step?.path);
      return;
    }
    
    // Allow navigation to results only if we have results
    if (step?.id === 'results' && hasResults) {
      navigate(step?.path);
      return;
    }
  };

  const handleNewSearch = () => {
    if (onNewSearch) {
      onNewSearch();
    } else {
      navigate('/job-recommendation-form');
    }
  };

  const isStepAccessible = (step, index) => {
    if (step?.id === 'form') return true;
    if (step?.id === 'results') return hasResults;
    return false;
  };

  const isStepActive = (step, index) => {
    return index === currentStepIndex;
  };

  const isStepCompleted = (step, index) => {
    return index < currentStepIndex;
  };

  return (
    <div className="sticky top-16 z-40 bg-surface border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Progress Steps */}
          <div className="flex items-center space-x-4 sm:space-x-8">
            {steps?.map((step, index) => {
              const isActive = isStepActive(step, index);
              const isCompleted = isStepCompleted(step, index);
              const isAccessible = isStepAccessible(step, index);
              const isClickable = isAccessible && step?.path;

              return (
                <div key={step?.id} className="flex items-center">
                  {/* Step Indicator */}
                  <div className="flex items-center">
                    <button
                      onClick={() => isClickable && handleStepClick(step, index)}
                      disabled={!isClickable}
                      className={`
                        flex items-center justify-center w-10 h-10 rounded-full border-2 transition-smooth
                        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                        ${isActive
                          ? 'bg-primary border-primary text-primary-foreground shadow-subtle'
                          : isCompleted
                          ? 'bg-success border-success text-success-foreground'
                          : isAccessible
                          ? 'border-border bg-background text-text-secondary hover:border-primary hover:text-primary cursor-pointer' :'border-border bg-muted text-text-secondary cursor-not-allowed'
                        }
                      `}
                      aria-label={`${step?.label}: ${step?.description}`}
                      aria-current={isActive ? 'step' : undefined}
                    >
                      {isProcessing && isActive ? (
                        <Icon 
                          name="Loader2" 
                          size={20} 
                          className="animate-spin text-primary-foreground" 
                        />
                      ) : isCompleted ? (
                        <Icon 
                          name="Check" 
                          size={20} 
                          className="text-success-foreground" 
                        />
                      ) : (
                        <Icon 
                          name={step?.icon} 
                          size={20} 
                          className="text-current" 
                        />
                      )}
                    </button>

                    {/* Step Label - Hidden on mobile */}
                    <div className="hidden sm:block ml-3">
                      <div className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-text-secondary'}`}>
                        {step?.label}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {step?.description}
                      </div>
                    </div>
                  </div>
                  {/* Connector Line */}
                  {index < steps?.length - 1 && (
                    <div className={`
                      hidden sm:block w-12 h-0.5 mx-4 transition-smooth
                      ${index < currentStepIndex ? 'bg-success' : 'bg-border'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {hasResults && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleNewSearch}
                iconName="RotateCcw"
                iconPosition="left"
                className="hidden sm:flex"
              >
                New Search
              </Button>
            )}
            
            {/* Mobile New Search Button */}
            {hasResults && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleNewSearch}
                className="sm:hidden"
                aria-label="Start new search"
              >
                <Icon name="RotateCcw" size={18} />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Step Labels */}
        <div className="sm:hidden pb-2">
          <div className="text-center">
            <div className="text-sm font-medium text-foreground">
              {steps?.[currentStepIndex]?.label}
            </div>
            <div className="text-xs text-text-secondary">
              {steps?.[currentStepIndex]?.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessNavigation;