import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileEvolution = ({ profileHistory }) => {
  const getChangeIcon = (type) => {
    switch (type) {
      case 'skill_added':
        return 'Plus';
      case 'skill_removed':
        return 'Minus';
      case 'interest_changed':
        return 'Edit';
      case 'location_updated':
        return 'MapPin';
      case 'education_updated':
        return 'GraduationCap';
      default:
        return 'Circle';
    }
  };

  const getChangeColor = (type) => {
    switch (type) {
      case 'skill_added':
        return 'text-success';
      case 'skill_removed':
        return 'text-destructive';
      case 'interest_changed':
        return 'text-accent';
      case 'location_updated':
        return 'text-secondary';
      case 'education_updated':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Profile Evolution</h3>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="TrendingUp" size={16} />
            <span>Track your growth</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        {profileHistory?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="User" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium text-text-primary mb-2">No Profile Changes</h4>
            <p className="text-text-secondary">
              Your profile evolution will appear here as you update your skills and preferences.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {profileHistory?.map((change, index) => (
              <div key={index} className="flex items-start space-x-4 pb-4 border-b border-border last:border-b-0 last:pb-0">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-muted ${getChangeColor(change?.type)}`}>
                  <Icon name={getChangeIcon(change?.type)} size={16} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-text-primary">{change?.title}</h4>
                    <span className="text-xs text-text-secondary">{change?.date}</span>
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-2">{change?.description}</p>
                  
                  {change?.details && (
                    <div className="bg-muted rounded-lg p-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        {change?.details?.before && (
                          <div>
                            <span className="text-text-secondary">Before:</span>
                            <p className="font-medium text-text-primary">{change?.details?.before}</p>
                          </div>
                        )}
                        {change?.details?.after && (
                          <div>
                            <span className="text-text-secondary">After:</span>
                            <p className="font-medium text-text-primary">{change?.details?.after}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {change?.impact && (
                    <div className="mt-2 flex items-center space-x-2 text-xs">
                      <Icon name="TrendingUp" size={12} className="text-success" />
                      <span className="text-text-secondary">
                        Impact: {change?.impact}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileEvolution;