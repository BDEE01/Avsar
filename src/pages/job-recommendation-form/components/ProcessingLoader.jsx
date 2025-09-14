import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingLoader = ({ 
  isVisible = false, 
  onComplete = () => {},
  duration = 3000 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const processingSteps = [
    {
      id: 'analyzing',
      icon: 'Search',
      title: 'Analyzing Your Profile',
      titleHindi: 'आपकी प्रोफ़ाइल का विश्लेषण',
      description: 'Processing your skills and preferences',
      descriptionHindi: 'आपके कौशल और प्राथमिकताओं को संसाधित कर रहे हैं'
    },
    {
      id: 'matching',
      icon: 'Cpu',
      title: 'AI-Powered Matching',
      titleHindi: 'AI-संचालित मैचिंग',
      description: 'Finding the best job matches using advanced algorithms',
      descriptionHindi: 'उन्नत एल्गोरिदम का उपयोग करके सर्वोत्तम नौकरी मैच खोज रहे हैं'
    },
    {
      id: 'ranking',
      icon: 'TrendingUp',
      title: 'Ranking Results',
      titleHindi: 'परिणामों की रैंकिंग',
      description: 'Sorting recommendations by relevance',
      descriptionHindi: 'प्रासंगिकता के आधार पर सिफारिशों को क्रमबद्ध कर रहे हैं'
    },
    {
      id: 'finalizing',
      icon: 'CheckCircle',
      title: 'Finalizing Recommendations',
      titleHindi: 'सिफारिशों को अंतिम रूप दे रहे हैं',
      description: 'Preparing your personalized job matches',
      descriptionHindi: 'आपके व्यक्तिगत नौकरी मैच तैयार कर रहे हैं'
    }
  ];

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    const stepDuration = duration / processingSteps?.length;
    const progressInterval = 50; // Update progress every 50ms
    const progressIncrement = 100 / (stepDuration / progressInterval);

    let currentProgress = 0;
    let currentStepIndex = 0;

    const progressTimer = setInterval(() => {
      currentProgress += progressIncrement;
      
      if (currentProgress >= 100) {
        currentStepIndex++;
        if (currentStepIndex >= processingSteps?.length) {
          clearInterval(progressTimer);
          setTimeout(() => {
            onComplete();
          }, 500);
          return;
        }
        setCurrentStep(currentStepIndex);
        currentProgress = 0;
      }
      
      setProgress(currentProgress);
    }, progressInterval);

    return () => clearInterval(progressTimer);
  }, [isVisible, duration, onComplete]);

  if (!isVisible) return null;

  const currentStepData = processingSteps?.[currentStep];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl shadow-elevated max-w-md w-full p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
            <Icon name="Sparkles" size={32} className="text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            AI Job Matching in Progress
          </h2>
          <p className="text-sm text-text-secondary">
            AI नौकरी मैचिंग प्रगति में है
          </p>
        </div>

        {/* Current Step */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
              <Icon 
                name={currentStepData?.icon} 
                size={24} 
                className="text-primary-foreground animate-pulse" 
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-foreground">
                {currentStepData?.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {currentStepData?.titleHindi}
              </p>
            </div>
          </div>
          
          <p className="text-sm text-foreground mb-2">
            {currentStepData?.description}
          </p>
          <p className="text-xs text-text-secondary">
            {currentStepData?.descriptionHindi}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
            <span>Step {currentStep + 1} of {processingSteps?.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center justify-between">
          {processingSteps?.map((step, index) => (
            <div key={step?.id} className="flex flex-col items-center space-y-2">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center transition-smooth
                ${index < currentStep 
                  ? 'bg-success text-success-foreground' 
                  : index === currentStep 
                  ? 'bg-primary text-primary-foreground animate-pulse' 
                  : 'bg-muted text-text-secondary'
                }
              `}>
                {index < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              <span className={`
                text-xs text-center transition-smooth
                ${index <= currentStep ? 'text-foreground' : 'text-text-secondary'}
              `}>
                {step?.title?.split(' ')?.[0]}
              </span>
            </div>
          ))}
        </div>

        {/* Loading Animation */}
        <div className="mt-8 flex items-center justify-center space-x-2">
          <div className="flex space-x-1">
            {[0, 1, 2]?.map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <span className="text-sm text-text-secondary ml-2">
            Please wait / कृपया प्रतीक्षा करें
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProcessingLoader;