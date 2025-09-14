import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import ProfileEditForm from './components/ProfileEditForm';
import ProfileSummaryCard from './components/ProfileSummaryCard';
import ProfileActionButtons from './components/ProfileActionButtons';
import Icon from '../../components/AppIcon';

const ProfileManagement = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock user profile data
  const [profileData, setProfileData] = useState({
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 9876543210',
    educationLevel: '12th',
    location: 'mumbai',
    skills: ['web-development', 'digital-marketing', 'graphic-design']
  });

  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  // Handle sidebar toggle
  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Handle profile form submission
  const handleProfileSubmit = async (formData) => {
    setIsLoading(true);
    setSaveSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update profile data
      setProfileData(formData);
      setHasUnsavedChanges(false);
      setSaveSuccess(true);

      // Show success message for 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form cancellation
  const handleFormCancel = () => {
    setHasUnsavedChanges(false);
  };

  // Handle regenerate recommendations
  const handleRegenerateRecommendations = async () => {
    setIsRegenerating(true);

    try {
      // Simulate API call for regenerating recommendations
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Navigate to recommendations dashboard after regeneration
      navigate('/recommendations-dashboard');
    } catch (error) {
      console.error('Error regenerating recommendations:', error);
    } finally {
      setIsRegenerating(false);
    }
  };

  // Handle profile refresh for sidebar
  const handleProfileRefresh = () => {
    handleRegenerateRecommendations();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AppHeader
        isAuthenticated={true}
        onLanguageChange={handleLanguageChange}
        currentLanguage={currentLanguage}
      />

      {/* Sidebar */}
      <DashboardSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleSidebarToggle}
        userProfile={profileData}
        currentLanguage={currentLanguage}
        onProfileRefresh={handleProfileRefresh}
      />

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-72'
      }`}>
        <div className="p-4 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <span>{getLabel('Dashboard', 'डैशबोर्ड')}</span>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground font-medium">
                {getLabel('Profile Management', 'प्रोफाइल प्रबंधन')}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-foreground">
              {getLabel('Profile Management', 'प्रोफाइल प्रबंधन')}
            </h1>
            <p className="text-muted-foreground mt-2">
              {getLabel(
                'Update your profile information to get better internship recommendations',
                'बेहतर इंटर्नशिप सिफारिशें प्राप्त करने के लिए अपनी प्रोफाइल जानकारी अपडेट करें'
              )}
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Content - Profile Form */}
            <div className="xl:col-span-2 space-y-8">
              {/* Profile Summary Card */}
              <ProfileSummaryCard
                profileData={profileData}
                currentLanguage={currentLanguage}
                onRegenerateRecommendations={handleRegenerateRecommendations}
                isRegenerating={isRegenerating}
              />

              {/* Profile Edit Form */}
              <ProfileEditForm
                initialData={profileData}
                onSubmit={handleProfileSubmit}
                onCancel={handleFormCancel}
                currentLanguage={currentLanguage}
                isLoading={isLoading}
              />
            </div>

            {/* Sidebar Content */}
            <div className="xl:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Action Buttons */}
                <ProfileActionButtons
                  currentLanguage={currentLanguage}
                  onSaveSuccess={saveSuccess}
                  hasUnsavedChanges={hasUnsavedChanges}
                />

                {/* Tips Card */}
                <div className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Icon name="Lightbulb" size={20} className="text-accent" />
                    <h3 className="font-medium text-foreground">
                      {getLabel('Profile Tips', 'प्रोफाइल टिप्स')}
                    </h3>
                  </div>
                  
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start space-x-2">
                      <Icon name="Check" size={14} className="text-success mt-0.5" />
                      <p>
                        {getLabel(
                          'Complete all fields for better recommendations',
                          'बेहतर सिफारिशों के लिए सभी फील्ड पूरे करें'
                        )}
                      </p>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Icon name="Check" size={14} className="text-success mt-0.5" />
                      <p>
                        {getLabel(
                          'Select multiple skills to increase opportunities',
                          'अवसर बढ़ाने के लिए कई कौशल चुनें'
                        )}
                      </p>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Icon name="Check" size={14} className="text-success mt-0.5" />
                      <p>
                        {getLabel(
                          'Keep your information updated regularly',
                          'अपनी जानकारी नियमित रूप से अपडेट रखें'
                        )}
                      </p>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Icon name="Check" size={14} className="text-success mt-0.5" />
                      <p>
                        {getLabel(
                          'Use accurate location for local opportunities',
                          'स्थानीय अवसरों के लिए सटीक स्थान का उपयोग करें'
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Statistics Card */}
                <div className="bg-card rounded-lg border border-border p-6">
                  <h3 className="font-medium text-foreground mb-4">
                    {getLabel('Profile Statistics', 'प्रोफाइल आंकड़े')}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {getLabel('Profile Views', 'प्रोफाइल व्यू')}
                      </span>
                      <span className="font-medium text-foreground">127</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {getLabel('Recommendations Generated', 'सिफारिशें जेनरेट की गईं')}
                      </span>
                      <span className="font-medium text-foreground">23</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {getLabel('Applications Sent', 'आवेदन भेजे गए')}
                      </span>
                      <span className="font-medium text-foreground">8</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {getLabel('Last Updated', 'अंतिम अपडेट')}
                      </span>
                      <span className="font-medium text-foreground">
                        {getLabel('2 days ago', '2 दिन पहले')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileManagement;