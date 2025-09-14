import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HistoryCard = ({ session, onViewDetails, onRerunRecommendations }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied':
        return 'bg-success text-success-foreground';
      case 'saved':
        return 'bg-warning text-warning-foreground';
      case 'viewed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'applied':
        return 'CheckCircle';
      case 'saved':
        return 'Bookmark';
      case 'viewed':
        return 'Eye';
      default:
        return 'Clock';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft hover:shadow-elevated transition-smooth">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-text-primary">
                Session {session?.id}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session?.status)}`}>
                <Icon name={getStatusIcon(session?.status)} size={12} className="inline mr-1" />
                {session?.status?.charAt(0)?.toUpperCase() + session?.status?.slice(1)}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>{session?.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Target" size={14} />
                <span>{session?.recommendationsCount} recommendations</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="TrendingUp" size={14} />
                <span>Avg. {session?.averageScore}% match</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>

        {isExpanded && (
          <div className="space-y-4">
            <div className="border-t border-border pt-4">
              <h4 className="text-sm font-medium text-text-primary mb-3">Recommendations from this session:</h4>
              <div className="space-y-3">
                {session?.recommendations?.map((rec) => (
                  <div key={rec?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex-1">
                      <h5 className="font-medium text-text-primary">{rec?.title}</h5>
                      <p className="text-sm text-text-secondary">{rec?.company} • {rec?.location}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <Icon name="Target" size={12} />
                          <span className="text-xs text-text-secondary">{rec?.matchScore}% match</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(rec?.applicationStatus)}`}>
                          {rec?.applicationStatus}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Volume2"
                        onClick={() => {/* Audio playback functionality */}}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewDetails(rec)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="text-sm text-text-secondary">
                Profile used: {session?.profileVersion}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  iconPosition="left"
                  onClick={() => onViewDetails(session)}
                >
                  View Details
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={() => onRerunRecommendations(session)}
                >
                  Rerun
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryCard;