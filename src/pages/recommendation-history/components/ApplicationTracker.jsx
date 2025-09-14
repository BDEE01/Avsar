import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApplicationTracker = ({ applications }) => {
  const getApplicationStatusColor = (status) => {
    switch (status) {
      case 'interview_scheduled':
        return 'bg-accent text-accent-foreground';
      case 'under_review':
        return 'bg-secondary text-secondary-foreground';
      case 'accepted':
        return 'bg-success text-success-foreground';
      case 'rejected':
        return 'bg-destructive text-destructive-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'interview_scheduled':
        return 'Calendar';
      case 'under_review':
        return 'Clock';
      case 'accepted':
        return 'CheckCircle';
      case 'rejected':
        return 'XCircle';
      case 'pending':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Application Tracker</h3>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="TrendingUp" size={16} />
            <span>{applications?.length} applications</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        {applications?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium text-text-primary mb-2">No Applications Yet</h4>
            <p className="text-text-secondary mb-4">
              Start applying to internships to track your progress here.
            </p>
            <Button variant="default" iconName="Plus" iconPosition="left">
              Browse Recommendations
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {applications?.map((app) => (
              <div key={app?.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-smooth">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary">{app?.position}</h4>
                    <p className="text-sm text-text-secondary">{app?.company} • {app?.location}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getApplicationStatusColor(app?.status)}`}>
                    <Icon name={getStatusIcon(app?.status)} size={12} className="inline mr-1" />
                    {app?.status?.replace('_', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-text-secondary">Applied:</span>
                    <p className="font-medium text-text-primary">{app?.appliedDate}</p>
                  </div>
                  <div>
                    <span className="text-text-secondary">Salary:</span>
                    <p className="font-medium text-text-primary">₹{app?.salary?.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <span className="text-text-secondary">Match Score:</span>
                    <p className="font-medium text-text-primary">{app?.matchScore}%</p>
                  </div>
                  <div>
                    <span className="text-text-secondary">Deadline:</span>
                    <p className="font-medium text-text-primary">{app?.deadline}</p>
                  </div>
                </div>

                {app?.updates && app?.updates?.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-text-primary mb-2">Recent Updates:</h5>
                    <div className="space-y-2">
                      {app?.updates?.slice(0, 2)?.map((update, index) => (
                        <div key={index} className="flex items-start space-x-2 text-sm">
                          <Icon name="ArrowRight" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-text-primary">{update?.message}</p>
                            <p className="text-text-secondary text-xs">{update?.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {app?.interviewDate && (
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={16} className="text-accent" />
                      <div>
                        <p className="font-medium text-text-primary">Interview Scheduled</p>
                        <p className="text-sm text-text-secondary">
                          {app?.interviewDate} at {app?.interviewTime}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Clock" size={14} />
                    <span>Last updated: {app?.lastUpdated}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" iconName="ExternalLink">
                      View Application
                    </Button>
                    {app?.status === 'interview_scheduled' && (
                      <Button variant="default" size="sm" iconName="Calendar">
                        Join Interview
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationTracker;