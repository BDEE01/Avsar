import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ColumnMapping = ({ csvHeaders, onMappingChange, isVisible }) => {
  const [mappings, setMappings] = useState({});

  const requiredFields = [
    { key: 'id', label: 'ID', required: true, description: 'Unique identifier for each internship' },
    { key: 'company_name', label: 'Company Name', required: true, description: 'Name of the hiring company' },
    { key: 'position', label: 'Position', required: true, description: 'Job title or position name' },
    { key: 'skills_en', label: 'Skills (English)', required: true, description: 'Required skills for TF-IDF processing' },
    { key: 'sector_en', label: 'Sector (English)', required: true, description: 'Industry sector for matching' },
    { key: 'description_en', label: 'Description (English)', required: true, description: 'Job description for algorithm processing' },
    { key: 'location', label: 'Location', required: true, description: 'Job location' },
    { key: 'salary', label: 'Salary', required: false, description: 'Compensation details' },
    { key: 'job_type', label: 'Job Type', required: false, description: 'Full-time, Part-time, etc.' },
    { key: 'duration', label: 'Duration', required: false, description: 'Internship duration' }
  ];

  if (!isVisible || !csvHeaders || csvHeaders?.length === 0) return null;

  const headerOptions = [
    { value: '', label: 'Select column...' },
    ...csvHeaders?.map(header => ({ value: header, label: header }))
  ];

  const handleMappingChange = (fieldKey, selectedHeader) => {
    const newMappings = { ...mappings, [fieldKey]: selectedHeader };
    setMappings(newMappings);
    onMappingChange(newMappings);
  };

  const autoMap = () => {
    const autoMappings = {};
    requiredFields?.forEach(field => {
      const matchingHeader = csvHeaders?.find(header => 
        header?.toLowerCase()?.includes(field?.key?.toLowerCase()) ||
        field?.key?.toLowerCase()?.includes(header?.toLowerCase())
      );
      if (matchingHeader) {
        autoMappings[field.key] = matchingHeader;
      }
    });
    setMappings(autoMappings);
    onMappingChange(autoMappings);
  };

  const clearMappings = () => {
    setMappings({});
    onMappingChange({});
  };

  const getMappedCount = () => {
    return Object.values(mappings)?.filter(value => value)?.length;
  };

  const getRequiredMappedCount = () => {
    return requiredFields?.filter(field => field?.required && mappings?.[field?.key])?.length;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">Column Mapping</h3>
          <p className="text-sm text-text-secondary">
            Map CSV columns to required database fields for proper data processing
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Zap"
            iconPosition="left"
            onClick={autoMap}
          >
            Auto Map
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={clearMappings}
          >
            Clear
          </Button>
        </div>
      </div>
      {/* Mapping Progress */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Mapping Progress</span>
          <span className="text-sm text-text-secondary">
            {getMappedCount()} of {requiredFields?.length} fields mapped
          </span>
        </div>
        <div className="w-full bg-background rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(getMappedCount() / requiredFields?.length) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-text-secondary">
          <span>Required: {getRequiredMappedCount()}/{requiredFields?.filter(f => f?.required)?.length}</span>
          <span>Optional: {getMappedCount() - getRequiredMappedCount()}/{requiredFields?.filter(f => !f?.required)?.length}</span>
        </div>
      </div>
      {/* Mapping Fields */}
      <div className="space-y-4">
        {requiredFields?.map(field => (
          <div key={field?.key} className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 border border-border rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-text-primary">{field?.label}</h4>
                {field?.required && (
                  <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs rounded">
                    Required
                  </span>
                )}
                {field?.key === 'skills_en' || field?.key === 'sector_en' || field?.key === 'description_en' ? (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                    Algorithm Input
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-text-secondary">{field?.description}</p>
            </div>
            
            <div className="space-y-2">
              <Select
                options={headerOptions}
                value={mappings?.[field?.key] || ''}
                onChange={(value) => handleMappingChange(field?.key, value)}
                placeholder="Select CSV column"
              />
              {mappings?.[field?.key] && (
                <div className="flex items-center space-x-2 text-sm text-success">
                  <Icon name="Check" size={14} />
                  <span>Mapped to: {mappings?.[field?.key]}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* CSV Headers Preview */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h4 className="font-medium text-text-primary mb-3">Available CSV Columns</h4>
        <div className="flex flex-wrap gap-2">
          {csvHeaders?.map((header, index) => {
            const isMapped = Object.values(mappings)?.includes(header);
            return (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm ${
                  isMapped
                    ? 'bg-primary/10 text-primary border border-primary/20' :'bg-background text-text-secondary border border-border'
                }`}
              >
                {header}
                {isMapped && <Icon name="Check" size={12} className="ml-1 inline" />}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ColumnMapping;