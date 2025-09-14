import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingState = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Loading Header */}
      <div className="text-center py-8 mb-8">
        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
          <Icon name="Cpu" size={32} className="text-primary animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          AI is Finding Your Perfect Matches
        </h2>
        <p className="text-text-secondary">
          Analyzing your profile and matching with thousands of opportunities...
        </p>
      </div>
      {/* Progress Indicators */}
      <div className="space-y-4 mb-8">
        {[
          { step: 'Processing your skills and preferences', completed: true },
          { step: 'Analyzing job market data', completed: true },
          { step: 'Calculating similarity scores', completed: false },
          { step: 'Ranking best matches', completed: false }
        ]?.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`
              flex items-center justify-center w-6 h-6 rounded-full
              ${item?.completed 
                ? 'bg-success text-success-foreground' 
                : 'bg-muted text-text-secondary'
              }
            `}>
              {item?.completed ? (
                <Icon name="Check" size={14} />
              ) : (
                <Icon name="Loader2" size={14} className="animate-spin" />
              )}
            </div>
            <span className={`text-sm ${item?.completed ? 'text-foreground' : 'text-text-secondary'}`}>
              {item?.step}
            </span>
          </div>
        ))}
      </div>
      {/* Loading Skeleton Cards */}
      <div className="space-y-6">
        {[1, 2, 3]?.map((index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                <div className="flex space-x-4">
                  <div className="h-3 bg-muted rounded w-20"></div>
                  <div className="h-3 bg-muted rounded w-24"></div>
                  <div className="h-3 bg-muted rounded w-16"></div>
                </div>
              </div>
              <div className="h-8 bg-muted rounded-full w-20"></div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {[1, 2, 3, 4]?.map((skillIndex) => (
                <div key={skillIndex} className="h-6 bg-muted rounded w-16"></div>
              ))}
            </div>
            
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        ))}
      </div>
      {/* Fun Facts */}
      <div className="mt-8 bg-surface border border-border rounded-lg p-6 text-center">
        <Icon name="Lightbulb" size={24} className="text-accent mx-auto mb-2" />
        <p className="text-sm text-text-secondary">
          <strong>Did you know?</strong> Our AI analyzes over 50 different factors 
          to find your perfect job match, including skills compatibility, 
          location preferences, and career growth potential.
        </p>
      </div>
    </div>
  );
};

export default LoadingState;