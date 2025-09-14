import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ hasFilters, onClearFilters }) => {
  if (hasFilters) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={24} className="text-text-secondary" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">No matches found</h3>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          We couldn't find any internships matching your current filters. Try adjusting your search criteria or clearing filters to see more opportunities.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="default"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onClearFilters}
          >
            Clear All Filters
          </Button>
          <Button
            variant="outline"
            iconName="Settings"
            iconPosition="left"
            asChild
          >
            <Link to="/user-profile-setup">Update Profile</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name="UserCheck" size={24} className="text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">Complete your profile to get recommendations</h3>
      <p className="text-text-secondary mb-6 max-w-md mx-auto">
        To receive personalized internship recommendations, please complete your profile with your skills, education, and preferences.
      </p>
      <Button
        variant="default"
        iconName="ArrowRight"
        iconPosition="right"
        asChild
      >
        <Link to="/user-profile-setup">Complete Profile Setup</Link>
      </Button>
    </div>
  );
};

export default EmptyState;