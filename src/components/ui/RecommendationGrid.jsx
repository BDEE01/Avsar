import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Image from '../AppImage';

const RecommendationGrid = ({ 
  recommendations = [], 
  loading = false, 
  onRefresh,
  currentLanguage = 'en',
  onApply,
  onSave
}) => {
  const [savedItems, setSavedItems] = useState(new Set());
  const [appliedItems, setAppliedItems] = useState(new Set());

  // Mock data for demonstration
  const mockRecommendations = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      titleHi: 'फ्रंटएंड डेवलपर इंटर्न',
      company: 'TechCorp Solutions',
      companyHi: 'टेककॉर्प सॉल्यूशन्स',
      location: 'Mumbai, Maharashtra',
      locationHi: 'मुंबई, महाराष्ट्र',
      duration: '3 months',
      durationHi: '3 महीने',
      stipend: '₹15,000/month',
      skills: ['React', 'JavaScript', 'CSS'],
      skillsHi: ['रिएक्ट', 'जावास्क्रिप्ट', 'सीएसएस'],
      description: 'Work on exciting web projects with modern technologies',
      descriptionHi: 'आधुनिक तकनीकों के साथ रोमांचक वेब प्रोजेक्ट्स पर काम करें',
      matchScore: 95,
      postedDate: '2 days ago',
      postedDateHi: '2 दिन पहले',
      companyLogo: '/assets/images/company-logo-1.png'
    },
    {
      id: 2,
      title: 'Digital Marketing Intern',
      titleHi: 'डिजिटल मार्केटिंग इंटर्न',
      company: 'Creative Agency',
      companyHi: 'क्रिएटिव एजेंसी',
      location: 'Delhi, NCR',
      locationHi: 'दिल्ली, एनसीआर',
      duration: '6 months',
      durationHi: '6 महीने',
      stipend: '₹12,000/month',
      skills: ['Social Media', 'Content Writing', 'Analytics'],
      skillsHi: ['सोशल मीडिया', 'कंटेंट राइटिंग', 'एनालिटिक्स'],
      description: 'Create engaging campaigns for diverse clients',
      descriptionHi: 'विविध ग्राहकों के लिए आकर्षक अभियान बनाएं',
      matchScore: 88,
      postedDate: '1 week ago',
      postedDateHi: '1 सप्ताह पहले',
      companyLogo: '/assets/images/company-logo-2.png'
    },
    {
      id: 3,
      title: 'Data Science Intern',
      titleHi: 'डेटा साइंस इंटर्न',
      company: 'Analytics Pro',
      companyHi: 'एनालिटिक्स प्रो',
      location: 'Bangalore, Karnataka',
      locationHi: 'बैंगलोर, कर्नाटक',
      duration: '4 months',
      durationHi: '4 महीने',
      stipend: '₹20,000/month',
      skills: ['Python', 'Machine Learning', 'SQL'],
      skillsHi: ['पायथन', 'मशीन लर्निंग', 'एसक्यूएल'],
      description: 'Analyze complex datasets and build predictive models',
      descriptionHi: 'जटिल डेटासेट का विश्लेषण करें और भविष्यवाणी मॉडल बनाएं',
      matchScore: 92,
      postedDate: '3 days ago',
      postedDateHi: '3 दिन पहले',
      companyLogo: '/assets/images/company-logo-3.png'
    }
  ];

  const displayRecommendations = recommendations?.length > 0 ? recommendations : mockRecommendations;

  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  const handleSave = (id) => {
    const newSavedItems = new Set(savedItems);
    if (savedItems?.has(id)) {
      newSavedItems?.delete(id);
    } else {
      newSavedItems?.add(id);
    }
    setSavedItems(newSavedItems);
    
    if (onSave) {
      onSave(id, !savedItems?.has(id));
    }
  };

  const handleApply = (id) => {
    setAppliedItems(prev => new Set([...prev, id]));
    
    if (onApply) {
      onApply(id);
    }
  };

  const SkeletonCard = () => (
    <div className="bg-card rounded-lg border border-border p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-muted rounded-lg"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-32"></div>
            <div className="h-3 bg-muted rounded w-24"></div>
          </div>
        </div>
        <div className="h-6 bg-muted rounded w-12"></div>
      </div>
      
      <div className="space-y-3">
        <div className="h-5 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-2/3"></div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="h-6 bg-muted rounded w-16"></div>
          <div className="h-6 bg-muted rounded w-20"></div>
          <div className="h-6 bg-muted rounded w-14"></div>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div className="h-8 bg-muted rounded w-20"></div>
          <div className="h-8 bg-muted rounded w-16"></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-muted rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-muted rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)]?.map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (displayRecommendations?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          {getLabel('No recommendations found', 'कोई सिफारिश नहीं मिली')}
        </h3>
        <p className="text-muted-foreground mb-6">
          {getLabel(
            'Complete your profile to get personalized internship recommendations',
            'व्यक्तिगत इंटर्नशिप सिफारिशें प्राप्त करने के लिए अपनी प्रोफाइल पूरी करें'
          )}
        </p>
        <Button onClick={onRefresh} variant="outline">
          <Icon name="RefreshCw" size={16} className="mr-2" />
          {getLabel('Refresh Recommendations', 'सिफारिशें रीफ्रेश करें')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            {getLabel('Recommended for You', 'आपके लिए सुझाव')}
          </h2>
          <p className="text-muted-foreground mt-1">
            {getLabel(
              `${displayRecommendations?.length} internships match your profile`,
              `${displayRecommendations?.length} इंटर्नशिप आपकी प्रोफाइल से मेल खाती हैं`
            )}
          </p>
        </div>
        
        <Button onClick={onRefresh} variant="outline">
          <Icon name="RefreshCw" size={16} className="mr-2" />
          {getLabel('Refresh', 'रीफ्रेश')}
        </Button>
      </div>
      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayRecommendations?.map((recommendation) => (
          <div
            key={recommendation?.id}
            className="bg-card rounded-lg border border-border p-6 hover:shadow-interactive transition-micro hover:scale-hover group"
          >
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
                  onClick={() => handleSave(recommendation?.id)}
                  className={savedItems?.has(recommendation?.id) ? 'text-accent' : ''}
                >
                  <Icon 
                    name={savedItems?.has(recommendation?.id) ? 'Heart' : 'Heart'} 
                    size={16} 
                    className={savedItems?.has(recommendation?.id) ? 'fill-current' : ''}
                  />
                </Button>
                
                <span className="text-xs text-muted-foreground">
                  {getLabel(recommendation?.postedDate, recommendation?.postedDateHi)}
                </span>
              </div>

              <Button
                size="sm"
                onClick={() => handleApply(recommendation?.id)}
                disabled={appliedItems?.has(recommendation?.id)}
                variant={appliedItems?.has(recommendation?.id) ? 'secondary' : 'default'}
              >
                {appliedItems?.has(recommendation?.id) ? (
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
        ))}
      </div>
      {/* Load More */}
      {displayRecommendations?.length >= 6 && (
        <div className="text-center pt-6">
          <Button variant="outline" size="lg">
            <Icon name="Plus" size={16} className="mr-2" />
            {getLabel('Load More Recommendations', 'और सिफारिशें लोड करें')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecommendationGrid;