import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileSummaryCard = ({ 
  userProfile = {}, 
  currentLanguage = 'en',
  onEditProfile,
  onRefreshRecommendations 
}) => {
  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  const getProfileCompletionPercentage = () => {
    if (!userProfile) return 0;
    const fields = ['name', 'email', 'education', 'skills', 'location'];
    const completedFields = fields?.filter(field => {
      if (field === 'skills') {
        return userProfile?.[field] && userProfile?.[field]?.length > 0;
      }
      return userProfile?.[field];
    });
    return Math.round((completedFields?.length / fields?.length) * 100);
  };

  const completionPercentage = getProfileCompletionPercentage();

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {getLabel('Profile Summary', 'प्रोफाइल सारांश')}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onEditProfile}
        >
          <Icon name="Edit" size={16} />
        </Button>
      </div>
      {/* Profile Info */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {userProfile?.name || getLabel('Complete your profile', 'अपनी प्रोफाइल पूरी करें')}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {userProfile?.email || getLabel('Add email address', 'ईमेल पता जोड़ें')}
            </p>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              {getLabel('Profile Completion', 'प्रोफाइल पूर्णता')}
            </span>
            <span className="text-xs font-medium text-foreground">
              {completionPercentage}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {getLabel('Education:', 'शिक्षा:')}
            </span>
            <span className="text-foreground font-medium">
              {userProfile?.education || getLabel('Not specified', 'निर्दिष्ट नहीं')}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {getLabel('Location:', 'स्थान:')}
            </span>
            <span className="text-foreground font-medium">
              {userProfile?.location || getLabel('Not specified', 'निर्दिष्ट नहीं')}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {getLabel('Skills:', 'कौशल:')}
            </span>
            <span className="text-foreground font-medium">
              {userProfile?.skills ? userProfile?.skills?.length : 0} {getLabel('selected', 'चयनित')}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={onEditProfile}
            className="flex-1"
          >
            <Icon name="Settings" size={14} className="mr-2" />
            {getLabel('Edit Profile', 'प्रोफाइल संपादित करें')}
          </Button>
          
          <Button
            variant="default"
            size="sm"
            onClick={onRefreshRecommendations}
            className="flex-1"
          >
            <Icon name="RefreshCw" size={14} className="mr-2" />
            {getLabel('Refresh', 'रीफ्रेश')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummaryCard;