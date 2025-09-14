import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileSummaryCard = ({
  profileData = {},
  currentLanguage = 'en',
  onRegenerateRecommendations,
  isRegenerating = false
}) => {
  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  // Calculate profile completion percentage
  const calculateCompletionPercentage = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'educationLevel', 'location', 'skills'];
    const completedFields = requiredFields?.filter(field => {
      if (field === 'skills') {
        return profileData?.[field] && profileData?.[field]?.length > 0;
      }
      return profileData?.[field] && profileData?.[field]?.trim() !== '';
    });
    return Math.round((completedFields?.length / requiredFields?.length) * 100);
  };

  const completionPercentage = calculateCompletionPercentage();

  // Get skill labels based on current language
  const getSkillLabels = (skills) => {
    const skillMap = {
      'web-development': { en: 'Web Development', hi: 'वेब डेवलपमेंट' },
      'digital-marketing': { en: 'Digital Marketing', hi: 'डिजिटल मार्केटिंग' },
      'ai-ml': { en: 'AI/ML', hi: 'एआई/एमएल' },
      'graphic-design': { en: 'Graphic Design', hi: 'ग्राफिक डिज़ाइन' },
      'content-writing': { en: 'Content Writing', hi: 'कंटेंट राइटिंग' },
      'data-analysis': { en: 'Data Analysis', hi: 'डेटा एनालिसिस' },
      'mobile-development': { en: 'Mobile Development', hi: 'मोबाइल डेवलपमेंट' },
      'social-media': { en: 'Social Media Management', hi: 'सोशल मीडिया प्रबंधन' }
    };

    return skills?.map(skill => 
      skillMap?.[skill] ? skillMap?.[skill]?.[currentLanguage] : skill
    ) || [];
  };

  const getLocationLabel = (location) => {
    const locationMap = {
      'mumbai': { en: 'Mumbai', hi: 'मुंबई' },
      'delhi': { en: 'Delhi', hi: 'दिल्ली' },
      'bangalore': { en: 'Bangalore', hi: 'बैंगलोर' },
      'pune': { en: 'Pune', hi: 'पुणे' },
      'hyderabad': { en: 'Hyderabad', hi: 'हैदराबाद' },
      'chennai': { en: 'Chennai', hi: 'चेन्नई' },
      'kolkata': { en: 'Kolkata', hi: 'कोलकाता' },
      'ahmedabad': { en: 'Ahmedabad', hi: 'अहमदाबाद' }
    };

    return locationMap?.[location] ? locationMap?.[location]?.[currentLanguage] : location;
  };

  const getEducationLabel = (education) => {
    const educationMap = {
      '10th': { en: '10th Pass', hi: '10वीं पास' },
      '12th': { en: '12th Pass', hi: '12वीं पास' },
      'diploma': { en: 'Diploma', hi: 'डिप्लोमा' },
      'undergraduate': { en: 'Undergraduate', hi: 'स्नातक' },
      'postgraduate': { en: 'Postgraduate', hi: 'स्नातकोत्तर' }
    };

    return educationMap?.[education] ? educationMap?.[education]?.[currentLanguage] : education;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {getLabel('Profile Summary', 'प्रोफाइल सारांश')}
          </h2>
          <p className="text-muted-foreground mt-1">
            {getLabel('Your current profile information', 'आपकी वर्तमान प्रोफाइल जानकारी')}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            completionPercentage >= 80 
              ? 'bg-success/10 text-success' 
              : completionPercentage >= 60 
                ? 'bg-warning/10 text-warning' :'bg-error/10 text-error'
          }`}>
            {completionPercentage}% {getLabel('Complete', 'पूर्ण')}
          </div>
        </div>
      </div>
      {/* Profile Completion Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">
            {getLabel('Profile Completion', 'प्रोफाइल पूर्णता')}
          </span>
          <span className="text-sm text-muted-foreground">
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              completionPercentage >= 80 
                ? 'bg-success' 
                : completionPercentage >= 60 
                  ? 'bg-warning' :'bg-error'
            }`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
      {/* Profile Information */}
      <div className="space-y-4">
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">
              {getLabel('Full Name', 'पूरा नाम')}
            </label>
            <p className="text-foreground">
              {profileData?.firstName && profileData?.lastName 
                ? `${profileData?.firstName} ${profileData?.lastName}`
                : getLabel('Not provided', 'प्रदान नहीं किया गया')
              }
            </p>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">
              {getLabel('Email', 'ईमेल')}
            </label>
            <p className="text-foreground">
              {profileData?.email || getLabel('Not provided', 'प्रदान नहीं किया गया')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">
              {getLabel('Phone', 'फोन')}
            </label>
            <p className="text-foreground">
              {profileData?.phone || getLabel('Not provided', 'प्रदान नहीं किया गया')}
            </p>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">
              {getLabel('Education Level', 'शिक्षा स्तर')}
            </label>
            <p className="text-foreground">
              {profileData?.educationLevel 
                ? getEducationLabel(profileData?.educationLevel)
                : getLabel('Not provided', 'प्रदान नहीं किया गया')
              }
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            {getLabel('Location', 'स्थान')}
          </label>
          <p className="text-foreground">
            {profileData?.location 
              ? getLocationLabel(profileData?.location)
              : getLabel('Not provided', 'प्रदान नहीं किया गया')
            }
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            {getLabel('Skills', 'कौशल')}
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {profileData?.skills && profileData?.skills?.length > 0 ? (
              getSkillLabels(profileData?.skills)?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-muted-foreground text-sm">
                {getLabel('No skills selected', 'कोई कौशल चयनित नहीं')}
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Regenerate Recommendations */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-foreground">
              {getLabel('Update Recommendations', 'सिफारिशें अपडेट करें')}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {getLabel(
                'Generate new internship recommendations based on your updated profile',
                'अपनी अपडेटेड प्रोफाइल के आधार पर नई इंटर्नशिप सिफारिशें जेनरेट करें'
              )}
            </p>
          </div>
          
          <Button
            onClick={onRegenerateRecommendations}
            loading={isRegenerating}
            disabled={isRegenerating || completionPercentage < 60}
            iconName="RefreshCw"
            iconPosition="left"
          >
            {getLabel('Regenerate', 'पुनर्जनन करें')}
          </Button>
        </div>
        
        {completionPercentage < 60 && (
          <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning">
                  {getLabel('Profile Incomplete', 'प्रोफाइल अधूरी')}
                </p>
                <p className="text-sm text-warning/80 mt-1">
                  {getLabel(
                    'Complete at least 60% of your profile to generate recommendations',
                    'सिफारिशें जेनरेट करने के लिए अपनी प्रोफाइल का कम से कम 60% पूरा करें'
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSummaryCard;