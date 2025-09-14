import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Select from './Select';

const ResultsNavigation = ({ 
  totalResults = 0,
  currentFilters = {},
  onFilterChange = () => {},
  onNewSearch = () => {},
  onSortChange = () => {},
  currentSort = 'relevance'
}) => {
  const navigate = useNavigate();
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Best Match' },
    { value: 'salary_high', label: 'Salary: High to Low' },
    { value: 'salary_low', label: 'Salary: Low to High' },
    { value: 'date_new', label: 'Newest First' },
    { value: 'date_old', label: 'Oldest First' },
    { value: 'company', label: 'Company A-Z' }
  ];

  const experienceOptions = [
    { value: 'all', label: 'All Experience Levels' },
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6+ years)' },
    { value: 'lead', label: 'Lead/Manager (8+ years)' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'remote', label: 'Remote Only' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'onsite', label: 'On-site Only' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi NCR' },
    { value: 'pune', label: 'Pune' },
    { value: 'hyderabad', label: 'Hyderabad' }
  ];

  const companyTypeOptions = [
    { value: 'all', label: 'All Company Types' },
    { value: 'startup', label: 'Startup' },
    { value: 'mid_size', label: 'Mid-size Company' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'mnc', label: 'Multinational' },
    { value: 'product', label: 'Product Company' },
    { value: 'service', label: 'Service Company' }
  ];

  const handleNewSearch = () => {
    onNewSearch();
    navigate('/job-recommendation-form');
  };

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...currentFilters,
      [filterType]: value
    });
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 space-y-4 sm:space-y-0">
          {/* Results Summary */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Target" size={20} className="text-primary" />
              <span className="text-sm font-medium text-foreground">
                {totalResults} job matches found
              </span>
            </div>
            
            {totalResults > 0 && (
              <div className="hidden sm:flex items-center space-x-2 text-xs text-text-secondary">
                <Icon name="Sparkles" size={16} className="text-accent" />
                <span>AI-powered recommendations</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Sort Dropdown */}
            <div className="hidden sm:block min-w-[180px]">
              <Select
                options={sortOptions}
                value={currentSort}
                onChange={onSortChange}
                placeholder="Sort by..."
                className="text-sm"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
              iconName="Filter"
              iconPosition="left"
              className="hidden sm:flex"
            >
              Filters
              {Object.keys(currentFilters)?.some(key => currentFilters?.[key] && currentFilters?.[key] !== 'all') && (
                <span className="ml-1 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                  {Object.keys(currentFilters)?.filter(key => currentFilters?.[key] && currentFilters?.[key] !== 'all')?.length}
                </span>
              )}
            </Button>

            {/* New Search Button */}
            <Button
              variant="default"
              size="sm"
              onClick={handleNewSearch}
              iconName="RotateCcw"
              iconPosition="left"
            >
              <span className="hidden sm:inline">New Search</span>
              <span className="sm:hidden">New</span>
            </Button>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="sm:hidden pb-4 space-y-3">
          {/* Mobile Sort */}
          <Select
            label="Sort Results"
            options={sortOptions}
            value={currentSort}
            onChange={onSortChange}
            placeholder="Sort by..."
          />

          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            fullWidth
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
            iconName="Filter"
            iconPosition="left"
          >
            Filters & Preferences
            {Object.keys(currentFilters)?.some(key => currentFilters?.[key] && currentFilters?.[key] !== 'all') && (
              <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                {Object.keys(currentFilters)?.filter(key => currentFilters?.[key] && currentFilters?.[key] !== 'all')?.length}
              </span>
            )}
          </Button>
        </div>

        {/* Expanded Filters */}
        {isFiltersExpanded && (
          <div className="pb-6 border-t border-border pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Experience Level Filter */}
              <Select
                label="Experience Level"
                options={experienceOptions}
                value={currentFilters?.experience || 'all'}
                onChange={(value) => handleFilterChange('experience', value)}
                placeholder="Select experience..."
              />

              {/* Location Filter */}
              <Select
                label="Location"
                options={locationOptions}
                value={currentFilters?.location || 'all'}
                onChange={(value) => handleFilterChange('location', value)}
                placeholder="Select location..."
                searchable
              />

              {/* Company Type Filter */}
              <Select
                label="Company Type"
                options={companyTypeOptions}
                value={currentFilters?.companyType || 'all'}
                onChange={(value) => handleFilterChange('companyType', value)}
                placeholder="Select company type..."
              />

              {/* Clear Filters */}
              <div className="flex items-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFilterChange({})}
                  iconName="X"
                  iconPosition="left"
                  className="w-full"
                  disabled={!Object.keys(currentFilters)?.some(key => currentFilters?.[key] && currentFilters?.[key] !== 'all')}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsNavigation;