import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ErrorMessage = ({ message, onRetry, onDismiss, currentLanguage = 'en' }) => {
  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  return (
    <div className="bg-error/10 border border-error/20 rounded-lg p-4 space-y-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Icon name="AlertCircle" size={20} className="text-error" />
        </div>
        <div className="flex-1 space-y-2">
          <h4 className="font-medium text-error">
            {getLabel('Registration Failed', 'पंजीकरण असफल')}
          </h4>
          <p className="text-sm text-error/80">
            {message || getLabel(
              'There was an error creating your account. Please try again.',
              'आपका खाता बनाने में त्रुटि हुई। कृपया पुनः प्रयास करें।'
            )}
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-end space-x-3">
        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
          >
            {getLabel('Dismiss', 'खारिज करें')}
          </Button>
        )}
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            iconName="RefreshCw"
            iconPosition="left"
          >
            {getLabel('Try Again', 'पुनः प्रयास करें')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;