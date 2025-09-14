import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import RegistrationForm from './components/RegistrationForm';
import SuccessMessage from './components/SuccessMessage';
import ErrorMessage from './components/ErrorMessage';
import LoginRedirect from './components/LoginRedirect';
import LanguageToggle from './components/LanguageToggle';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [registrationState, setRegistrationState] = useState('form'); // 'form', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null);

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['en', 'hi']?.includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  const handleRegistration = async (formData) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock validation - check if email already exists
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const emailExists = existingUsers?.some(user => user?.email === formData?.email);

      if (emailExists) {
        throw new Error(getLabel(
          'An account with this email already exists. Please use a different email or sign in.',
          'इस ईमेल के साथ पहले से एक खाता मौजूद है। कृपया दूसरा ईमेल उपयोग करें या साइन इन करें।'
        ));
      }

      // Create new user
      const newUser = {
        id: Date.now()?.toString(),
        fullName: formData?.fullName,
        email: formData?.email,
        password: formData?.password, // In real app, this would be hashed
        createdAt: new Date()?.toISOString(),
        profileCompleted: false
      };

      // Save to localStorage
      existingUsers?.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
      localStorage.setItem('currentUser', JSON.stringify(newUser));

      setUserData(newUser);
      setRegistrationState('success');
    } catch (error) {
      setErrorMessage(error?.message);
      setRegistrationState('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueToProfile = () => {
    navigate('/profile-setup');
  };

  const handleRetry = () => {
    setRegistrationState('form');
    setErrorMessage('');
  };

  const handleDismissError = () => {
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        isAuthenticated={false}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />
      <main className="pt-16">
        <div className="max-w-md mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-primary"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {getLabel('Join Avsar AI', 'अवसर AI में शामिल हों')}
            </h1>
            <p className="text-muted-foreground">
              {getLabel(
                'Create your account to discover personalized internship opportunities',
                'व्यक्तिगत इंटर्नशिप अवसरों की खोज के लिए अपना खाता बनाएं'
              )}
            </p>
          </div>

          {/* Language Toggle */}
          <LanguageToggle 
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
          />

          {/* Error Message */}
          {registrationState === 'error' && errorMessage && (
            <div className="mb-6">
              <ErrorMessage
                message={errorMessage}
                onRetry={handleRetry}
                onDismiss={handleDismissError}
                currentLanguage={currentLanguage}
              />
            </div>
          )}

          {/* Main Content */}
          <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
            {registrationState === 'form' && (
              <>
                <RegistrationForm
                  onSubmit={handleRegistration}
                  isLoading={isLoading}
                  currentLanguage={currentLanguage}
                />
                
                <div className="mt-6">
                  <LoginRedirect currentLanguage={currentLanguage} />
                </div>
              </>
            )}

            {registrationState === 'success' && (
              <SuccessMessage
                message={getLabel(
                  'Registration successful! Welcome to Avsar AI.',
                  'पंजीकरण सफल! अवसर AI में आपका स्वागत है।'
                )}
                onContinue={handleContinueToProfile}
                currentLanguage={currentLanguage}
              />
            )}
          </div>

          {/* Additional Information */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              {getLabel(
                'By creating an account, you agree to our Terms of Service and Privacy Policy',
                'खाता बनाकर, आप हमारी सेवा की शर्तों और गोपनीयता नीति से सहमत हैं'
              )}
            </p>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date()?.getFullYear()} Avsar AI. {getLabel('All rights reserved.', 'सभी अधिकार सुरक्षित।')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default UserRegistration;