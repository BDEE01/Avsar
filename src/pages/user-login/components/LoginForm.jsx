import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ currentLanguage = 'en', onLanguageChange }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Mock credentials for demonstration
  const mockCredentials = {
    email: 'user@example.com',
    password: 'password123'
  };

  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = getLabel('Email is required', 'ईमेल आवश्यक है');
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = getLabel('Please enter a valid email', 'कृपया एक वैध ईमेल दर्ज करें');
    }

    if (!formData?.password?.trim()) {
      newErrors.password = getLabel('Password is required', 'पासवर्ड आवश्यक है');
    } else if (formData?.password?.length < 6) {
      newErrors.password = getLabel('Password must be at least 6 characters', 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए');
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear field error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Clear login error when user modifies form
    if (loginError) {
      setLoginError('');
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setLoginError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Store user session
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData?.email);
        localStorage.setItem('rememberMe', formData?.rememberMe?.toString());
        
        // Navigate to dashboard or profile setup
        const hasProfile = localStorage.getItem('userProfile');
        if (hasProfile) {
          navigate('/recommendations-dashboard');
        } else {
          navigate('/profile-setup');
        }
      } else {
        setLoginError(getLabel(
          'Invalid email or password. Please try again.',
          'अमान्य ईमेल या पासवर्ड। कृपया पुनः प्रयास करें।'
        ));
      }
    } catch (error) {
      setLoginError(getLabel(
        'Login failed. Please try again later.',
        'लॉगिन असफल। कृपया बाद में पुनः प्रयास करें।'
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // For demo purposes, show alert
    alert(getLabel(
      'Password reset functionality will be implemented soon.',
      'पासवर्ड रीसेट कार्यक्षमता जल्द ही लागू की जाएगी।'
    ));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-lg border border-border p-8 shadow-soft">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="LogIn" size={32} className="text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            {getLabel('Welcome Back', 'वापस स्वागत है')}
          </h1>
          <p className="text-muted-foreground">
            {getLabel('Sign in to your account to continue', 'जारी रखने के लिए अपने खाते में साइन इन करें')}
          </p>
        </div>

        {/* Login Error */}
        {loginError && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
              <p className="text-sm text-error">{loginError}</p>
            </div>
          </div>
        )}

        {/* Demo Credentials Info */}
        <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-primary font-medium mb-1">
                {getLabel('Demo Credentials', 'डेमो क्रेडेंशियल')}
              </p>
              <p className="text-primary/80">
                {getLabel('Email:', 'ईमेल:')} user@example.com<br />
                {getLabel('Password:', 'पासवर्ड:')} password123
              </p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label={getLabel('Email Address', 'ईमेल पता')}
            type="email"
            placeholder={getLabel('Enter your email', 'अपना ईमेल दर्ज करें')}
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
            disabled={isLoading}
          />

          <Input
            label={getLabel('Password', 'पासवर्ड')}
            type="password"
            placeholder={getLabel('Enter your password', 'अपना पासवर्ड दर्ज करें')}
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
            disabled={isLoading}
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label={getLabel('Remember me', 'मुझे याद रखें')}
              checked={formData?.rememberMe}
              onChange={(e) => handleInputChange('rememberMe', e?.target?.checked)}
              disabled={isLoading}
            />

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary/80 transition-micro"
              disabled={isLoading}
            >
              {getLabel('Forgot Password?', 'पासवर्ड भूल गए?')}
            </button>
          </div>

          <Button
            type="submit"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
          >
            <Icon name="LogIn" size={16} className="mr-2" />
            {getLabel('Sign In', 'साइन इन करें')}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-border"></div>
          <span className="px-4 text-sm text-muted-foreground">
            {getLabel('or', 'या')}
          </span>
          <div className="flex-1 border-t border-border"></div>
        </div>

        {/* Create Account Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">
            {getLabel("Don't have an account?", 'खाता नहीं है?')}
          </p>
          <Button
            variant="outline"
            fullWidth
            onClick={() => navigate('/user-registration')}
            disabled={isLoading}
          >
            <Icon name="UserPlus" size={16} className="mr-2" />
            {getLabel('Create Account', 'खाता बनाएं')}
          </Button>
        </div>
      </div>
      {/* Language Toggle */}
      <div className="text-center mt-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onLanguageChange && onLanguageChange(currentLanguage === 'en' ? 'hi' : 'en')}
        >
          <Icon name="Globe" size={16} className="mr-2" />
          {currentLanguage === 'en' ? 'हिंदी में पढ़ें' : 'Read in English'}
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;