import React from 'react';
import Input from '../../../components/ui/Input';

const PersonalInfoStep = ({ 
  formData, 
  errors, 
  onChange, 
  currentLanguage = 'en' 
}) => {
  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  const handleInputChange = (field, value) => {
    onChange('personalInfo', field, value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          {getLabel('Personal Information', 'व्यक्तिगत जानकारी')}
        </h2>
        <p className="text-muted-foreground">
          {getLabel('Tell us about yourself to get started', 'शुरुआत करने के लिए अपने बारे में बताएं')}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={getLabel('First Name', 'पहला नाम')}
          type="text"
          value={formData?.firstName || ''}
          onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          error={errors?.['personalInfo.firstName']}
          placeholder={getLabel('Enter your first name', 'अपना पहला नाम दर्ज करें')}
          required
        />
        
        <Input
          label={getLabel('Last Name', 'अंतिम नाम')}
          type="text"
          value={formData?.lastName || ''}
          onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          error={errors?.['personalInfo.lastName']}
          placeholder={getLabel('Enter your last name', 'अपना अंतिम नाम दर्ज करें')}
          required
        />
      </div>
      <Input
        label={getLabel('Email Address', 'ईमेल पता')}
        type="email"
        value={formData?.email || ''}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={errors?.['personalInfo.email']}
        placeholder={getLabel('Enter your email address', 'अपना ईमेल पता दर्ज करें')}
        description={getLabel('This will be used for internship communications', 'इसका उपयोग इंटर्नशिप संचार के लिए किया जाएगा')}
        required
      />
      <Input
        label={getLabel('Phone Number', 'फोन नंबर')}
        type="tel"
        value={formData?.phone || ''}
        onChange={(e) => handleInputChange('phone', e?.target?.value)}
        error={errors?.['personalInfo.phone']}
        placeholder={getLabel('Enter your phone number', 'अपना फोन नंबर दर्ज करें')}
        description={getLabel('Include country code (e.g., +91)', 'देश कोड शामिल करें (जैसे, +91)')}
        required
      />
      <Input
        label={getLabel('Date of Birth', 'जन्म तिथि')}
        type="date"
        value={formData?.dateOfBirth || ''}
        onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
        error={errors?.['personalInfo.dateOfBirth']}
        description={getLabel('This helps us find age-appropriate opportunities', 'यह हमें उम्र के अनुकूल अवसर खोजने में मदद करता है')}
      />
    </div>
  );
};

export default PersonalInfoStep;