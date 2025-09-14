import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProfileActionButtons = ({
  currentLanguage = 'en',
  onSaveSuccess,
  hasUnsavedChanges = false
}) => {
  const navigate = useNavigate();

  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  const handleViewRecommendations = () => {
    navigate('/recommendations-dashboard');
  };

  const handleBackToDashboard = () => {
    navigate('/recommendations-dashboard');
  };

  const handleProfileSetup = () => {
    navigate('/profile-setup');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-foreground">
          {getLabel('Quick Actions', 'त्वरित क्रियाएं')}
        </h3>
        <p className="text-muted-foreground text-sm mt-1">
          {getLabel('Navigate to other sections or view your recommendations', 'अन्य अनुभागों पर जाएं या अपनी सिफारिशें देखें')}
        </p>
      </div>

      <div className="space-y-3">
        {/* View Recommendations */}
        <Button
          variant="default"
          fullWidth
          onClick={handleViewRecommendations}
          iconName="Eye"
          iconPosition="left"
        >
          {getLabel('View My Recommendations', 'मेरी सिफारिशें देखें')}
        </Button>

        {/* Back to Dashboard */}
        <Button
          variant="outline"
          fullWidth
          onClick={handleBackToDashboard}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          {getLabel('Back to Dashboard', 'डैशबोर्ड पर वापस जाएं')}
        </Button>

        {/* Complete Profile Setup */}
        <Button
          variant="secondary"
          fullWidth
          onClick={handleProfileSetup}
          iconName="UserPlus"
          iconPosition="left"
        >
          {getLabel('Complete Profile Setup', 'प्रोफाइल सेटअप पूरा करें')}
        </Button>
      </div>

      {/* Unsaved Changes Warning */}
      {hasUnsavedChanges && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertCircle" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">
                {getLabel('Unsaved Changes', 'असहेजे परिवर्तन')}
              </p>
              <p className="text-sm text-warning/80 mt-1">
                {getLabel(
                  'You have unsaved changes. Make sure to save before navigating away.',
                  'आपके पास असहेजे परिवर्तन हैं। नेविगेट करने से पहले सहेजना सुनिश्चित करें।'
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {onSaveSuccess && (
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <div>
              <p className="text-sm font-medium text-success">
                {getLabel('Profile Updated Successfully', 'प्रोफाइल सफलतापूर्वक अपडेट हुई')}
              </p>
              <p className="text-sm text-success/80 mt-1">
                {getLabel(
                  'Your profile has been updated. New recommendations will be generated based on your changes.',
                  'आपकी प्रोफाइल अपडेट हो गई है। आपके परिवर्तनों के आधार पर नई सिफारिशें जेनरेट होंगी।'
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileActionButtons;