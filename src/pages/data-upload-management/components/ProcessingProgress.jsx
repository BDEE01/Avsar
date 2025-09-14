import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingProgress = ({ progress, currentStep, isVisible }) => {
  const steps = [
    { id: 'parsing', label: 'Parsing CSV Data', icon: 'FileText' },
    { id: 'validation', label: 'Validating Records', icon: 'CheckCircle' },
    { id: 'vectorization', label: 'TF-IDF Vectorization', icon: 'Zap' },
    { id: 'indexing', label: 'Updating Database', icon: 'Database' },
    { id: 'complete', label: 'Processing Complete', icon: 'Check' }
  ];

  if (!isVisible) return null;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">Processing Status</h3>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-text-secondary mt-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
      </div>
      <div className="space-y-4">
        {steps?.map((step, index) => {
          const isActive = currentStep === step?.id;
          const isCompleted = steps?.findIndex(s => s?.id === currentStep) > index;
          const isPending = steps?.findIndex(s => s?.id === currentStep) < index;

          return (
            <div key={step?.id} className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isCompleted
                    ? 'bg-success text-success-foreground'
                    : isActive
                    ? 'bg-primary text-primary-foreground animate-pulse'
                    : 'bg-muted text-text-secondary'
                }`}
              >
                {isCompleted ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              <div className="flex-1">
                <div
                  className={`font-medium ${
                    isCompleted
                      ? 'text-success'
                      : isActive
                      ? 'text-primary'
                      : isPending
                      ? 'text-text-secondary' :'text-text-primary'
                  }`}
                >
                  {step?.label}
                </div>
                {isActive && (
                  <div className="text-sm text-text-secondary">In progress...</div>
                )}
                {isCompleted && (
                  <div className="text-sm text-success">Completed</div>
                )}
              </div>
              {isActive && (
                <div className="w-4 h-4">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessingProgress;