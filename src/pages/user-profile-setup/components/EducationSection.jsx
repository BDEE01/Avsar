import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const EducationSection = ({ data, onChange, errors, isExpanded, onToggle }) => {
  const qualificationOptions = [
    { value: '10th', label: '10th Standard / मैट्रिक' },
    { value: '12th', label: '12th Standard / इंटरमीडिएट' },
    { value: 'diploma', label: 'Diploma / डिप्लोमा' },
    { value: 'bachelor', label: 'Bachelor\'s Degree / स्नातक' },
    { value: 'master', label: 'Master\'s Degree / स्नातकोत्तर' },
    { value: 'phd', label: 'PhD / पीएचडी' }
  ];

  const fieldOptions = [
    { value: 'engineering', label: 'Engineering / इंजीनियरिंग' },
    { value: 'commerce', label: 'Commerce / वाणिज्य' },
    { value: 'science', label: 'Science / विज्ञान' },
    { value: 'arts', label: 'Arts / कला' },
    { value: 'management', label: 'Management / प्रबंधन' },
    { value: 'medicine', label: 'Medicine / चिकित्सा' },
    { value: 'law', label: 'Law / कानून' },
    { value: 'agriculture', label: 'Agriculture / कृषि' }
  ];

  const handleChange = (field, value) => {
    onChange('education', { ...data, [field]: value });
  };

  return (
    <div className="bg-card rounded-lg shadow-soft border border-border">
      <div
        className="flex items-center justify-between p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="GraduationCap" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Education Details</h3>
            <p className="text-sm text-text-secondary">शिक्षा विवरण</p>
          </div>
        </div>
        <Icon
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          size={20}
          className="text-text-secondary"
        />
      </div>
      {isExpanded && (
        <div className="px-6 pb-6 space-y-4">
          <Select
            label="Highest Qualification / उच्चतम योग्यता"
            options={qualificationOptions}
            value={data?.qualification}
            onChange={(value) => handleChange('qualification', value)}
            placeholder="Select your qualification"
            error={errors?.qualification}
            required
          />

          <Select
            label="Field of Study / अध्ययन क्षेत्र"
            options={fieldOptions}
            value={data?.field}
            onChange={(value) => handleChange('field', value)}
            placeholder="Select your field"
            error={errors?.field}
            required
          />

          <Input
            label="Institution Name / संस्थान का नाम"
            type="text"
            value={data?.institution}
            onChange={(e) => handleChange('institution', e?.target?.value)}
            placeholder="Enter institution name"
            error={errors?.institution}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Year of Completion / पूर्णता वर्ष"
              type="number"
              value={data?.year}
              onChange={(e) => handleChange('year', e?.target?.value)}
              placeholder="2024"
              min="1990"
              max="2030"
              error={errors?.year}
            />

            <Input
              label="Percentage/CGPA / प्रतिशत/सीजीपीए"
              type="text"
              value={data?.grade}
              onChange={(e) => handleChange('grade', e?.target?.value)}
              placeholder="85% or 8.5 CGPA"
              error={errors?.grade}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationSection;