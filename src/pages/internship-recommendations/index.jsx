import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RecommendationCard from './components/RecommendationCard';
import FilterControls from './components/FilterControls';
import RecommendationStats from './components/RecommendationStats';
import EmptyState from './components/EmptyState';
import LoadingState from './components/LoadingState';

const InternshipRecommendations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [filters, setFilters] = useState({
    jobType: 'all',
    sector: 'all',
    location: 'all',
    salaryRange: 'all'
  });

  // Mock internship data with TF-IDF similarity scores
  const mockRecommendations = [
    {
      id: 1,
      position: "Software Development Intern",
      company: "Tech Mahindra",
      location: "Bangalore",
      type: "Full-time",
      salary: 25000,
      matchScore: 92,
      sector: "technology",
      matchingSkills: ["JavaScript", "React", "Node.js", "Python"],
      reasoning: {
        skills: "Your JavaScript and React skills align perfectly with this role\'s requirements.",
        education: "Your Computer Science background matches the technical requirements.",
        sector: "Your interest in technology sector makes this an ideal match.",
        growth: "This role offers excellent learning opportunities in full-stack development."
      }
    },
    {
      id: 2,
      position: "Digital Marketing Intern",
      company: "Reliance Industries",
      location: "Mumbai",
      type: "Part-time",
      salary: 18000,
      matchScore: 87,
      sector: "retail",
      matchingSkills: ["Digital Marketing", "Social Media", "Analytics", "Content Creation"],
      reasoning: {
        skills: "Your digital marketing and content creation skills are highly relevant.",
        education: "Your business studies background complements this marketing role.",
        sector: "Your interest in retail and e-commerce aligns with company focus."
      }
    },
    {
      id: 3,
      position: "Data Analyst Intern",
      company: "HDFC Bank",
      location: "Delhi",
      type: "Full-time",
      salary: 22000,
      matchScore: 84,
      sector: "finance",
      matchingSkills: ["Excel", "SQL", "Python", "Data Visualization"],
      reasoning: {
        skills: "Your analytical skills and Excel proficiency match perfectly.",
        education: "Your mathematics background is ideal for data analysis.",
        sector: "Your interest in finance sector makes this a great opportunity."
      }
    },
    {
      id: 4,
      position: "Healthcare Research Intern",
      company: "Apollo Hospitals",
      location: "Hyderabad",
      type: "Full-time",
      salary: 20000,
      matchScore: 79,
      sector: "healthcare",
      matchingSkills: ["Research", "Data Collection", "Medical Writing", "Statistics"],
      reasoning: {
        skills: "Your research and analytical skills are well-suited for this role.",
        education: "Your life sciences background aligns with healthcare research.",
        sector: "Your interest in healthcare makes this a meaningful opportunity."
      }
    },
    {
      id: 5,
      position: "AI/ML Research Intern",
      company: "Indian Institute of Science",
      location: "Bangalore",
      type: "Full-time",
      salary: 35000,
      matchScore: 95,
      sector: "technology",
      isAspirational: true,
      matchingSkills: ["Machine Learning", "Python", "TensorFlow", "Deep Learning"],
      reasoning: {
        skills: "While you have basic Python knowledge, this role will help you develop advanced ML skills.",
        education: "Your technical background provides a good foundation for AI/ML learning.",
        sector: "This aligns with your technology interests and offers significant growth.",
        growth: "This opportunity will help you transition into cutting-edge AI research and development."
      }
    }
  ];

  // Simulate loading and data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setRecommendations(mockRecommendations);
      setFilteredRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Filter recommendations based on selected filters
  useEffect(() => {
    let filtered = recommendations?.filter(rec => {
      if (filters?.jobType !== 'all' && rec?.type?.toLowerCase() !== filters?.jobType) return false;
      if (filters?.sector !== 'all' && rec?.sector !== filters?.sector) return false;
      if (filters?.location !== 'all' && rec?.location?.toLowerCase() !== filters?.location) return false;
      if (filters?.salaryRange !== 'all') {
        const [min, max] = filters?.salaryRange?.split('-')?.map(s => parseInt(s?.replace('+', '')));
        if (max) {
          if (rec?.salary < min || rec?.salary > max) return false;
        } else {
          if (rec?.salary < min) return false;
        }
      }
      return true;
    });
    setFilteredRecommendations(filtered);
  }, [filters, recommendations]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      jobType: 'all',
      sector: 'all',
      location: 'all',
      salaryRange: 'all'
    });
  };

  const handleApply = (internshipId) => {
    // Mock apply functionality
    console.log('Applying to internship:', internshipId);
    // In real app, this would navigate to application form or external link
  };

  const handleSave = (internshipId, isSaved) => {
    // Mock save functionality
    console.log('Saving internship:', internshipId, isSaved);
    // In real app, this would save to user's saved internships
  };

  const handleAudioToggle = () => {
    setIsAudioEnabled(!isAudioEnabled);
    if (!isAudioEnabled) {
      // Mock audio announcement
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(
          `Audio enabled. Found ${filteredRecommendations.length} internship recommendations for you.`
        );
        utterance.lang = 'en-IN';
        speechSynthesis.speak(utterance);
      }
    }
  };

  // Calculate stats
  const regularRecommendations = filteredRecommendations?.filter(rec => !rec?.isAspirational);
  const aspirationalRecommendation = filteredRecommendations?.find(rec => rec?.isAspirational);
  const averageMatch = regularRecommendations?.length > 0 
    ? Math.round(regularRecommendations?.reduce((sum, rec) => sum + rec?.matchScore, 0) / regularRecommendations?.length)
    : 0;
  const topSector = regularRecommendations?.length > 0 
    ? regularRecommendations?.reduce((acc, rec) => {
        acc[rec.sector] = (acc?.[rec?.sector] || 0) + 1;
        return acc;
      }, {})
    : {};
  const mostCommonSector = Object.keys(topSector)?.reduce((a, b) => topSector?.[a] > topSector?.[b] ? a : b, 'Technology');

  const hasActiveFilters = filters?.jobType !== 'all' || filters?.sector !== 'all' || 
                          filters?.location !== 'all' || filters?.salaryRange !== 'all';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <LoadingState />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Your Internship Recommendations
              </h1>
              <p className="text-text-secondary">
                AI-powered matches based on your skills, education, and preferences
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={() => window.location?.reload()}
              >
                Refresh
              </Button>
              <Button
                variant="ghost"
                iconName="Settings"
                iconPosition="left"
                asChild
              >
                <Link to="/user-profile-setup">Edit Profile</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <RecommendationStats
            totalRecommendations={regularRecommendations?.length}
            averageMatch={averageMatch}
            topSector={mostCommonSector}
            lastUpdated="Just now"
          />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <FilterControls
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            onAudioToggle={handleAudioToggle}
            isAudioEnabled={isAudioEnabled}
          />
        </div>

        {/* Recommendations */}
        {filteredRecommendations?.length === 0 ? (
          <EmptyState 
            hasFilters={hasActiveFilters}
            onClearFilters={handleClearFilters}
          />
        ) : (
          <div className="space-y-8">
            {/* Regular Recommendations */}
            {regularRecommendations?.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center space-x-2">
                  <Icon name="Target" size={24} />
                  <span>Top Matches for You ({regularRecommendations?.length})</span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {regularRecommendations?.map((internship) => (
                    <RecommendationCard
                      key={internship?.id}
                      internship={internship}
                      onApply={handleApply}
                      onSave={handleSave}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Aspirational Recommendation */}
            {aspirationalRecommendation && (
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center space-x-2">
                  <Icon name="TrendingUp" size={24} className="text-secondary" />
                  <span>Grow Your Skills</span>
                </h2>
                <div className="max-w-2xl">
                  <RecommendationCard
                    internship={aspirationalRecommendation}
                    onApply={handleApply}
                    onSave={handleSave}
                    isAspirational={true}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                iconName="ArrowLeft"
                iconPosition="left"
                asChild
              >
                <Link to="/user-profile-setup">Back to Profile</Link>
              </Button>
              <Button
                variant="ghost"
                iconName="History"
                iconPosition="left"
                asChild
              >
                <Link to="/recommendation-history">View History</Link>
              </Button>
            </div>
            <div className="text-sm text-text-secondary">
              Recommendations updated on {new Date()?.toLocaleDateString('en-IN')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipRecommendations;