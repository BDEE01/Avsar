import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const EducationStep = ({ 
  formData, 
  errors, 
  onChange, 
  currentLanguage = 'en' 
}) => {
  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  const handleInputChange = (field, value) => {
    onChange('education', field, value);
  };

  const educationLevels = [
    { value: '10th', label: getLabel('10th Grade (Matriculation)', '10वीं कक्षा (मैट्रिकुलेशन)') },
    { value: '12th', label: getLabel('12th Grade (Intermediate)', '12वीं कक्षा (इंटरमीडिएट)') },
    { value: 'diploma', label: getLabel('Diploma', 'डिप्लोमा') },
    { value: 'undergraduate', label: getLabel('Undergraduate (Bachelor\'s)', 'स्नातक (बैचलर्स)') },
    { value: 'postgraduate', label: getLabel('Postgraduate (Master\'s)', 'स्नातकोत्तर (मास्टर्स)') }
  ];

  const streams = [
    { value: 'science', label: getLabel('Science', 'विज्ञान') },
    { value: 'commerce', label: getLabel('Commerce', 'वाणिज्य') },
    { value: 'arts', label: getLabel('Arts/Humanities', 'कला/मानविकी') },
    { value: 'engineering', label: getLabel('Engineering', 'इंजीनियरिंग') },
    { value: 'medical', label: getLabel('Medical', 'चिकित्सा') },
    { value: 'management', label: getLabel('Management', 'प्रबंधन') },
    { value: 'other', label: getLabel('Other', 'अन्य') }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          {getLabel('Education Details', 'शिक्षा विवरण')}
        </h2>
        <p className="text-muted-foreground">
          {getLabel('Share your educational background', 'अपनी शैक्षणिक पृष्ठभूमि साझा करें')}
        </p>
      </div>
      <Select
        label={getLabel('Current Education Level', 'वर्तमान शिक्षा स्तर')}
        options={educationLevels}
        value={formData?.level || ''}
        onChange={(value) => handleInputChange('level', value)}
        error={errors?.['education.level']}
        placeholder={getLabel('Select your education level', 'अपना शिक्षा स्तर चुनें')}
        required
      />
      <Input
        label={getLabel('Institution/School Name', 'संस्थान/स्कूल का नाम')}
        type="text"
        value={formData?.institution || ''}
        onChange={(e) => handleInputChange('institution', e?.target?.value)}
        error={errors?.['education.institution']}
        placeholder={getLabel('Enter your school/college name', 'अपने स्कूल/कॉलेज का नाम दर्ज करें')}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label={getLabel('Stream/Field', 'स्ट्रीम/क्षेत्र')}
          options={streams}
          value={formData?.stream || ''}
          onChange={(value) => handleInputChange('stream', value)}
          error={errors?.['education.stream']}
          placeholder={getLabel('Select your stream', 'अपनी स्ट्रीम चुनें')}
        />

        <Input
          label={getLabel('Year of Study/Passing', 'अध्ययन/उत्तीर्ण वर्ष')}
          type="text"
          value={formData?.year || ''}
          onChange={(e) => handleInputChange('year', e?.target?.value)}
          error={errors?.['education.year']}
          placeholder={getLabel('e.g., 2024', 'जैसे, 2024')}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={getLabel('Percentage/CGPA', 'प्रतिशत/सीजीपीए')}
          type="text"
          value={formData?.percentage || ''}
          onChange={(e) => handleInputChange('percentage', e?.target?.value)}
          error={errors?.['education.percentage']}
          placeholder={getLabel('e.g., 85% or 8.5 CGPA', 'जैसे, 85% या 8.5 सीजीपीए')}
        />

        <div className="flex items-end">
          <Checkbox
            label={getLabel('Currently studying', 'वर्तमान में अध्ययनरत')}
            checked={formData?.isCurrentlyStudying || false}
            onChange={(e) => handleInputChange('isCurrentlyStudying', e?.target?.checked)}
          />
        </div>
      </div>
      {formData?.stream === 'other' && (
        <Input
          label={getLabel('Please specify your stream', 'कृपया अपनी स्ट्रीम बताएं')}
          type="text"
          value={formData?.customStream || ''}
          onChange={(e) => handleInputChange('customStream', e?.target?.value)}
          placeholder={getLabel('Enter your stream/field', 'अपनी स्ट्रीम/क्षेत्र दर्ज करें')}
        />
      )}
    </div>
  );
};

export default EducationStep;