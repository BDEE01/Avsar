import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ onSubmit, isLoading, currentLanguage = 'en' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = getLabel('Full name is required', 'पूरा नाम आवश्यक है');
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = getLabel('Name must be at least 2 characters', 'नाम कम से कम 2 अक्षर का होना चाहिए');
    }

    // Email validation
    if (!formData?.email?.trim()) {
      newErrors.email = getLabel('Email address is required', 'ईमेल पता आवश्यक है');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = getLabel('Please enter a valid email address', 'कृपया एक वैध ईमेल पता दर्ज करें');
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = getLabel('Password is required', 'पासवर्ड आवश्यक है');
    } else if (formData?.password?.length < 8) {
      newErrors.password = getLabel('Password must be at least 8 characters', 'पासवर्ड कम से कम 8 अक्षर का होना चाहिए');
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
      newErrors.password = getLabel(
        'Password must contain uppercase, lowercase, and number',
        'पासवर्ड में बड़े अक्षर, छोटे अक्षर और संख्या होनी चाहिए'
      );
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm() && onSubmit) {
      onSubmit(formData);
    }
  };

  const getPasswordStrength = () => {
    const password = formData?.password;
    if (!password) return { strength: 0, label: '' };

    let strength = 0;
    let label = '';

    if (password?.length >= 8) strength += 1;
    if (/[a-z]/?.test(password)) strength += 1;
    if (/[A-Z]/?.test(password)) strength += 1;
    if (/\d/?.test(password)) strength += 1;
    if (/[^a-zA-Z\d]/?.test(password)) strength += 1;

    switch (strength) {
      case 0:
      case 1:
        label = getLabel('Weak', 'कमजोर');
        break;
      case 2:
      case 3:
        label = getLabel('Medium', 'मध्यम');
        break;
      case 4:
      case 5:
        label = getLabel('Strong', 'मजबूत');
        break;
      default:
        label = '';
    }

    return { strength, label };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label={getLabel('Full Name / पूरा नाम', 'पूरा नाम / Full Name')}
        type="text"
        placeholder={getLabel('Enter your full name', 'अपना पूरा नाम दर्ज करें')}
        value={formData?.fullName}
        onChange={(e) => handleInputChange('fullName', e?.target?.value)}
        error={errors?.fullName}
        required
        disabled={isLoading}
      />
      <Input
        label={getLabel('Email Address / ईमेल पता', 'ईमेल पता / Email Address')}
        type="email"
        placeholder={getLabel('Enter your email address', 'अपना ईमेल पता दर्ज करें')}
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={errors?.email}
        required
        disabled={isLoading}
      />
      <div className="space-y-2">
        <div className="relative">
          <Input
            label={getLabel('Password / पासवर्ड', 'पासवर्ड / Password')}
            type={showPassword ? 'text' : 'password'}
            placeholder={getLabel('Create a strong password', 'एक मजबूत पासवर्ड बनाएं')}
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-micro"
            disabled={isLoading}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>

        {/* Password Strength Indicator */}
        {formData?.password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {getLabel('Password Strength', 'पासवर्ड की मजबूती')}
              </span>
              <span className={`text-xs font-medium ${
                passwordStrength?.strength <= 2 ? 'text-error' : 
                passwordStrength?.strength <= 3 ? 'text-warning' : 'text-success'
              }`}>
                {passwordStrength?.label}
              </span>
            </div>
            <div className="flex space-x-1">
              {[...Array(5)]?.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full ${
                    index < passwordStrength?.strength
                      ? passwordStrength?.strength <= 2 ? 'bg-error' :
                        passwordStrength?.strength <= 3 ? 'bg-warning': 'bg-success' :'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Button
        type="submit"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        {getLabel('Create Account', 'खाता बनाएं')}
      </Button>
      {/* Password Requirements */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p className="font-medium">
          {getLabel('Password Requirements:', 'पासवर्ड आवश्यकताएं:')}
        </p>
        <ul className="space-y-1 ml-4">
          <li className={`flex items-center space-x-2 ${
            formData?.password?.length >= 8 ? 'text-success' : ''
          }`}>
            <Icon 
              name={formData?.password?.length >= 8 ? 'Check' : 'X'} 
              size={12} 
            />
            <span>{getLabel('At least 8 characters', 'कम से कम 8 अक्षर')}</span>
          </li>
          <li className={`flex items-center space-x-2 ${
            /[A-Z]/?.test(formData?.password) ? 'text-success' : ''
          }`}>
            <Icon 
              name={/[A-Z]/?.test(formData?.password) ? 'Check' : 'X'} 
              size={12} 
            />
            <span>{getLabel('One uppercase letter', 'एक बड़ा अक्षर')}</span>
          </li>
          <li className={`flex items-center space-x-2 ${
            /[a-z]/?.test(formData?.password) ? 'text-success' : ''
          }`}>
            <Icon 
              name={/[a-z]/?.test(formData?.password) ? 'Check' : 'X'} 
              size={12} 
            />
            <span>{getLabel('One lowercase letter', 'एक छोटा अक्षर')}</span>
          </li>
          <li className={`flex items-center space-x-2 ${
            /\d/?.test(formData?.password) ? 'text-success' : ''
          }`}>
            <Icon 
              name={/\d/?.test(formData?.password) ? 'Check' : 'X'} 
              size={12} 
            />
            <span>{getLabel('One number', 'एक संख्या')}</span>
          </li>
        </ul>
      </div>
    </form>
  );
};

export default RegistrationForm;