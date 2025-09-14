import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RecommendationCard = ({ 
  recommendation, 
  onApply, 
  onSave, 
  currentLanguage = 'en',
  isApplied = false,
  isSaved = false 
}) => {
  const [applying, setApplying] = useState(false);

  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  const handleApply = async () => {
    setApplying(true);
    try {
      await onApply(recommendation?.id);
    } finally {
      setApplying(false);
    }
  };

  const handleSave = () => {
    onSave(recommendation?.id);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-interactive transition-micro hover:scale-hover group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src={recommendation?.companyLogo}
              alt={`${recommendation?.company} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-foreground text-sm">
              {getLabel(recommendation?.company, recommendation?.companyHi)}
            </h3>
            <p className="text-xs text-muted-foreground">
              {getLabel(recommendation?.location, recommendation?.locationHi)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full">
          <Icon name="TrendingUp" size={12} />
          <span className="text-xs font-medium">{recommendation?.matchScore}%</span>
        </div>
      </div>
      {/* Content */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground">
          {getLabel(recommendation?.title, recommendation?.titleHi)}
        </h4>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {getLabel(recommendation?.description, recommendation?.descriptionHi)}
        </p>

        {/* Details */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{getLabel(recommendation?.duration, recommendation?.durationHi)}</span>
          <span className="font-medium text-foreground">{recommendation?.stipend}</span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {(currentLanguage === 'hi' ? recommendation?.skillsHi : recommendation?.skills)?.slice(0, 3)?.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
          {recommendation?.skills?.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              +{recommendation?.skills?.length - 3}
            </span>
          )}
        </div>
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className={isSaved ? 'text-accent' : ''}
          >
            <Icon 
              name="Heart" 
              size={16} 
              className={isSaved ? 'fill-current' : ''}
            />
          </Button>
          
          <span className="text-xs text-muted-foreground">
            {getLabel(recommendation?.postedDate, recommendation?.postedDateHi)}
          </span>
        </div>

        <Button
          size="sm"
          onClick={handleApply}
          disabled={isApplied}
          loading={applying}
          variant={isApplied ? 'secondary' : 'default'}
        >
          {isApplied ? (
            <>
              <Icon name="Check" size={14} className="mr-1" />
              {getLabel('Applied', 'आवेदन किया')}
            </>
          ) : (
            getLabel('Apply', 'आवेदन करें')
          )}
        </Button>
      </div>
    </div>
  );
};

export default RecommendationCard;