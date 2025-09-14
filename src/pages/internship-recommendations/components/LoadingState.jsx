import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingState = () => {
  return (
    <div className="space-y-6">
      {/* Loading Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4 shadow-soft animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-lg"></div>
              <div className="flex-1">
                <div className="h-3 bg-muted rounded w-16 mb-2"></div>
                <div className="h-5 bg-muted rounded w-12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Loading Message */}
      <div className="text-center py-8">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
          <Icon name="Loader2" size={24} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">Finding your perfect matches</h3>
        <p className="text-text-secondary">
          Our AI is analyzing thousands of internships to find the best opportunities for you...
        </p>
      </div>
      {/* Loading Cards */}
      <div className="space-y-6">
        {[...Array(3)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-soft animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="h-6 bg-muted rounded w-48 mb-2"></div>
                <div className="h-4 bg-muted rounded w-32 mb-2"></div>
                <div className="flex space-x-4">
                  <div className="h-3 bg-muted rounded w-20"></div>
                  <div className="h-3 bg-muted rounded w-16"></div>
                </div>
              </div>
              <div className="w-16 h-16 bg-muted rounded-lg"></div>
            </div>
            <div className="flex justify-between mb-4">
              <div className="h-5 bg-muted rounded w-24"></div>
              <div className="h-6 bg-muted rounded w-32"></div>
            </div>
            <div className="flex space-x-2 mb-4">
              <div className="h-6 bg-muted rounded w-16"></div>
              <div className="h-6 bg-muted rounded w-20"></div>
              <div className="h-6 bg-muted rounded w-18"></div>
            </div>
            <div className="h-10 bg-muted rounded w-full mb-4"></div>
            <div className="flex space-x-3">
              <div className="h-10 bg-muted rounded flex-1"></div>
              <div className="h-10 w-10 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingState;