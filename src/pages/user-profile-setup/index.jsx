import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProgressIndicator from './components/ProgressIndicator';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import InterestsSection from './components/InterestsSection';
import LocationSection from './components/LocationSection';
import ProfileSummary from './components/ProfileSummary';

const UserProfileSetup = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isSaving, setIsSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedSections, setExpandedSections] = useState({
    education: true,
    skills: false,
    interests: false,
    location: false
  });

  const [profileData, setProfileData] = useState({
    education: {
      qualification: '',
      field: '',
      institution: '',
      year: '',
      grade: ''
    },
    skills: {
      skills: []
    },
    interests: {
      sectors: []
    },
    location: {
      state: '',
      city: '',
      address: '',
      radius: '',
      remoteWork: false,
      relocation: false
    }
  });

  const [errors, setErrors] = useState({});

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Load saved profile data
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfileData(parsed);
      } catch (error) {
        console.error('Error loading saved profile:', error);
      }
    }
  }, []);

  const handleSectionChange = (section, data) => {
    setProfileData(prev => ({
      ...prev,
      [section]: data
    }));
    
    // Clear errors for this section
    setErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(newErrors)?.forEach(key => {
        if (key?.startsWith(section)) {
          delete newErrors?.[key];
        }
      });
      return newErrors;
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const validateProfile = () => {
    const newErrors = {};

    // Education validation
    if (!profileData?.education?.qualification) {
      newErrors.qualification = 'Please select your qualification';
    }
    if (!profileData?.education?.field) {
      newErrors.field = 'Please select your field of study';
    }

    // Skills validation
    if (profileData?.skills?.skills?.length === 0) {
      newErrors.skills = 'Please add at least one skill';
    }

    // Interests validation
    if (!profileData?.interests?.sectors || profileData?.interests?.sectors?.length === 0) {
      newErrors.sectors = 'Please select at least one sector of interest';
    }

    // Location validation
    if (!profileData?.location?.state) {
      newErrors.state = 'Please select your preferred state';
    }
    if (!profileData?.location?.radius) {
      newErrors.radius = 'Please select your travel radius';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateProfile()) {
      return;
    }

    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save to localStorage
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      localStorage.setItem('profileLastUpdated', new Date()?.toISOString());
      
      // Show success message
      alert('Profile saved successfully! You can now get personalized internship recommendations.');
      
      // Navigate to recommendations if profile is complete
      const completedSteps = getCompletedSteps();
      if (completedSteps?.length >= 3) {
        navigate('/internship-recommendations');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const getCompletedSteps = () => {
    const completed = [];
    
    if (profileData?.education?.qualification && profileData?.education?.field) {
      completed?.push(1);
    }
    if (profileData?.skills?.skills?.length > 0) {
      completed?.push(2);
    }
    if (profileData?.interests?.sectors && profileData?.interests?.sectors?.length > 0) {
      completed?.push(3);
    }
    if (profileData?.location?.state && profileData?.location?.radius) {
      completed?.push(4);
    }
    
    return completed;
  };

  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  const completedSteps = getCompletedSteps();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-text-primary">
                {currentLanguage === 'hi' ? 'प्रोफाइल सेटअप' : 'Profile Setup'}
              </h1>
              <p className="text-text-secondary mt-1">
                {currentLanguage === 'hi' ?'व्यक्तिगत सिफारिशों के लिए अपनी प्रोफाइल पूरी करें' :'Complete your profile for personalized internship recommendations'
                }
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                iconName="Globe"
                iconPosition="left"
                onClick={handleLanguageToggle}
              >
                {currentLanguage === 'hi' ? 'English' : 'हिंदी'}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                iconName="HelpCircle"
                onClick={() => alert('Profile setup help: Fill in your education, skills, interests, and location preferences to get the best internship matches.')}
              >
                Help
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <ProgressIndicator
                currentStep={currentStep}
                totalSteps={4}
                completedSteps={completedSteps}
              />

              <EducationSection
                data={profileData?.education}
                onChange={handleSectionChange}
                errors={errors}
                isExpanded={expandedSections?.education}
                onToggle={() => toggleSection('education')}
              />

              <SkillsSection
                data={profileData?.skills}
                onChange={handleSectionChange}
                errors={errors}
                isExpanded={expandedSections?.skills}
                onToggle={() => toggleSection('skills')}
              />

              <InterestsSection
                data={profileData?.interests}
                onChange={handleSectionChange}
                errors={errors}
                isExpanded={expandedSections?.interests}
                onToggle={() => toggleSection('interests')}
              />

              <LocationSection
                data={profileData?.location}
                onChange={handleSectionChange}
                errors={errors}
                isExpanded={expandedSections?.location}
                onToggle={() => toggleSection('location')}
              />

              {/* Mobile Save Button */}
              <div className="lg:hidden">
                <Button
                  variant="default"
                  fullWidth
                  size="lg"
                  iconName="Save"
                  iconPosition="left"
                  onClick={handleSaveProfile}
                  loading={isSaving}
                  disabled={completedSteps?.length < 2}
                >
                  {isSaving ? 'Saving...' : 'Save Profile'}
                </Button>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ProfileSummary
                  profileData={profileData}
                  onEdit={(section) => {
                    setExpandedSections(prev => ({
                      ...prev,
                      [section]: true
                    }));
                  }}
                  onSave={handleSaveProfile}
                  isSaving={isSaving}
                />

                {/* Quick Tips */}
                <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Lightbulb" size={16} className="text-primary" />
                    <h4 className="text-sm font-medium text-primary">
                      {currentLanguage === 'hi' ? 'सुझाव' : 'Quick Tips'}
                    </h4>
                  </div>
                  <ul className="text-xs text-text-secondary space-y-1">
                    <li>• Add 5-10 relevant skills for better matches</li>
                    <li>• Select multiple sectors to expand opportunities</li>
                    <li>• Use voice input for easier skill entry</li>
                    <li>• Complete all sections for best results</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfileSetup;