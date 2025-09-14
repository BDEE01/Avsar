import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SavedInternships = ({ savedInternships, onQuickApply, onRemoveFromSaved }) => {
  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline.split('/').reverse().join('-'));
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDeadlineColor = (days) => {
    if (days <= 3) return 'text-destructive';
    if (days <= 7) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Saved Internships</h3>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Bookmark" size={16} />
            <span>{savedInternships?.length} saved</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        {savedInternships?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="BookmarkX" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium text-text-primary mb-2">No Saved Internships</h4>
            <p className="text-text-secondary mb-4">
              Save internships from your recommendations to access them quickly later.
            </p>
            <Button variant="default" iconName="Target" iconPosition="left">
              View Recommendations
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {savedInternships?.map((internship) => {
              const daysLeft = getDaysUntilDeadline(internship?.deadline);
              
              return (
                <div key={internship?.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-smooth">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-text-primary">{internship?.title}</h4>
                      <p className="text-sm text-text-secondary">{internship?.company} • {internship?.location}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="BookmarkX"
                      onClick={() => onRemoveFromSaved(internship?.id)}
                      className="text-muted-foreground hover:text-destructive"
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-text-secondary">Salary:</span>
                      <p className="font-medium text-text-primary">₹{internship?.salary?.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <span className="text-text-secondary">Duration:</span>
                      <p className="font-medium text-text-primary">{internship?.duration}</p>
                    </div>
                    <div>
                      <span className="text-text-secondary">Match Score:</span>
                      <p className="font-medium text-text-primary">{internship?.matchScore}%</p>
                    </div>
                    <div>
                      <span className="text-text-secondary">Deadline:</span>
                      <p className={`font-medium ${getDeadlineColor(daysLeft)}`}>
                        {internship?.deadline}
                        {daysLeft > 0 && (
                          <span className="text-xs block">
                            ({daysLeft} days left)
                          </span>
                        )}
                        {daysLeft <= 0 && (
                          <span className="text-xs block text-destructive">
                            (Expired)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  {daysLeft <= 7 && daysLeft > 0 && (
                    <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <Icon name="AlertTriangle" size={16} className="text-warning" />
                        <p className="text-sm font-medium text-text-primary">
                          Deadline approaching! Only {daysLeft} days left to apply.
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-text-secondary">
                      <Icon name="Clock" size={14} />
                      <span>Saved on: {internship?.savedDate}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" iconName="Eye">
                        View Details
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Send"
                        iconPosition="left"
                        onClick={() => onQuickApply(internship)}
                        disabled={daysLeft <= 0}
                      >
                        {daysLeft <= 0 ? 'Expired' : 'Quick Apply'}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedInternships;