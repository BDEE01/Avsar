import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JobCard = ({ job, onSave, onApply, isSaved = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatSalary = (min, max) => {
    const formatNumber = (num) => {
      if (num >= 10000000) return `${(num / 10000000)?.toFixed(1)}Cr`;
      if (num >= 100000) return `${(num / 100000)?.toFixed(1)}L`;
      if (num >= 1000) return `${(num / 1000)?.toFixed(0)}K`;
      return num?.toString();
    };

    if (min && max) {
      return `₹${formatNumber(min)} - ₹${formatNumber(max)}`;
    }
    if (min) return `₹${formatNumber(min)}+`;
    return 'Salary not disclosed';
  };

  const getMatchColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10';
    if (score >= 80) return 'text-primary bg-primary/10';
    if (score >= 70) return 'text-warning bg-warning/10';
    return 'text-text-secondary bg-muted';
  };

  const getExperienceText = (min, max) => {
    if (min && max) return `${min}-${max} years`;
    if (min) return `${min}+ years`;
    return 'Experience not specified';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground leading-tight pr-4">
              {job?.title}
            </h3>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(job?.matchScore)}`}>
              {job?.matchScore}% match
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-text-secondary mb-2">
            <Icon name="Building2" size={16} />
            <span className="font-medium text-foreground">{job?.company}</span>
            {job?.companyType && (
              <>
                <span>•</span>
                <span className="text-sm">{job?.companyType}</span>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{job?.location}</span>
              {job?.workType && (
                <span className="px-2 py-0.5 bg-muted rounded text-xs">
                  {job?.workType}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{getExperienceText(job?.experienceMin, job?.experienceMax)}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="IndianRupee" size={14} />
              <span className="font-medium text-foreground">
                {formatSalary(job?.salaryMin, job?.salaryMax)}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Skills Section */}
      {job?.skills && job?.skills?.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {job?.skills?.slice(0, 6)?.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
              >
                {skill}
              </span>
            ))}
            {job?.skills?.length > 6 && (
              <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-md">
                +{job?.skills?.length - 6} more
              </span>
            )}
          </div>
        </div>
      )}
      {/* Job Description Preview */}
      <div className="mb-4">
        <p className="text-sm text-text-secondary line-clamp-2">
          {job?.description}
        </p>
      </div>
      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border pt-4 mb-4 space-y-4">
          {/* Full Description */}
          <div>
            <h4 className="font-medium text-foreground mb-2">Job Description</h4>
            <p className="text-sm text-text-secondary whitespace-pre-line">
              {job?.description}
            </p>
          </div>

          {/* Requirements */}
          {job?.requirements && (
            <div>
              <h4 className="font-medium text-foreground mb-2">Requirements</h4>
              <p className="text-sm text-text-secondary whitespace-pre-line">
                {job?.requirements}
              </p>
            </div>
          )}

          {/* All Skills */}
          {job?.skills && job?.skills?.length > 6 && (
            <div>
              <h4 className="font-medium text-foreground mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {job?.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Company Info */}
          {job?.companyInfo && (
            <div>
              <h4 className="font-medium text-foreground mb-2">About Company</h4>
              <p className="text-sm text-text-secondary">
                {job?.companyInfo}
              </p>
            </div>
          )}
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={() => onApply(job)}
          iconName="ExternalLink"
          iconPosition="right"
          className="flex-1"
        >
          Apply Now / अभी आवेदन करें
        </Button>
        
        <Button
          variant="outline"
          onClick={() => onSave(job)}
          iconName={isSaved ? "Heart" : "Heart"}
          iconPosition="left"
          className={isSaved ? "text-error border-error" : ""}
        >
          {isSaved ? 'Saved' : 'Save'}
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          size="sm"
        >
          {isExpanded ? 'Less' : 'More'}
        </Button>
      </div>
      {/* Posted Date */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <div className="flex items-center space-x-1 text-xs text-text-secondary">
          <Icon name="Calendar" size={12} />
          <span>Posted {job?.postedDate}</span>
        </div>
        
        {job?.applicants && (
          <div className="flex items-center space-x-1 text-xs text-text-secondary">
            <Icon name="Users" size={12} />
            <span>{job?.applicants} applicants</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;