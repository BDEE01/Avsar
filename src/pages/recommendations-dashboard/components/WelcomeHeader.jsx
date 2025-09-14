import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeHeader = ({ 
  userName = '', 
  currentLanguage = 'en',
  onGetRecommendations,
  loading = false,
  hasRecommendations = false
}) => {
  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  const getCurrentTime = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) {
      return getLabel('Good morning', 'सुप्रभात');
    } else if (hour < 17) {
      return getLabel('Good afternoon', 'नमस्कार');
    } else {
      return getLabel('Good evening', 'शुभ संध्या');
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {getCurrentTime()}{userName ? `, ${userName}` : ''}!
          </h1>
          <p className="text-muted-foreground text-lg">
            {hasRecommendations 
              ? getLabel(
                  'Here are your personalized internship recommendations',
                  'यहाँ आपकी व्यक्तिगत इंटर्नशिप सिफारिशें हैं'
                )
              : getLabel(
                  'Discover internships tailored just for you',
                  'आपके लिए विशेष रूप से तैयार इंटर्नशिप खोजें'
                )
            }
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {!hasRecommendations && (
            <Button
              onClick={onGetRecommendations}
              loading={loading}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              <Icon name="Sparkles" size={20} className="mr-2" />
              {getLabel('Get Recommendations', 'सिफारिशें प्राप्त करें')}
            </Button>
          )}
          
          <div className="hidden md:flex items-center space-x-2 text-muted-foreground">
            <Icon name="Calendar" size={16} />
            <span className="text-sm">
              {new Date()?.toLocaleDateString(currentLanguage === 'hi' ? 'hi-IN' : 'en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/50">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">150+</div>
          <div className="text-xs text-muted-foreground">
            {getLabel('Companies', 'कंपनियां')}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">500+</div>
          <div className="text-xs text-muted-foreground">
            {getLabel('Internships', 'इंटर्नशिप')}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">95%</div>
          <div className="text-xs text-muted-foreground">
            {getLabel('Match Rate', 'मैच दर')}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary">24/7</div>
          <div className="text-xs text-muted-foreground">
            {getLabel('Support', 'सहायता')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;