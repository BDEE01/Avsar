import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginFooter from './components/LoginFooter';

const UserLogin = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      const hasProfile = localStorage.getItem('userProfile');
      if (hasProfile) {
        navigate('/recommendations-dashboard');
      } else {
        navigate('/profile-setup');
      }
      return;
    }

    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Set page title
    document.title = currentLanguage === 'hi' ?'लॉगिन - Avsar AI' :'Login - Avsar AI';
  }, [navigate, currentLanguage]);

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
    
    // Update page title
    document.title = newLanguage === 'hi' ?'लॉगिन - Avsar AI' :'Login - Avsar AI';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LoginHeader currentLanguage={currentLanguage} />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <LoginForm 
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
          />
        </div>
      </main>
      
      <LoginFooter currentLanguage={currentLanguage} />
    </div>
  );
};

export default UserLogin;