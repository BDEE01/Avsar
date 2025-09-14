import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProfileStepIndicator from './components/ProfileStepIndicator';
import PersonalInfoStep from './components/PersonalInfoStep';
import EducationStep from './components/EducationStep';
import SkillsStep from './components/SkillsStep';
import LocationStep from './components/LocationStep';
import ReviewStep from './components/ReviewStep';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const totalSteps = 5;

  // Form data state
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: ''
    },
    education: {
      level: '',
      institution: '',
      stream: '',
      year: '',
      percentage: '',
      isCurrentlyStudying: false,
      customStream: ''
    },
    skills: {
      selectedSkills: [],
      softSkills: [],
      languages: []
    },
    location: {
      currentState: '',
      currentCity: '',
      pinCode: '',
      preferredCities: [],
      workModes: [],
      willingToRelocate: false,
      openToTravel: false
    }
  });

  // Load saved language preference and pre-fill data
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);

    // Pre-fill name from registration if available
    const registrationData = localStorage.getItem('registrationData');
    if (registrationData) {
      try {
        const userData = JSON.parse(registrationData);
        if (userData?.name) {
          const nameParts = userData?.name?.split(' ');
          setFormData(prev => ({
            ...prev,
            personalInfo: {
              ...prev?.personalInfo,
              firstName: nameParts?.[0] || '',
              lastName: nameParts?.slice(1)?.join(' ') || '',
              email: userData?.email || ''
            }
          }));
        }
      } catch (error) {
        console.error('Error parsing registration data:', error);
      }
    }

    // Load existing profile data if available
    const existingProfile = localStorage.getItem('userProfile');
    if (existingProfile) {
      try {
        const profileData = JSON.parse(existingProfile);
        setFormData(prev => ({
          ...prev,
          ...profileData
        }));
      } catch (error) {
        console.error('Error parsing existing profile:', error);
      }
    }
  }, []);

  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  const handleFormChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [field]: value
      }
    }));

    // Clear error when user makes changes
    const errorKey = `${section}.${field}`;
    if (errors?.[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1: // Personal Info
        if (!formData?.personalInfo?.firstName?.trim()) {
          newErrors['personalInfo.firstName'] = getLabel('First name is required', 'पहला नाम आवश्यक है');
        }
        if (!formData?.personalInfo?.lastName?.trim()) {
          newErrors['personalInfo.lastName'] = getLabel('Last name is required', 'अंतिम नाम आवश्यक है');
        }
        if (!formData?.personalInfo?.email?.trim()) {
          newErrors['personalInfo.email'] = getLabel('Email is required', 'ईमेल आवश्यक है');
        } else if (!/\S+@\S+\.\S+/?.test(formData?.personalInfo?.email)) {
          newErrors['personalInfo.email'] = getLabel('Please enter a valid email', 'कृपया एक वैध ईमेल दर्ज करें');
        }
        if (!formData?.personalInfo?.phone?.trim()) {
          newErrors['personalInfo.phone'] = getLabel('Phone number is required', 'फोन नंबर आवश्यक है');
        }
        break;

      case 2: // Education
        if (!formData?.education?.level) {
          newErrors['education.level'] = getLabel('Education level is required', 'शिक्षा स्तर आवश्यक है');
        }
        if (!formData?.education?.institution?.trim()) {
          newErrors['education.institution'] = getLabel('Institution name is required', 'संस्थान का नाम आवश्यक है');
        }
        if (!formData?.education?.stream) {
          newErrors['education.stream'] = getLabel('Stream/field is required', 'स्ट्रीम/क्षेत्र आवश्यक है');
        }
        break;

      case 3: // Skills
        if (!formData?.skills?.selectedSkills || formData?.skills?.selectedSkills?.length === 0) {
          newErrors['skills.selectedSkills'] = getLabel('Please select at least one technical skill', 'कृपया कम से कम एक तकनीकी कौशल चुनें');
        }
        break;

      case 4: // Location
        if (!formData?.location?.currentState) {
          newErrors['location.currentState'] = getLabel('Current state is required', 'वर्तमान राज्य आवश्यक है');
        }
        if (!formData?.location?.currentCity?.trim()) {
          newErrors['location.currentCity'] = getLabel('Current city is required', 'वर्तमान शहर आवश्यक है');
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleEditStep = (step) => {
    setCurrentStep(step);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Save profile data to localStorage
      localStorage.setItem('userProfile', JSON.stringify(formData));
      localStorage.setItem('profileSetupComplete', 'true');

      // Show success message
      const successMessage = getLabel(
        'Profile setup completed successfully! Redirecting to recommendations...',
        'प्रोफाइल सेटअप सफलतापूर्वक पूरा हुआ! सिफारिशों पर रीडायरेक्ट कर रहे हैं...'
      );

      // Create a temporary success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-success text-success-foreground px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2';
      notification.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <span>${successMessage}</span>
      `;
      document.body?.appendChild(notification);

      // Remove notification after 3 seconds
      setTimeout(() => {
        document.body?.removeChild(notification);
      }, 3000);

      // Navigate to recommendations dashboard
      setTimeout(() => {
        navigate('/recommendations-dashboard');
      }, 1500);

    } catch (error) {
      console.error('Error saving profile:', error);
      
      const errorMessage = getLabel(
        'Failed to save profile. Please try again.',
        'प्रोफाइल सहेजने में विफल। कृपया पुनः प्रयास करें।'
      );

      // Show error notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-error text-error-foreground px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2';
      notification.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
        </svg>
        <span>${errorMessage}</span>
      `;
      document.body?.appendChild(notification);

      setTimeout(() => {
        document.body?.removeChild(notification);
      }, 3000);

    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData?.personalInfo}
            errors={errors}
            onChange={handleFormChange}
            currentLanguage={currentLanguage}
          />
        );
      case 2:
        return (
          <EducationStep
            formData={formData?.education}
            errors={errors}
            onChange={handleFormChange}
            currentLanguage={currentLanguage}
          />
        );
      case 3:
        return (
          <SkillsStep
            formData={formData?.skills}
            errors={errors}
            onChange={handleFormChange}
            currentLanguage={currentLanguage}
          />
        );
      case 4:
        return (
          <LocationStep
            formData={formData?.location}
            errors={errors}
            onChange={handleFormChange}
            currentLanguage={currentLanguage}
          />
        );
      case 5:
        return (
          <ReviewStep
            formData={formData}
            onEdit={handleEditStep}
            currentLanguage={currentLanguage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        isAuthenticated={true}
        onLanguageChange={handleLanguageChange}
        currentLanguage={currentLanguage}
      />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {getLabel('Complete Your Profile', 'अपनी प्रोफाइल पूरी करें')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {getLabel(
                'Help us find the perfect internships for you by completing your profile',
                'अपनी प्रोफाइल पूरी करके हमें आपके लिए सही इंटर्नशिप खोजने में मदद करें'
              )}
            </p>
          </div>

          {/* Progress Indicator */}
          <ProfileStepIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            currentLanguage={currentLanguage}
          />

          {/* Form Container */}
          <div className="bg-card border border-border rounded-lg shadow-soft">
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              {/* Step Content */}
              <div className="mb-8">
                {renderStepContent()}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <div>
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={isLoading}
                    >
                      <Icon name="ChevronLeft" size={16} className="mr-2" />
                      {getLabel('Previous', 'पिछला')}
                    </Button>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => navigate('/recommendations-dashboard')}
                    disabled={isLoading}
                  >
                    {getLabel('Skip for now', 'अभी के लिए छोड़ें')}
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={isLoading}
                    >
                      {getLabel('Next', 'अगला')}
                      <Icon name="ChevronRight" size={16} className="ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      loading={isLoading}
                      disabled={isLoading}
                    >
                      <Icon name="Check" size={16} className="mr-2" />
                      {getLabel('Complete Profile', 'प्रोफाइल पूरी करें')}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-primary/5 border border-primary/20 rounded-lg p-6">
            <h3 className="text-lg font-medium text-foreground mb-3 flex items-center">
              <Icon name="HelpCircle" size={20} className="mr-2 text-primary" />
              {getLabel('Need Help?', 'सहायता चाहिए?')}
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                {getLabel(
                  '• Complete all required fields to get the best internship recommendations',
                  '• सर्वोत्तम इंटर्नशिप सिफारिशें प्राप्त करने के लिए सभी आवश्यक फील्ड पूरे करें'
                )}
              </p>
              <p>
                {getLabel(
                  '• You can always edit your profile later from the dashboard',
                  '• आप बाद में डैशबोर्ड से अपनी प्रोफाइल को हमेशा संपादित कर सकते हैं'
                )}
              </p>
              <p>
                {getLabel(
                  '• Your information is secure and will only be used for internship matching',
                  '• आपकी जानकारी सुरक्षित है और केवल इंटर्नशिप मैचिंग के लिए उपयोग की जाएगी'
                )}
              </p>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              © {new Date()?.getFullYear()} Avsar AI. {getLabel('All rights reserved.', 'सभी अधिकार सुरक्षित।')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfileSetup;