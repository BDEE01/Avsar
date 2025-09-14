import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileSummary = ({ profileData, onEdit, onSave, isSaving }) => {
  const completionPercentage = () => {
    let completed = 0;
    let total = 4;

    if (profileData?.education?.qualification && profileData?.education?.field) completed++;
    if (profileData?.skills?.skills?.length > 0) completed++;
    if (profileData?.interests?.sectors?.length > 0) completed++;
    if (profileData?.location?.state && profileData?.location?.radius) completed++;

    return Math.round((completed / total) * 100);
  };

  const getSummaryData = () => {
    return {
      education: profileData?.education?.qualification ? 
        `${profileData?.education?.qualification} in ${profileData?.education?.field}` : 
        'Not specified',
      skills: profileData?.skills?.skills?.length > 0 ? 
        profileData?.skills?.skills?.slice(0, 3)?.join(', ') + 
        (profileData?.skills?.skills?.length > 3 ? ` +${profileData?.skills?.skills?.length - 3} more` : '') : 
        'No skills added',
      interests: profileData?.interests?.sectors?.length > 0 ? 
        `${profileData?.interests?.sectors?.length} sectors selected` : 
        'No interests selected',
      location: profileData?.location?.state ? 
        `${profileData?.location?.state}${profileData?.location?.city ? `, ${profileData?.location?.city}` : ''}` : 
        'Not specified'
    };
  };

  const summary = getSummaryData();
  const completion = completionPercentage();

  return (
    <div className="bg-card rounded-lg shadow-soft border border-border">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Profile Summary</h3>
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 relative">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="var(--color-border)"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  strokeDasharray={`${completion}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold text-primary">{completion}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Icon name="GraduationCap" size={16} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">Education</p>
              <p className="text-sm text-text-secondary">{summary?.education}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Icon name="Code" size={16} className="text-secondary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">Skills</p>
              <p className="text-sm text-text-secondary">{summary?.skills}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Icon name="Target" size={16} className="text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">Interests</p>
              <p className="text-sm text-text-secondary">{summary?.interests}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Icon name="MapPin" size={16} className="text-success mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">Location</p>
              <p className="text-sm text-text-secondary">{summary?.location}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button
            variant="default"
            fullWidth
            iconName="Save"
            iconPosition="left"
            onClick={onSave}
            loading={isSaving}
            disabled={completion < 50}
          >
            {isSaving ? 'Saving Profile...' : 'Save Profile'}
          </Button>

          {completion >= 75 && (
            <Button
              variant="outline"
              fullWidth
              iconName="Target"
              iconPosition="left"
              onClick={() => window.location.href = '/internship-recommendations'}
            >
              Get Recommendations
            </Button>
          )}

          {completion < 50 && (
            <p className="text-xs text-warning text-center">
              Complete at least 50% of your profile to save
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;