import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import RecommendationCard from './RecommendationCard';

const RecommendationsGrid = ({ 
  recommendations = [], 
  loading = false, 
  onRefresh,
  currentLanguage = 'en',
  onApply,
  onSave
}) => {
  const [savedItems, setSavedItems] = useState(new Set());
  const [appliedItems, setAppliedItems] = useState(new Set());

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

  if (recommendations?.length === 0) {
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
          {getLabel('Get Recommendations', 'सिफारिशें प्राप्त करें')}
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
              `${recommendations?.length} internships match your profile`,
              `${recommendations?.length} इंटर्नशिप आपकी प्रोफाइल से मेल खाती हैं`
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
        {recommendations?.map((recommendation) => (
          <RecommendationCard
            key={recommendation?.id}
            recommendation={recommendation}
            onApply={handleApply}
            onSave={handleSave}
            currentLanguage={currentLanguage}
            isApplied={appliedItems?.has(recommendation?.id)}
            isSaved={savedItems?.has(recommendation?.id)}
          />
        ))}
      </div>
      {/* Load More */}
      {recommendations?.length >= 6 && (
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

export default RecommendationsGrid;