import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ filters, onFilterChange, onClearFilters, onAudioToggle, isAudioEnabled }) => {
  const jobTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  const sectorOptions = [
    { value: 'all', label: 'All Sectors' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'education', label: 'Education' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'retail', label: 'Retail' },
    { value: 'government', label: 'Government' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'pune', label: 'Pune' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'ahmedabad', label: 'Ahmedabad' }
  ];

  const salaryRangeOptions = [
    { value: 'all', label: 'All Salaries' },
    { value: '0-15000', label: '₹0 - ₹15,000' },
    { value: '15000-25000', label: '₹15,000 - ₹25,000' },
    { value: '25000-35000', label: '₹25,000 - ₹35,000' },
    { value: '35000-50000', label: '₹35,000 - ₹50,000' },
    { value: '50000+', label: '₹50,000+' }
  ];

  const hasActiveFilters = filters?.jobType !== 'all' || filters?.sector !== 'all' || 
                          filters?.location !== 'all' || filters?.salaryRange !== 'all';

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span>Filter Recommendations</span>
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName={isAudioEnabled ? "VolumeX" : "Volume2"}
            iconPosition="left"
            onClick={onAudioToggle}
            className="text-text-secondary"
          >
            {isAudioEnabled ? "Disable Audio" : "Enable Audio"}
          </Button>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={onClearFilters}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Job Type"
          options={jobTypeOptions}
          value={filters?.jobType}
          onChange={(value) => onFilterChange('jobType', value)}
          className="w-full"
        />

        <Select
          label="Sector"
          options={sectorOptions}
          value={filters?.sector}
          onChange={(value) => onFilterChange('sector', value)}
          searchable
          className="w-full"
        />

        <Select
          label="Location"
          options={locationOptions}
          value={filters?.location}
          onChange={(value) => onFilterChange('location', value)}
          searchable
          className="w-full"
        />

        <Select
          label="Salary Range"
          options={salaryRangeOptions}
          value={filters?.salaryRange}
          onChange={(value) => onFilterChange('salaryRange', value)}
          className="w-full"
        />
      </div>
      {hasActiveFilters && (
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Info" size={16} />
            <span>
              Showing filtered results. 
              {filters?.jobType !== 'all' && ` Job Type: ${jobTypeOptions?.find(opt => opt?.value === filters?.jobType)?.label}`}
              {filters?.sector !== 'all' && ` | Sector: ${sectorOptions?.find(opt => opt?.value === filters?.sector)?.label}`}
              {filters?.location !== 'all' && ` | Location: ${locationOptions?.find(opt => opt?.value === filters?.location)?.label}`}
              {filters?.salaryRange !== 'all' && ` | Salary: ${salaryRangeOptions?.find(opt => opt?.value === filters?.salaryRange)?.label}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;