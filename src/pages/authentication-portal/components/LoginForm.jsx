import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, loading, error, language }) => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const labels = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to access your internship recommendations',
      identifier: 'Mobile Number or Email',
      identifierPlaceholder: 'Enter mobile number or email',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      forgotPassword: 'Forgot Password?',
      loginButton: 'Sign In',
      identifierRequired: 'Mobile number or email is required',
      passwordRequired: 'Password is required',
      invalidCredentials: 'Invalid credentials. Use: user@example.com / password123'
    },
    hi: {
      title: 'वापस स्वागत है',
      subtitle: 'अपनी इंटर्नशिप सिफारिशों तक पहुंचने के लिए साइन इन करें',
      identifier: 'मोबाइल नंबर या ईमेल',
      identifierPlaceholder: 'मोबाइल नंबर या ईमेल दर्ज करें',
      password: 'पासवर्ड',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      showPassword: 'पासवर्ड दिखाएं',
      hidePassword: 'पासवर्ड छुपाएं',
      forgotPassword: 'पासवर्ड भूल गए?',
      loginButton: 'साइन इन करें',
      identifierRequired: 'मोबाइल नंबर या ईमेल आवश्यक है',
      passwordRequired: 'पासवर्ड आवश्यक है',
      invalidCredentials: 'गलत क्रेडेंशियल। उपयोग करें: user@example.com / password123'
    }
  };

  const t = labels?.[language] || labels?.en;

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors?.[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData?.identifier?.trim()) {
      errors.identifier = t?.identifierRequired;
    }
    
    if (!formData?.password?.trim()) {
      errors.password = t?.passwordRequired;
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
          label={t?.identifier}
          type="text"
          name="identifier"
          placeholder={t?.identifierPlaceholder}
          value={formData?.identifier}
          onChange={handleInputChange}
          error={validationErrors?.identifier}
          required
          className="w-full"
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
            className="w-full pr-12"
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

        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            {t?.forgotPassword}
          </button>
        </div>

        {error && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-3 flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
            <span className="text-sm text-error">{t?.invalidCredentials}</span>
          </div>
        )}

        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={loading}
          iconName="LogIn"
          iconPosition="right"
          fullWidth
          className="mt-6"
        >
          {t?.loginButton}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;