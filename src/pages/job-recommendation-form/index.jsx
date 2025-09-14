import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProcessNavigation from '../../components/ui/ProcessNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import SkillsSelector from './components/SkillsSelector';
import LocationInput from './components/LocationInput';
import EducationInput from './components/EducationInput';
import RecommendationEngine from './components/RecommendationEngine';
import ProcessingLoader from './components/ProcessingLoader';

const JobRecommendationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    skills: [],
    location: '',
    education: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recommendationEngine = new RecommendationEngine();

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.skills || formData?.skills?.length === 0) {
      newErrors.skills = 'Please select at least one skill / कृपया कम से कम एक कौशल चुनें';
    }

    if (!formData?.location?.trim()) {
      newErrors.location = 'Please enter your preferred location / कृपया अपना पसंदीदा स्थान दर्ज करें';
    }

    if (!formData?.education?.trim()) {
      newErrors.education = 'Please enter your education qualification / कृपया अपनी शैक्षणिक योग्यता दर्ज करें';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSkillsChange = (skills) => {
    setFormData(prev => ({ ...prev, skills }));
    if (errors?.skills) {
      setErrors(prev => ({ ...prev, skills: null }));
    }
  };

  const handleLocationChange = (location) => {
    setFormData(prev => ({ ...prev, location }));
    if (errors?.location) {
      setErrors(prev => ({ ...prev, location: null }));
    }
  };

  const handleEducationChange = (education) => {
    setFormData(prev => ({ ...prev, education }));
    if (errors?.education) {
      setErrors(prev => ({ ...prev, education: null }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setIsProcessing(true);

    try {
      // Simulate processing time and generate recommendations
      const recommendations = recommendationEngine?.getRecommendations(
        formData?.skills,
        formData?.location,
        formData?.education
      );

      // Store results in sessionStorage for the results page
      sessionStorage.setItem('jobRecommendations', JSON.stringify(recommendations));
      sessionStorage.setItem('userProfile', JSON.stringify(formData));

    } catch (error) {
      console.error('Error generating recommendations:', error);
      setIsProcessing(false);
      setIsSubmitting(false);
    }
  };

  const handleProcessingComplete = () => {
    setIsProcessing(false);
    setIsSubmitting(false);
    navigate('/job-recommendations-results');
  };

  const handleReset = () => {
    setFormData({
      skills: [],
      location: '',
      education: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProcessNavigation 
        currentStep="form" 
        isProcessing={isProcessing}
        hasResults={false}
      />
      <main className="pt-32 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mx-auto mb-6">
              <Icon name="Target" size={40} className="text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Find Your Perfect Job Match
            </h1>
            <p className="text-lg text-text-secondary mb-2">
              अपना सही नौकरी मैच खोजें
            </p>
            <p className="text-base text-text-secondary max-w-lg mx-auto">
              Tell us about your skills, location preferences, and education to get personalized job recommendations powered by AI.
            </p>
            <p className="text-sm text-text-secondary max-w-lg mx-auto mt-2">
              AI द्वारा संचालित व्यक्तिगत नौकरी सिफारिशें प्राप्त करने के लिए अपने कौशल, स्थान प्राथमिकताओं और शिक्षा के बारे में बताएं।
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-card border border-border rounded-xl shadow-elevated p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Skills Selection */}
              <SkillsSelector
                selectedSkills={formData?.skills}
                onSkillsChange={handleSkillsChange}
                error={errors?.skills}
                disabled={isSubmitting}
              />

              {/* Location Input */}
              <LocationInput
                value={formData?.location}
                onChange={handleLocationChange}
                error={errors?.location}
                disabled={isSubmitting}
              />

              {/* Education Input */}
              <EducationInput
                value={formData?.education}
                onChange={handleEducationChange}
                error={errors?.education}
                disabled={isSubmitting}
              />

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  iconName="RotateCcw"
                  iconPosition="left"
                  className="sm:w-auto"
                >
                  Reset Form / फॉर्म रीसेट करें
                </Button>
                
                <Button
                  type="submit"
                  variant="default"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  iconName="Search"
                  iconPosition="left"
                  className="sm:flex-1"
                >
                  {isSubmitting ? 'Processing...' : 'Get Recommendations / अवसर पाएं'}
                </Button>
              </div>
            </form>

            {/* Form Info */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm text-text-secondary">
                  <p className="mb-1">
                    <strong>How it works:</strong> Our AI analyzes your profile using advanced algorithms to match you with the most relevant job opportunities.
                  </p>
                  <p>
                    <strong>यह कैसे काम करता है:</strong> हमारा AI आपको सबसे प्रासंगिक नौकरी के अवसरों से मिलाने के लिए उन्नत एल्गोरिदम का उपयोग करके आपकी प्रोफ़ाइल का विश्लेषण करता है।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: 'Cpu',
                title: 'AI-Powered Matching',
                titleHindi: 'AI-संचालित मैचिंग',
                description: 'Advanced algorithms for precise job matching'
              },
              {
                icon: 'Zap',
                title: 'Instant Results',
                titleHindi: 'तत्काल परिणाम',
                description: 'Get recommendations in seconds'
              },
              {
                icon: 'Shield',
                title: 'Privacy Protected',
                titleHindi: 'गोपनीयता सुरक्षित',
                description: 'Your data is secure and private'
              }
            ]?.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-surface rounded-lg border border-border">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
                  <Icon name={feature?.icon} size={24} className="text-primary" />
                </div>
                <h3 className="text-sm font-medium text-foreground mb-1">
                  {feature?.title}
                </h3>
                <p className="text-xs text-text-secondary mb-2">
                  {feature?.titleHindi}
                </p>
                <p className="text-xs text-text-secondary">
                  {feature?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      {/* Processing Loader */}
      <ProcessingLoader
        isVisible={isProcessing}
        onComplete={handleProcessingComplete}
        duration={3000}
      />
    </div>
  );
};

export default JobRecommendationForm;