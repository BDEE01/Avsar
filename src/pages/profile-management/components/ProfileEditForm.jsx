import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProfileEditForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  currentLanguage = 'en',
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    educationLevel: '',
    location: '',
    skills: [],
    ...initialData
  });

  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  // Education level options
  const educationOptions = [
    { value: '10th', label: getLabel('10th Pass', '10वीं पास') },
    { value: '12th', label: getLabel('12th Pass', '12वीं पास') },
    { value: 'diploma', label: getLabel('Diploma', 'डिप्लोमा') },
    { value: 'undergraduate', label: getLabel('Undergraduate', 'स्नातक') },
    { value: 'postgraduate', label: getLabel('Postgraduate', 'स्नातकोत्तर') }
  ];

  // Location options
  const locationOptions = [
    { value: 'mumbai', label: getLabel('Mumbai', 'मुंबई') },
    { value: 'delhi', label: getLabel('Delhi', 'दिल्ली') },
    { value: 'bangalore', label: getLabel('Bangalore', 'बैंगलोर') },
    { value: 'pune', label: getLabel('Pune', 'पुणे') },
    { value: 'hyderabad', label: getLabel('Hyderabad', 'हैदराबाद') },
    { value: 'chennai', label: getLabel('Chennai', 'चेन्नई') },
    { value: 'kolkata', label: getLabel('Kolkata', 'कोलकाता') },
    { value: 'ahmedabad', label: getLabel('Ahmedabad', 'अहमदाबाद') }
  ];

  // Skills options
  const skillsOptions = [
    { value: 'web-development', label: getLabel('Web Development', 'वेब डेवलपमेंट') },
    { value: 'digital-marketing', label: getLabel('Digital Marketing', 'डिजिटल मार्केटिंग') },
    { value: 'ai-ml', label: getLabel('AI/ML', 'एआई/एमएल') },
    { value: 'graphic-design', label: getLabel('Graphic Design', 'ग्राफिक डिज़ाइन') },
    { value: 'content-writing', label: getLabel('Content Writing', 'कंटेंट राइटिंग') },
    { value: 'data-analysis', label: getLabel('Data Analysis', 'डेटा एनालिसिस') },
    { value: 'mobile-development', label: getLabel('Mobile Development', 'मोबाइल डेवलपमेंट') },
    { value: 'social-media', label: getLabel('Social Media Management', 'सोशल मीडिया प्रबंधन') }
  ];

  useEffect(() => {
    // Check if form data has changed from initial data
    const hasDataChanged = JSON.stringify(formData) !== JSON.stringify(initialData);
    setHasChanges(hasDataChanged);
  }, [formData, initialData]);

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

  const handleSkillChange = (skillValue, checked) => {
    setFormData(prev => {
      const currentSkills = prev?.skills || [];
      let newSkills;
      
      if (checked) {
        newSkills = [...currentSkills, skillValue];
      } else {
        newSkills = currentSkills?.filter(skill => skill !== skillValue);
      }
      
      return {
        ...prev,
        skills: newSkills
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = getLabel('First name is required', 'पहला नाम आवश्यक है');
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = getLabel('Last name is required', 'अंतिम नाम आवश्यक है');
    }

    if (!formData?.email?.trim()) {
      newErrors.email = getLabel('Email is required', 'ईमेल आवश्यक है');
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = getLabel('Please enter a valid email', 'कृपया एक वैध ईमेल दर्ज करें');
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = getLabel('Phone number is required', 'फोन नंबर आवश्यक है');
    }

    if (!formData?.educationLevel) {
      newErrors.educationLevel = getLabel('Education level is required', 'शिक्षा स्तर आवश्यक है');
    }

    if (!formData?.location) {
      newErrors.location = getLabel('Location is required', 'स्थान आवश्यक है');
    }

    if (!formData?.skills || formData?.skills?.length === 0) {
      newErrors.skills = getLabel('Please select at least one skill', 'कृपया कम से कम एक कौशल चुनें');
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm() && onSubmit) {
      onSubmit(formData);
    }
  };

  const handleCancel = () => {
    setFormData(initialData);
    setErrors({});
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          {getLabel('Edit Profile Information', 'प्रोफाइल जानकारी संपादित करें')}
        </h2>
        <p className="text-muted-foreground">
          {getLabel(
            'Update your information to get better internship recommendations',
            'बेहतर इंटर्नशिप सिफारिशें प्राप्त करने के लिए अपनी जानकारी अपडेट करें'
          )}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
            {getLabel('Personal Information', 'व्यक्तिगत जानकारी')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={getLabel('First Name', 'पहला नाम')}
              type="text"
              value={formData?.firstName}
              onChange={(e) => handleInputChange('firstName', e?.target?.value)}
              error={errors?.firstName}
              required
              placeholder={getLabel('Enter your first name', 'अपना पहला नाम दर्ज करें')}
            />
            
            <Input
              label={getLabel('Last Name', 'अंतिम नाम')}
              type="text"
              value={formData?.lastName}
              onChange={(e) => handleInputChange('lastName', e?.target?.value)}
              error={errors?.lastName}
              required
              placeholder={getLabel('Enter your last name', 'अपना अंतिम नाम दर्ज करें')}
            />
          </div>

          <Input
            label={getLabel('Email Address', 'ईमेल पता')}
            type="email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
            placeholder={getLabel('Enter your email address', 'अपना ईमेल पता दर्ज करें')}
          />

          <Input
            label={getLabel('Phone Number', 'फोन नंबर')}
            type="tel"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            required
            placeholder={getLabel('Enter your phone number', 'अपना फोन नंबर दर्ज करें')}
          />
        </div>

        {/* Education & Location */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
            {getLabel('Education & Location', 'शिक्षा और स्थान')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label={getLabel('Education Level', 'शिक्षा स्तर')}
              options={educationOptions}
              value={formData?.educationLevel}
              onChange={(value) => handleInputChange('educationLevel', value)}
              error={errors?.educationLevel}
              required
              placeholder={getLabel('Select your education level', 'अपना शिक्षा स्तर चुनें')}
            />

            <Select
              label={getLabel('Location', 'स्थान')}
              options={locationOptions}
              value={formData?.location}
              onChange={(value) => handleInputChange('location', value)}
              error={errors?.location}
              required
              searchable
              placeholder={getLabel('Select your location', 'अपना स्थान चुनें')}
            />
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
            {getLabel('Skills', 'कौशल')}
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              {getLabel('Select your skills', 'अपने कौशल चुनें')} *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skillsOptions?.map((skill) => (
                <Checkbox
                  key={skill?.value}
                  label={skill?.label}
                  checked={formData?.skills?.includes(skill?.value) || false}
                  onChange={(e) => handleSkillChange(skill?.value, e?.target?.checked)}
                />
              ))}
            </div>
            {errors?.skills && (
              <p className="text-sm text-error mt-2">{errors?.skills}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            {hasChanges && (
              <>
                <Icon name="AlertCircle" size={16} className="text-warning" />
                <span>{getLabel('You have unsaved changes', 'आपके पास असहेजे परिवर्तन हैं')}</span>
              </>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              <Icon name="X" size={16} className="mr-2" />
              {getLabel('Cancel', 'रद्द करें')}
            </Button>

            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading || !hasChanges}
              iconName="Save"
              iconPosition="left"
            >
              {getLabel('Save Changes', 'परिवर्तन सहेजें')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;