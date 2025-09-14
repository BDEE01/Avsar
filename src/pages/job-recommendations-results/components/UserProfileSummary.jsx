import React from 'react';
import Icon from '../../../components/AppIcon';

const UserProfileSummary = ({ userProfile }) => {
  if (!userProfile) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="User" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Your Profile / आपकी प्रोफ़ाइल
        </h3>
      </div>
      <div className="space-y-4">
        {/* Skills Section */}
        {userProfile?.skills && userProfile?.skills?.length > 0 && (
          <div>
            <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
              <Icon name="Code" size={16} className="text-accent" />
              <span>Skills / कौशल</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {userProfile?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-md font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Location Section */}
        {userProfile?.location && (
          <div>
            <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-accent" />
              <span>Location / स्थान</span>
            </h4>
            <p className="text-text-secondary bg-muted px-3 py-2 rounded-md">
              {userProfile?.location}
            </p>
          </div>
        )}

        {/* Education Section */}
        {userProfile?.education && (
          <div>
            <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
              <Icon name="GraduationCap" size={16} className="text-accent" />
              <span>Education / शिक्षा</span>
            </h4>
            <p className="text-text-secondary bg-muted px-3 py-2 rounded-md">
              {userProfile?.education}
            </p>
          </div>
        )}

        {/* Experience Section */}
        {userProfile?.experience && (
          <div>
            <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
              <Icon name="Briefcase" size={16} className="text-accent" />
              <span>Experience / अनुभव</span>
            </h4>
            <p className="text-text-secondary bg-muted px-3 py-2 rounded-md">
              {userProfile?.experience} years
            </p>
          </div>
        )}

        {/* Preferences Section */}
        {userProfile?.preferences && (
          <div>
            <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
              <Icon name="Settings" size={16} className="text-accent" />
              <span>Preferences / प्राथमिकताएं</span>
            </h4>
            <div className="space-y-2">
              {userProfile?.preferences?.workType && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Work Type:</span>
                  <span className="text-foreground font-medium">{userProfile?.preferences?.workType}</span>
                </div>
              )}
              {userProfile?.preferences?.salaryRange && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Expected Salary:</span>
                  <span className="text-foreground font-medium">{userProfile?.preferences?.salaryRange}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Profile Completeness */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Profile Completeness</span>
          <span className="text-primary font-medium">85%</span>
        </div>
        <div className="mt-2 w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSummary;