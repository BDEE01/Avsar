import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSubmit, loading, error, language }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    preferredLanguage: 'en',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const labels = {
    en: {
      title: 'Create Account',
      subtitle: 'Join the PM Internship Scheme platform',
      fullName: 'Full Name',
      fullNamePlaceholder: 'Enter your full name',
      email: 'Email Address',
      emailPlaceholder: 'Enter your email address',
      mobile: 'Mobile Number',
      mobilePlaceholder: 'Enter your mobile number',
      password: 'Password',
      passwordPlaceholder: 'Create a password',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Confirm your password',
      preferredLanguage: 'Preferred Language',
      agreeToTerms: 'I agree to the Terms & Conditions and Privacy Policy',
      registerButton: 'Create Account',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      nameRequired: 'Full name is required',
      emailRequired: 'Email address is required',
      emailInvalid: 'Please enter a valid email address',
      mobileRequired: 'Mobile number is required',
      mobileInvalid: 'Please enter a valid 10-digit mobile number',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must be at least 8 characters',
      confirmPasswordRequired: 'Please confirm your password',
      passwordMismatch: 'Passwords do not match',
      termsRequired: 'Please accept the terms and conditions',
      registrationError: 'Registration failed. Please try again.'
    },
    hi: {
      title: 'खाता बनाएं',
      subtitle: 'पीएम इंटर्नशिप योजना प्लेटफॉर्म में शामिल हों',
      fullName: 'पूरा नाम',
      fullNamePlaceholder: 'अपना पूरा नाम दर्ज करें',
      email: 'ईमेल पता',
      emailPlaceholder: 'अपना ईमेल पता दर्ज करें',
      mobile: 'मोबाइल नंबर',
      mobilePlaceholder: 'अपना मोबाइल नंबर दर्ज करें',
      password: 'पासवर्ड',
      passwordPlaceholder: 'एक पासवर्ड बनाएं',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      confirmPasswordPlaceholder: 'अपने पासवर्ड की पुष्टि करें',
      preferredLanguage: 'पसंदीदा भाषा',
      agreeToTerms: 'मैं नियम और शर्तों और गोपनीयता नीति से सहमत हूं',
      registerButton: 'खाता बनाएं',
      showPassword: 'पासवर्ड दिखाएं',
      hidePassword: 'पासवर्ड छुपाएं',
      nameRequired: 'पूरा नाम आवश्यक है',
      emailRequired: 'ईमेल पता आवश्यक है',
      emailInvalid: 'कृपया एक वैध ईमेल पता दर्ज करें',
      mobileRequired: 'मोबाइल नंबर आवश्यक है',
      mobileInvalid: 'कृपया एक वैध 10-अंकीय मोबाइल नंबर दर्ज करें',
      passwordRequired: 'पासवर्ड आवश्यक है',
      passwordMinLength: 'पासवर्ड कम से कम 8 अक्षर का होना चाहिए',
      confirmPasswordRequired: 'कृपया अपने पासवर्ड की पुष्टि करें',
      passwordMismatch: 'पासवर्ड मेल नहीं खाते',
      termsRequired: 'कृपया नियम और शर्तों को स्वीकार करें',
      registrationError: 'पंजीकरण असफल। कृपया पुनः प्रयास करें।'
    }
  };

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिंदी (Hindi)' }
  ];

  const t = labels?.[language] || labels?.en;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors?.[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, preferredLanguage: value }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData?.fullName?.trim()) {
      errors.fullName = t?.nameRequired;
    }
    
    if (!formData?.email?.trim()) {
      errors.email = t?.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      errors.email = t?.emailInvalid;
    }
    
    if (!formData?.mobile?.trim()) {
      errors.mobile = t?.mobileRequired;
    } else if (!/^[6-9]\d{9}$/?.test(formData?.mobile)) {
      errors.mobile = t?.mobileInvalid;
    }
    
    if (!formData?.password?.trim()) {
      errors.password = t?.passwordRequired;
    } else if (formData?.password?.length < 8) {
      errors.password = t?.passwordMinLength;
    }
    
    if (!formData?.confirmPassword?.trim()) {
      errors.confirmPassword = t?.confirmPasswordRequired;
    } else if (formData?.password !== formData?.confirmPassword) {
      errors.confirmPassword = t?.passwordMismatch;
    }
    
    if (!formData?.agreeToTerms) {
      errors.agreeToTerms = t?.termsRequired;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-text-primary mb-2">
          {t?.title}
        </h2>
        <p className="text-text-secondary text-sm">
          {t?.subtitle}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label={t?.fullName}
          type="text"
          name="fullName"
          placeholder={t?.fullNamePlaceholder}
          value={formData?.fullName}
          onChange={handleInputChange}
          error={validationErrors?.fullName}
          required
        />

        <Input
          label={t?.email}
          type="email"
          name="email"
          placeholder={t?.emailPlaceholder}
          value={formData?.email}
          onChange={handleInputChange}
          error={validationErrors?.email}
          required
        />

        <Input
          label={t?.mobile}
          type="tel"
          name="mobile"
          placeholder={t?.mobilePlaceholder}
          value={formData?.mobile}
          onChange={handleInputChange}
          error={validationErrors?.mobile}
          required
        />

        <div className="relative">
          <Input
            label={t?.password}
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder={t?.passwordPlaceholder}
            value={formData?.password}
            onChange={handleInputChange}
            error={validationErrors?.password}
            required
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-colors"
            title={showPassword ? t?.hidePassword : t?.showPassword}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>

        <div className="relative">
          <Input
            label={t?.confirmPassword}
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder={t?.confirmPasswordPlaceholder}
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            error={validationErrors?.confirmPassword}
            required
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-colors"
            title={showConfirmPassword ? t?.hidePassword : t?.showPassword}
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>

        <Select
          label={t?.preferredLanguage}
          options={languageOptions}
          value={formData?.preferredLanguage}
          onChange={handleSelectChange}
        />

        <Checkbox
          label={t?.agreeToTerms}
          checked={formData?.agreeToTerms}
          onChange={handleInputChange}
          name="agreeToTerms"
          error={validationErrors?.agreeToTerms}
          required
        />

        {error && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-3 flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
            <span className="text-sm text-error">{t?.registrationError}</span>
          </div>
        )}

        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={loading}
          iconName="UserPlus"
          iconPosition="right"
          fullWidth
          className="mt-6"
        >
          {t?.registerButton}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;