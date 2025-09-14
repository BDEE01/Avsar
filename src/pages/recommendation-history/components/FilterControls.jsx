import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterControls = ({ filters, onFiltersChange, onClearFilters }) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'viewed', label: 'Viewed' },
    { value: 'saved', label: 'Saved' },
    { value: 'applied', label: 'Applied' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last3months', label: 'Last 3 Months' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Filter History</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
          className="w-full"
        />

        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
          className="w-full"
        />

        {filters?.dateRange === 'custom' && (
          <>
            <Input
              label="From Date"
              type="date"
              value={filters?.fromDate}
              onChange={(e) => handleFilterChange('fromDate', e?.target?.value)}
            />
            <Input
              label="To Date"
              type="date"
              value={filters?.toDate}
              onChange={(e) => handleFilterChange('toDate', e?.target?.value)}
            />
          </>
        )}

        <Input
          label="Search Sessions"
          type="search"
          placeholder="Search by company, role..."
          value={filters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
        />
      </div>
      {(filters?.status !== 'all' || filters?.dateRange !== 'all' || filters?.search) && (
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <span>Active filters:</span>
            {filters?.status !== 'all' && (
              <span className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs">
                Status: {filters?.status}
              </span>
            )}
            {filters?.dateRange !== 'all' && (
              <span className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs">
                Date: {filters?.dateRange}
              </span>
            )}
            {filters?.search && (
              <span className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs">
                Search: {filters?.search}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;