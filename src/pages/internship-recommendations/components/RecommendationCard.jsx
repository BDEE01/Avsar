import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationCard = ({ internship, onApply, onSave, isAspirational = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(internship?.id, !isSaved);
  };

  const formatSalary = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const getMatchScoreColor = (score) => {
    if (score >= 85) return 'text-success bg-green-50';
    if (score >= 70) return 'text-warning bg-yellow-50';
    return 'text-error bg-red-50';
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft transition-smooth hover:shadow-elevated ${
      isAspirational ? 'border-secondary bg-gradient-to-br from-violet-50 to-purple-50' : ''
    }`}>
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-text-primary">{internship?.position}</h3>
              {isAspirational && (
                <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                  Future Growth
                </span>
              )}
            </div>
            <p className="text-text-secondary font-medium">{internship?.company}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>{internship?.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{internship?.type}</span>
              </div>
            </div>
          </div>
          
          {/* Match Score */}
          <div className={`px-3 py-2 rounded-lg ${getMatchScoreColor(internship?.matchScore)}`}>
            <div className="text-center">
              <div className="text-lg font-bold">{internship?.matchScore}%</div>
              <div className="text-xs">Match</div>
            </div>
          </div>
        </div>

        {/* Salary and Scheme Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold text-text-primary">
            {formatSalary(internship?.salary)}/month
          </div>
          <div className="flex items-center space-x-1 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
            <Icon name="Shield" size={12} />
            <span>PM Internship Scheme</span>
          </div>
        </div>

        {/* Skills Match */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {internship?.matchingSkills?.slice(0, 3)?.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full"
              >
                {skill}
              </span>
            ))}
            {internship?.matchingSkills?.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                +{internship?.matchingSkills?.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Match Reasoning Toggle */}
        <Button
          variant="ghost"
          size="sm"
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between p-3 bg-muted hover:bg-muted/80"
        >
          Why this matches you
        </Button>
      </div>
      {/* Expandable Match Reasoning */}
      {isExpanded && (
        <div className="px-6 pb-4 border-t border-border">
          <div className="pt-4 space-y-3">
            <div className="flex items-start space-x-3">
              <Icon name="Target" size={16} className="text-success mt-1" />
              <div>
                <p className="text-sm font-medium text-text-primary">Skills Alignment</p>
                <p className="text-sm text-text-secondary">{internship?.reasoning?.skills}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="GraduationCap" size={16} className="text-primary mt-1" />
              <div>
                <p className="text-sm font-medium text-text-primary">Education Match</p>
                <p className="text-sm text-text-secondary">{internship?.reasoning?.education}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="Building" size={16} className="text-secondary mt-1" />
              <div>
                <p className="text-sm font-medium text-text-primary">Sector Interest</p>
                <p className="text-sm text-text-secondary">{internship?.reasoning?.sector}</p>
              </div>
            </div>
            {isAspirational && (
              <div className="flex items-start space-x-3">
                <Icon name="TrendingUp" size={16} className="text-accent mt-1" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Growth Opportunity</p>
                  <p className="text-sm text-text-secondary">{internship?.reasoning?.growth}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Actions */}
      <div className="px-6 pb-6">
        <div className="flex space-x-3">
          <Button
            variant={isAspirational ? "secondary" : "default"}
            size="default"
            iconName="ExternalLink"
            iconPosition="right"
            onClick={() => onApply(internship?.id)}
            className="flex-1"
          >
            {isAspirational ? "View Details" : "Apply Now"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            iconName={isSaved ? "Heart" : "Heart"}
            onClick={handleSave}
            className={isSaved ? "text-error border-error" : ""}
          />
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;