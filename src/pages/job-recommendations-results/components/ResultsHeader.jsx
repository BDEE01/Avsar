import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResultsHeader = ({ 
  totalResults = 0, 
  processingTime = 0,
  onNewSearch,
  userProfile 
}) => {
  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Results Summary */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
                <Icon name="Target" size={24} className="text-success" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Job Recommendations / नौकरी की सिफारिशें
                </h1>
                <p className="text-text-secondary">
                  AI-powered matches for your profile
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full">
                <Icon name="Sparkles" size={16} />
                <span className="font-medium">
                  {totalResults} perfect matches found
                </span>
              </div>
              
              {processingTime > 0 && (
                <div className="flex items-center space-x-1 text-text-secondary">
                  <Icon name="Zap" size={14} />
                  <span>Processed in {processingTime}ms</span>
                </div>
              )}
              
              <div className="flex items-center space-x-1 text-text-secondary">
                <Icon name="TrendingUp" size={14} />
                <span>Sorted by relevance</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onNewSearch}
              iconName="RotateCcw"
              iconPosition="left"
              size="sm"
            >
              <span className="hidden sm:inline">New Search</span>
              <span className="sm:hidden">New</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Share2"
              iconPosition="left"
            >
              <span className="hidden sm:inline">Share Results</span>
              <span className="sm:hidden">Share</span>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{totalResults}</div>
            <div className="text-xs text-text-secondary">Total Matches</div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {totalResults > 0 ? Math.round((totalResults / 5) * 100) : 0}%
            </div>
            <div className="text-xs text-text-secondary">Match Rate</div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-warning">
              {userProfile?.skills?.length || 0}
            </div>
            <div className="text-xs text-text-secondary">Skills Matched</div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent">4.8</div>
            <div className="text-xs text-text-secondary">Avg Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsHeader;