import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewStep = ({ 
  formData, 
  onEdit, 
  currentLanguage = 'en' 
}) => {
  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  const getCompletionPercentage = () => {
    let completed = 0;
    let total = 0;

    // Personal Info (4 fields)
    total += 4;
    if (formData?.personalInfo?.firstName) completed++;
    if (formData?.personalInfo?.lastName) completed++;
    if (formData?.personalInfo?.email) completed++;
    if (formData?.personalInfo?.phone) completed++;

    // Education (3 required fields)
    total += 3;
    if (formData?.education?.level) completed++;
    if (formData?.education?.institution) completed++;
    if (formData?.education?.stream) completed++;

    // Skills (1 required field)
    total += 1;
    if (formData?.skills?.selectedSkills?.length > 0) completed++;

    // Location (2 required fields)
    total += 2;
    if (formData?.location?.currentState) completed++;
    if (formData?.location?.currentCity) completed++;

    return Math.round((completed / total) * 100);
  };

  const completionPercentage = getCompletionPercentage();

  const sections = [
    {
      title: getLabel('Personal Information', 'व्यक्तिगत जानकारी'),
      icon: 'User',
      step: 1,
      data: formData?.personalInfo,
      fields: [
        { key: 'firstName', label: getLabel('First Name', 'पहला नाम') },
        { key: 'lastName', label: getLabel('Last Name', 'अंतिम नाम') },
        { key: 'email', label: getLabel('Email', 'ईमेल') },
        { key: 'phone', label: getLabel('Phone', 'फोन') },
        { key: 'dateOfBirth', label: getLabel('Date of Birth', 'जन्म तिथि') }
      ]
    },
    {
      title: getLabel('Education Details', 'शिक्षा विवरण'),
      icon: 'GraduationCap',
      step: 2,
      data: formData?.education,
      fields: [
        { key: 'level', label: getLabel('Education Level', 'शिक्षा स्तर') },
        { key: 'institution', label: getLabel('Institution', 'संस्थान') },
        { key: 'stream', label: getLabel('Stream', 'स्ट्रीम') },
        { key: 'year', label: getLabel('Year', 'वर्ष') },
        { key: 'percentage', label: getLabel('Percentage/CGPA', 'प्रतिशत/सीजीपीए') }
      ]
    },
    {
      title: getLabel('Skills & Abilities', 'कौशल और क्षमताएं'),
      icon: 'Code',
      step: 3,
      data: formData?.skills,
      fields: [
        { 
          key: 'selectedSkills', 
          label: getLabel('Technical Skills', 'तकनीकी कौशल'),
          isArray: true
        },
        { 
          key: 'softSkills', 
          label: getLabel('Soft Skills', 'सॉफ्ट स्किल्स'),
          isArray: true
        },
        { 
          key: 'languages', 
          label: getLabel('Languages', 'भाषाएं'),
          isArray: true
        }
      ]
    },
    {
      title: getLabel('Location Preferences', 'स्थान प्राथमिकताएं'),
      icon: 'MapPin',
      step: 4,
      data: formData?.location,
      fields: [
        { key: 'currentState', label: getLabel('Current State', 'वर्तमान राज्य') },
        { key: 'currentCity', label: getLabel('Current City', 'वर्तमान शहर') },
        { key: 'pinCode', label: getLabel('Pin Code', 'पिन कोड') },
        { 
          key: 'preferredCities', 
          label: getLabel('Preferred Cities', 'पसंदीदा शहर'),
          isArray: true
        },
        { 
          key: 'workModes', 
          label: getLabel('Work Modes', 'कार्य मोड'),
          isArray: true
        }
      ]
    }
  ];

  const skillLabels = {
    'web-development': getLabel('Web Development', 'वेब डेवलपमेंट'),
    'digital-marketing': getLabel('Digital Marketing', 'डिजिटल मार्केटिंग'),
    'ai-ml': getLabel('AI/ML', 'एआई/एमएल'),
    'graphic-design': getLabel('Graphic Design', 'ग्राफिक डिज़ाइन'),
    'content-writing': getLabel('Content Writing', 'कंटेंट राइटिंग'),
    'data-analysis': getLabel('Data Analysis', 'डेटा विश्लेषण'),
    'mobile-development': getLabel('Mobile Development', 'मोबाइल डेवलपमेंट'),
    'video-editing': getLabel('Video Editing', 'वीडियो एडिटिंग')
  };

  const formatValue = (value, field) => {
    if (!value) return getLabel('Not provided', 'प्रदान नहीं किया गया');
    
    if (field?.isArray) {
      if (Array.isArray(value) && value?.length > 0) {
        if (field?.key === 'selectedSkills') {
          return value?.map(skill => skillLabels?.[skill] || skill)?.join(', ');
        }
        return value?.join(', ');
      }
      return getLabel('None selected', 'कोई चयन नहीं');
    }
    
    return value;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          {getLabel('Review Your Profile', 'अपनी प्रोफाइल की समीक्षा करें')}
        </h2>
        <p className="text-muted-foreground">
          {getLabel('Please review your information before completing your profile', 'अपनी प्रोफाइल पूरी करने से पहले कृपया अपनी जानकारी की समीक्षा करें')}
        </p>
      </div>
      {/* Completion Status */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-foreground">
            {getLabel('Profile Completion', 'प्रोफाइल पूर्णता')}
          </h3>
          <span className="text-2xl font-bold text-primary">{completionPercentage}%</span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3 mb-4">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <Icon 
            name={completionPercentage >= 80 ? "CheckCircle" : "AlertCircle"} 
            size={16} 
            className={completionPercentage >= 80 ? "text-success" : "text-warning"} 
          />
          <span className="text-muted-foreground">
            {completionPercentage >= 80 
              ? getLabel('Your profile is ready for internship matching!', 'आपकी प्रोफाइल इंटर्नशिप मैचिंग के लिए तैयार है!')
              : getLabel('Complete more fields to improve matching accuracy', 'मैचिंग सटीकता में सुधार के लिए अधिक फील्ड पूरे करें')
            }
          </span>
        </div>
      </div>
      {/* Profile Sections */}
      <div className="space-y-6">
        {sections?.map((section) => (
          <div key={section?.step} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground flex items-center">
                <Icon name={section?.icon} size={20} className="mr-2 text-primary" />
                {section?.title}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(section?.step)}
              >
                <Icon name="Edit" size={14} className="mr-1" />
                {getLabel('Edit', 'संपादित करें')}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section?.fields?.map((field) => (
                <div key={field?.key} className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    {field?.label}
                  </label>
                  <p className="text-sm text-foreground">
                    {formatValue(section?.data?.[field?.key], field)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Profile Summary Card */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
          <Icon name="User" size={20} className="mr-2 text-primary" />
          {getLabel('Profile Summary', 'प्रोफाइल सारांश')}
        </h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="User" size={16} className="text-primary" />
            <span className="font-medium text-muted-foreground">
              {getLabel('Name:', 'नाम:')}
            </span>
            <span className="text-foreground">
              {formData?.personalInfo?.firstName} {formData?.personalInfo?.lastName}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="GraduationCap" size={16} className="text-primary" />
            <span className="font-medium text-muted-foreground">
              {getLabel('Education:', 'शिक्षा:')}
            </span>
            <span className="text-foreground">
              {formData?.education?.level} - {formData?.education?.institution}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Code" size={16} className="text-primary" />
            <span className="font-medium text-muted-foreground">
              {getLabel('Skills:', 'कौशल:')}
            </span>
            <span className="text-foreground">
              {formData?.skills?.selectedSkills?.length || 0} {getLabel('technical skills', 'तकनीकी कौशल')}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span className="font-medium text-muted-foreground">
              {getLabel('Location:', 'स्थान:')}
            </span>
            <span className="text-foreground">
              {formData?.location?.currentCity}, {formData?.location?.currentState}
            </span>
          </div>
        </div>
      </div>
      {/* Recommendations Preview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
          <Icon name="Target" size={20} className="mr-2 text-primary" />
          {getLabel('What\'s Next?', 'आगे क्या?')}
        </h3>
        
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <span>
              {getLabel(
                'Your profile will be analyzed by our AI recommendation engine',
                'आपकी प्रोफाइल का विश्लेषण हमारे एआई सिफारिश इंजन द्वारा किया जाएगा'
              )}
            </span>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <span>
              {getLabel(
                'You\'ll receive personalized internship recommendations based on your skills and preferences',
                'आपको अपने कौशल और प्राथमिकताओं के आधार पर व्यक्तिगत इंटर्नशिप सिफारिशें मिलेंगी'
              )}
            </span>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <span>
              {getLabel(
                'You can apply to internships directly through the platform',
                'आप प्लेटफॉर्म के माध्यम से सीधे इंटर्नशिप के लिए आवेदन कर सकते हैं'
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;