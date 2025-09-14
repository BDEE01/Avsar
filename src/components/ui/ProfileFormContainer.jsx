import React, { useState, useEffect } from 'react';
import Input from './Input';
import Select from './Select';
import { Checkbox } from './Checkbox';
import Button from './Button';
import Icon from '../AppIcon';

const ProfileFormContainer = ({
  initialData = {},
  onSubmit,
  onCancel,
  currentLanguage = 'en',
  isLoading = false,
  mode = 'setup' // 'setup' or 'edit'
}) => {
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      ...initialData?.personalInfo
    },
    education: {
      currentLevel: '',
      institution: '',
      course: '',
      year: '',
      percentage: '',
      ...initialData?.education
    },
    skills: {
      technical: [],
      soft: [],
      languages: [],
      ...initialData?.skills
    },
    preferences: {
      internshipType: [],
      duration: '',
      location: [],
      stipendRange: '',
      workMode: '',
      ...initialData?.preferences
    },
    experience: {
      hasExperience: false,
      experiences: [],
      ...initialData?.experience
    }
  });

  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  // Form options
  const educationLevels = [
    { value: '10th', label: '10th Grade', labelHi: '10वीं कक्षा' },
    { value: '12th', label: '12th Grade', labelHi: '12वीं कक्षा' },
    { value: 'diploma', label: 'Diploma', labelHi: 'डिप्लोमा' },
    { value: 'undergraduate', label: 'Undergraduate', labelHi: 'स्नातक' },
    { value: 'postgraduate', label: 'Postgraduate', labelHi: 'स्नातकोत्तर' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male', labelHi: 'पुरुष' },
    { value: 'female', label: 'Female', labelHi: 'महिला' },
    { value: 'other', label: 'Other', labelHi: 'अन्य' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say', labelHi: 'कहना नहीं चाहते' }
  ];

  const technicalSkills = [
    { value: 'javascript', label: 'JavaScript', labelHi: 'जावास्क्रिप्ट' },
    { value: 'python', label: 'Python', labelHi: 'पायथन' },
    { value: 'react', label: 'React', labelHi: 'रिएक्ट' },
    { value: 'nodejs', label: 'Node.js', labelHi: 'नोड.जेएस' },
    { value: 'html-css', label: 'HTML/CSS', labelHi: 'एचटीएमएल/सीएसएस' },
    { value: 'sql', label: 'SQL', labelHi: 'एसक्यूएल' },
    { value: 'java', label: 'Java', labelHi: 'जावा' },
    { value: 'photoshop', label: 'Photoshop', labelHi: 'फोटोशॉप' }
  ];

  const softSkills = [
    { value: 'communication', label: 'Communication', labelHi: 'संचार' },
    { value: 'teamwork', label: 'Teamwork', labelHi: 'टीम वर्क' },
    { value: 'leadership', label: 'Leadership', labelHi: 'नेतृत्व' },
    { value: 'problem-solving', label: 'Problem Solving', labelHi: 'समस्या समाधान' },
    { value: 'creativity', label: 'Creativity', labelHi: 'रचनात्मकता' },
    { value: 'time-management', label: 'Time Management', labelHi: 'समय प्रबंधन' }
  ];

  const internshipTypes = [
    { value: 'technology', label: 'Technology', labelHi: 'प्रौद्योगिकी' },
    { value: 'marketing', label: 'Marketing', labelHi: 'मार्केटिंग' },
    { value: 'finance', label: 'Finance', labelHi: 'वित्त' },
    { value: 'design', label: 'Design', labelHi: 'डिज़ाइन' },
    { value: 'content', label: 'Content Writing', labelHi: 'कंटेंट राइटिंग' },
    { value: 'sales', label: 'Sales', labelHi: 'बिक्री' }
  ];

  const locationOptions = [
    { value: 'mumbai', label: 'Mumbai', labelHi: 'मुंबई' },
    { value: 'delhi', label: 'Delhi', labelHi: 'दिल्ली' },
    { value: 'bangalore', label: 'Bangalore', labelHi: 'बैंगलोर' },
    { value: 'pune', label: 'Pune', labelHi: 'पुणे' },
    { value: 'hyderabad', label: 'Hyderabad', labelHi: 'हैदराबाद' },
    { value: 'chennai', label: 'Chennai', labelHi: 'चेन्नई' }
  ];

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [field]: value
      }
    }));

    // Clear error when user starts typing
    if (errors?.[`${section}.${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`${section}.${field}`]: ''
      }));
    }
  };

  const handleArrayChange = (section, field, value, checked) => {
    setFormData(prev => {
      const currentArray = prev?.[section]?.[field] || [];
      let newArray;
      
      if (checked) {
        newArray = [...currentArray, value];
      } else {
        newArray = currentArray?.filter(item => item !== value);
      }
      
      return {
        ...prev,
        [section]: {
          ...prev?.[section],
          [field]: newArray
        }
      };
    });
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
        }
        if (!formData?.personalInfo?.phone?.trim()) {
          newErrors['personalInfo.phone'] = getLabel('Phone number is required', 'फोन नंबर आवश्यक है');
        }
        break;

      case 2: // Education
        if (!formData?.education?.currentLevel) {
          newErrors['education.currentLevel'] = getLabel('Education level is required', 'शिक्षा स्तर आवश्यक है');
        }
        if (!formData?.education?.institution?.trim()) {
          newErrors['education.institution'] = getLabel('Institution name is required', 'संस्थान का नाम आवश्यक है');
        }
        break;

      case 3: // Skills
        if (formData?.skills?.technical?.length === 0) {
          newErrors['skills.technical'] = getLabel('Select at least one technical skill', 'कम से कम एक तकनीकी कौशल चुनें');
        }
        break;

      case 4: // Preferences
        if (formData?.preferences?.internshipType?.length === 0) {
          newErrors['preferences.internshipType'] = getLabel('Select at least one internship type', 'कम से कम एक इंटर्नशिप प्रकार चुनें');
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

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateStep(currentStep) && onSubmit) {
      onSubmit(formData);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={getLabel('First Name', 'पहला नाम')}
                type="text"
                value={formData?.personalInfo?.firstName}
                onChange={(e) => handleInputChange('personalInfo', 'firstName', e?.target?.value)}
                error={errors?.['personalInfo.firstName']}
                required
              />
              <Input
                label={getLabel('Last Name', 'अंतिम नाम')}
                type="text"
                value={formData?.personalInfo?.lastName}
                onChange={(e) => handleInputChange('personalInfo', 'lastName', e?.target?.value)}
                error={errors?.['personalInfo.lastName']}
                required
              />
            </div>
            <Input
              label={getLabel('Email Address', 'ईमेल पता')}
              type="email"
              value={formData?.personalInfo?.email}
              onChange={(e) => handleInputChange('personalInfo', 'email', e?.target?.value)}
              error={errors?.['personalInfo.email']}
              required
            />
            <Input
              label={getLabel('Phone Number', 'फोन नंबर')}
              type="tel"
              value={formData?.personalInfo?.phone}
              onChange={(e) => handleInputChange('personalInfo', 'phone', e?.target?.value)}
              error={errors?.['personalInfo.phone']}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={getLabel('Date of Birth', 'जन्म तिथि')}
                type="date"
                value={formData?.personalInfo?.dateOfBirth}
                onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e?.target?.value)}
              />
              <Select
                label={getLabel('Gender', 'लिंग')}
                options={genderOptions?.map(option => ({
                  value: option?.value,
                  label: getLabel(option?.label, option?.labelHi)
                }))}
                value={formData?.personalInfo?.gender}
                onChange={(value) => handleInputChange('personalInfo', 'gender', value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Select
              label={getLabel('Current Education Level', 'वर्तमान शिक्षा स्तर')}
              options={educationLevels?.map(option => ({
                value: option?.value,
                label: getLabel(option?.label, option?.labelHi)
              }))}
              value={formData?.education?.currentLevel}
              onChange={(value) => handleInputChange('education', 'currentLevel', value)}
              error={errors?.['education.currentLevel']}
              required
            />
            <Input
              label={getLabel('Institution/School Name', 'संस्थान/स्कूल का नाम')}
              type="text"
              value={formData?.education?.institution}
              onChange={(e) => handleInputChange('education', 'institution', e?.target?.value)}
              error={errors?.['education.institution']}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={getLabel('Course/Stream', 'कोर्स/स्ट्रीम')}
                type="text"
                value={formData?.education?.course}
                onChange={(e) => handleInputChange('education', 'course', e?.target?.value)}
              />
              <Input
                label={getLabel('Year of Study', 'अध्ययन का वर्ष')}
                type="text"
                value={formData?.education?.year}
                onChange={(e) => handleInputChange('education', 'year', e?.target?.value)}
              />
            </div>
            <Input
              label={getLabel('Percentage/CGPA', 'प्रतिशत/सीजीपीए')}
              type="text"
              value={formData?.education?.percentage}
              onChange={(e) => handleInputChange('education', 'percentage', e?.target?.value)}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                {getLabel('Technical Skills', 'तकनीकी कौशल')} *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {technicalSkills?.map((skill) => (
                  <Checkbox
                    key={skill?.value}
                    label={getLabel(skill?.label, skill?.labelHi)}
                    checked={formData?.skills?.technical?.includes(skill?.value)}
                    onChange={(e) => handleArrayChange('skills', 'technical', skill?.value, e?.target?.checked)}
                  />
                ))}
              </div>
              {errors?.['skills.technical'] && (
                <p className="text-sm text-error mt-1">{errors?.['skills.technical']}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                {getLabel('Soft Skills', 'सॉफ्ट स्किल्स')}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {softSkills?.map((skill) => (
                  <Checkbox
                    key={skill?.value}
                    label={getLabel(skill?.label, skill?.labelHi)}
                    checked={formData?.skills?.soft?.includes(skill?.value)}
                    onChange={(e) => handleArrayChange('skills', 'soft', skill?.value, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                {getLabel('Preferred Internship Types', 'पसंदीदा इंटर्नशिप प्रकार')} *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {internshipTypes?.map((type) => (
                  <Checkbox
                    key={type?.value}
                    label={getLabel(type?.label, type?.labelHi)}
                    checked={formData?.preferences?.internshipType?.includes(type?.value)}
                    onChange={(e) => handleArrayChange('preferences', 'internshipType', type?.value, e?.target?.checked)}
                  />
                ))}
              </div>
              {errors?.['preferences.internshipType'] && (
                <p className="text-sm text-error mt-1">{errors?.['preferences.internshipType']}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label={getLabel('Preferred Duration', 'पसंदीदा अवधि')}
                options={[
                  { value: '1-3', label: getLabel('1-3 months', '1-3 महीने') },
                  { value: '3-6', label: getLabel('3-6 months', '3-6 महीने') },
                  { value: '6+', label: getLabel('6+ months', '6+ महीने') }
                ]}
                value={formData?.preferences?.duration}
                onChange={(value) => handleInputChange('preferences', 'duration', value)}
              />
              <Select
                label={getLabel('Work Mode', 'कार्य मोड')}
                options={[
                  { value: 'remote', label: getLabel('Remote', 'रिमोट') },
                  { value: 'office', label: getLabel('Office', 'ऑफिस') },
                  { value: 'hybrid', label: getLabel('Hybrid', 'हाइब्रिड') }
                ]}
                value={formData?.preferences?.workMode}
                onChange={(value) => handleInputChange('preferences', 'workMode', value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                {getLabel('Preferred Locations', 'पसंदीदा स्थान')}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {locationOptions?.map((location) => (
                  <Checkbox
                    key={location?.value}
                    label={getLabel(location?.label, location?.labelHi)}
                    checked={formData?.preferences?.location?.includes(location?.value)}
                    onChange={(e) => handleArrayChange('preferences', 'location', location?.value, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Checkbox
                label={getLabel('I have prior work/internship experience', 'मेरे पास पूर्व कार्य/इंटर्नशिप अनुभव है')}
                checked={formData?.experience?.hasExperience}
                onChange={(e) => handleInputChange('experience', 'hasExperience', e?.target?.checked)}
              />
            </div>
            {formData?.experience?.hasExperience && (
              <div className="space-y-4 p-4 bg-muted rounded-lg">
                <h4 className="font-medium text-foreground">
                  {getLabel('Experience Details', 'अनुभव विवरण')}
                </h4>
                <Input
                  label={getLabel('Company/Organization', 'कंपनी/संगठन')}
                  type="text"
                  placeholder={getLabel('Enter company name', 'कंपनी का नाम दर्ज करें')}
                />
                <Input
                  label={getLabel('Role/Position', 'भूमिका/पद')}
                  type="text"
                  placeholder={getLabel('Enter your role', 'अपनी भूमिका दर्ज करें')}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label={getLabel('Start Date', 'प्रारंभ तिथि')}
                    type="date"
                  />
                  <Input
                    label={getLabel('End Date', 'समाप्ति तिथि')}
                    type="date"
                  />
                </div>
              </div>
            )}
            {/* Summary */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-4">
                {getLabel('Profile Summary', 'प्रोफाइल सारांश')}
              </h4>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">
                    {getLabel('Name:', 'नाम:')}
                  </span>
                  <span className="ml-2 text-foreground">
                    {formData?.personalInfo?.firstName} {formData?.personalInfo?.lastName}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">
                    {getLabel('Education:', 'शिक्षा:')}
                  </span>
                  <span className="ml-2 text-foreground">
                    {formData?.education?.currentLevel} - {formData?.education?.institution}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">
                    {getLabel('Skills:', 'कौशल:')}
                  </span>
                  <span className="ml-2 text-foreground">
                    {formData?.skills?.technical?.length} technical, {formData?.skills?.soft?.length} soft skills
                  </span>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">
                    {getLabel('Interests:', 'रुचियां:')}
                  </span>
                  <span className="ml-2 text-foreground">
                    {formData?.preferences?.internshipType?.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {getLabel(`Step ${currentStep} of ${totalSteps}`, `चरण ${currentStep} का ${totalSteps}`)}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round((currentStep / totalSteps) * 100)}% {getLabel('complete', 'पूर्ण')}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Titles */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          {currentStep === 1 && getLabel('Personal Information', 'व्यक्तिगत जानकारी')}
          {currentStep === 2 && getLabel('Education Details', 'शिक्षा विवरण')}
          {currentStep === 3 && getLabel('Skills & Abilities', 'कौशल और क्षमताएं')}
          {currentStep === 4 && getLabel('Preferences', 'प्राथमिकताएं')}
          {currentStep === 5 && getLabel('Experience & Review', 'अनुभव और समीक्षा')}
        </h2>
        <p className="text-muted-foreground">
          {currentStep === 1 && getLabel('Tell us about yourself', 'अपने बारे में बताएं')}
          {currentStep === 2 && getLabel('Share your educational background', 'अपनी शैक्षणिक पृष्ठभूमि साझा करें')}
          {currentStep === 3 && getLabel('What skills do you have?', 'आपके पास कौन से कौशल हैं?')}
          {currentStep === 4 && getLabel('What kind of internships interest you?', 'आपको किस प्रकार की इंटर्नशिप में रुचि है?')}
          {currentStep === 5 && getLabel('Review and complete your profile', 'अपनी प्रोफाइल की समीक्षा करें और पूरी करें')}
        </p>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderStepContent()}

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
            {onCancel && (
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
                disabled={isLoading}
              >
                {getLabel('Cancel', 'रद्द करें')}
              </Button>
            )}

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
                {mode === 'setup' ? getLabel('Complete Profile', 'प्रोफाइल पूरी करें')
                  : getLabel('Save Changes', 'परिवर्तन सहेजें')
                }
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileFormContainer;