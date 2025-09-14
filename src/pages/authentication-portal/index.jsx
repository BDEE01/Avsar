import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GovernmentBranding from './components/GovernmentBranding';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuth from './components/SocialAuth';
import LanguageSelector from './components/LanguageSelector';
import Icon from '../../components/AppIcon';

const AuthenticationPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock credentials for demonstration
  const mockCredentials = {
    email: 'user@example.com',
    password: 'password123'
  };

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  const handleLogin = async (formData) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      if (
        (formData?.identifier === mockCredentials?.email || formData?.identifier === '9876543210') &&
        formData?.password === mockCredentials?.password
      ) {
        // Store user session
        localStorage.setItem('userSession', JSON.stringify({
          email: formData?.identifier,
          loginTime: new Date()?.toISOString(),
          language: language
        }));

        // Navigate to recommendations dashboard
        navigate('/internship-recommendations');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Store user data and session
      localStorage.setItem('userProfile', JSON.stringify({
        fullName: formData?.fullName,
        email: formData?.email,
        mobile: formData?.mobile,
        preferredLanguage: formData?.preferredLanguage,
        registrationDate: new Date()?.toISOString()
      }));

      localStorage.setItem('userSession', JSON.stringify({
        email: formData?.email,
        loginTime: new Date()?.toISOString(),
        language: formData?.preferredLanguage
      }));

      // Navigate to profile setup for new users
      navigate('/user-profile-setup');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError('');

    try {
      // Simulate social authentication
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful social login
      localStorage.setItem('userSession', JSON.stringify({
        email: `user@${provider}.gov.in`,
        provider: provider,
        loginTime: new Date()?.toISOString(),
        language: language
      }));

      navigate('/internship-recommendations');
    } catch (err) {
      setError('Social authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const labels = {
    en: {
      pageTitle: 'Authentication Portal - Avsar AI',
      audioHelp: 'Audio assistance available',
      securityNote: 'Your data is secure and encrypted'
    },
    hi: {
      pageTitle: 'प्रमाणीकरण पोर्टल - अवसर एआई',
      audioHelp: 'ऑडियो सहायता उपलब्ध',
      securityNote: 'आपका डेटा सुरक्षित और एन्क्रिप्टेड है'
    }
  };

  const t = labels?.[language] || labels?.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 relative">
      {/* Language Selector */}
      <LanguageSelector 
        currentLanguage={language} 
        onLanguageChange={handleLanguageChange} 
      />
      {/* Audio Help Button */}
      <div className="absolute top-4 left-4">
        <button
          className="flex items-center space-x-2 px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-colors"
          title={t?.audioHelp}
        >
          <Icon name="Volume2" size={16} />
          <span className="hidden sm:inline">{t?.audioHelp}</span>
        </button>
      </div>
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Government Branding */}
          <GovernmentBranding language={language} />

          {/* Authentication Card */}
          <div className="bg-surface border border-border rounded-2xl shadow-elevated p-8">
            {/* Tab Navigation */}
            <AuthTabs 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
              language={language} 
            />

            {/* Form Content */}
            <div className="transition-all duration-300">
              {activeTab === 'login' ? (
                <LoginForm
                  onSubmit={handleLogin}
                  loading={loading}
                  error={error}
                  language={language}
                />
              ) : (
                <RegisterForm
                  onSubmit={handleRegister}
                  loading={loading}
                  error={error}
                  language={language}
                />
              )}
            </div>

            {/* Social Authentication */}
            <SocialAuth 
              language={language} 
              onSocialLogin={handleSocialLogin} 
            />
          </div>

          {/* Security Note */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-xs text-text-secondary">
              <Icon name="Lock" size={14} className="text-success" />
              <span>{t?.securityNote}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-text-secondary">
            <p>© {new Date()?.getFullYear()} Government of India. All rights reserved.</p>
            <p className="mt-1">PM Internship Scheme - Digital India Initiative</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPortal;