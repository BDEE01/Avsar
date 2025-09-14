import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import HistoryCard from './components/HistoryCard';
import FilterControls from './components/FilterControls';
import ApplicationTracker from './components/ApplicationTracker';
import SavedInternships from './components/SavedInternships';
import ProfileEvolution from './components/ProfileEvolution';

const RecommendationHistory = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    fromDate: '',
    toDate: '',
    search: ''
  });

  // Mock data for recommendation history
  const mockSessions = [
    {
      id: "REC001",
      date: "12/09/2024",
      recommendationsCount: 5,
      averageScore: 87,
      status: "applied",
      profileVersion: "Profile v2.1",
      recommendations: [
        {
          id: 1,
          title: "Software Development Intern",
          company: "Tech Solutions Pvt Ltd",
          location: "Bangalore, Karnataka",
          matchScore: 92,
          applicationStatus: "applied",
          salary: 25000,
          reasoning: `Strong match based on your JavaScript and React skills.\nCompany focuses on modern web development.\nLocation preference aligns with your profile.`
        },
        {
          id: 2,
          title: "Frontend Developer Intern",
          company: "Digital Innovations",
          location: "Pune, Maharashtra",
          matchScore: 88,
          applicationStatus: "saved",
          salary: 22000,
          reasoning: `Excellent fit for your frontend development skills.\nCompany offers mentorship programs.\nGood growth opportunities in UI/UX.`
        }
      ]
    },
    {
      id: "REC002",
      date: "08/09/2024",
      recommendationsCount: 4,
      averageScore: 82,
      status: "viewed",
      profileVersion: "Profile v2.0",
      recommendations: [
        {
          id: 3,
          title: "Data Science Intern",
          company: "Analytics Corp",
          location: "Mumbai, Maharashtra",
          matchScore: 85,
          applicationStatus: "viewed",
          salary: 30000,
          reasoning: `Good match for your Python and statistics background.\nCompany works with machine learning projects.\nOpportunity to learn advanced analytics.`
        }
      ]
    }
  ];

  // Mock data for applications
  const mockApplications = [
    {
      id: 1,
      position: "Software Development Intern",
      company: "Tech Solutions Pvt Ltd",
      location: "Bangalore, Karnataka",
      status: "interview_scheduled",
      appliedDate: "12/09/2024",
      salary: 25000,
      matchScore: 92,
      deadline: "20/09/2024",
      interviewDate: "18/09/2024",
      interviewTime: "10:00 AM",
      lastUpdated: "14/09/2024",
      updates: [
        {
          message: "Interview scheduled for 18th September",
          date: "14/09/2024"
        },
        {
          message: "Application under review by HR team",
          date: "13/09/2024"
        }
      ]
    },
    {
      id: 2,
      position: "Frontend Developer Intern",
      company: "Digital Innovations",
      location: "Pune, Maharashtra",
      status: "under_review",
      appliedDate: "10/09/2024",
      salary: 22000,
      matchScore: 88,
      deadline: "25/09/2024",
      lastUpdated: "13/09/2024",
      updates: [
        {
          message: "Technical assessment completed",
          date: "12/09/2024"
        }
      ]
    }
  ];

  // Mock data for saved internships
  const mockSavedInternships = [
    {
      id: 1,
      title: "UI/UX Design Intern",
      company: "Creative Studios",
      location: "Delhi, NCR",
      salary: 20000,
      duration: "6 months",
      matchScore: 78,
      deadline: "22/09/2024",
      savedDate: "11/09/2024"
    },
    {
      id: 2,
      title: "Marketing Intern",
      company: "Brand Solutions",
      location: "Chennai, Tamil Nadu",
      salary: 18000,
      duration: "4 months",
      matchScore: 72,
      deadline: "30/09/2024",
      savedDate: "09/09/2024"
    }
  ];

  // Mock data for profile evolution
  const mockProfileHistory = [
    {
      type: "skill_added",
      title: "Added New Skill",
      description: "Added React.js to your skill set",
      date: "10/09/2024",
      details: {
        after: "JavaScript, Python, React.js, HTML/CSS"
      },
      impact: "Improved match scores by 15% for frontend roles"
    },
    {
      type: "interest_changed",
      title: "Updated Sector Interest",
      description: "Changed primary interest from Finance to Technology",
      date: "05/09/2024",
      details: {
        before: "Finance, Banking",
        after: "Technology, Software Development"
      },
      impact: "Opened up 40+ new internship opportunities"
    },
    {
      type: "location_updated",
      title: "Location Preference Updated",
      description: "Added Bangalore as preferred location",
      date: "01/09/2024",
      details: {
        before: "Mumbai, Pune",
        after: "Mumbai, Pune, Bangalore"
      },
      impact: "Increased available opportunities by 25%"
    }
  ];

  const [filteredSessions, setFilteredSessions] = useState(mockSessions);

  useEffect(() => {
    let filtered = [...mockSessions];

    // Apply status filter
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(session => session?.status === filters?.status);
    }

    // Apply search filter
    if (filters?.search) {
      filtered = filtered?.filter(session =>
        session?.recommendations?.some(rec =>
          rec?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
          rec?.company?.toLowerCase()?.includes(filters?.search?.toLowerCase())
        )
      );
    }

    // Apply date range filter
    if (filters?.dateRange !== 'all') {
      const today = new Date();
      let startDate;

      switch (filters?.dateRange) {
        case 'last7days':
          startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'last30days':
          startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case 'last3months':
          startDate = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        case 'custom':
          if (filters?.fromDate) {
            startDate = new Date(filters.fromDate);
          }
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        filtered = filtered?.filter(session => {
          const sessionDate = new Date(session.date.split('/').reverse().join('-'));
          return sessionDate >= startDate;
        });
      }
    }

    setFilteredSessions(filtered);
  }, [filters]);

  const handleViewDetails = (item) => {
    console.log('Viewing details for:', item);
    // Navigate to detailed view or open modal
  };

  const handleRerunRecommendations = (session) => {
    console.log('Rerunning recommendations for session:', session?.id);
    // Navigate to recommendations page with rerun flag
  };

  const handleQuickApply = (internship) => {
    console.log('Quick applying to:', internship?.title);
    // Handle quick apply functionality
  };

  const handleRemoveFromSaved = (internshipId) => {
    console.log('Removing from saved:', internshipId);
    // Handle remove from saved functionality
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      dateRange: 'all',
      fromDate: '',
      toDate: '',
      search: ''
    });
  };

  const tabs = [
    { id: 'history', label: 'Recommendation History', icon: 'History' },
    { id: 'applications', label: 'Application Tracker', icon: 'FileText' },
    { id: 'saved', label: 'Saved Internships', icon: 'Bookmark' },
    { id: 'evolution', label: 'Profile Evolution', icon: 'TrendingUp' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Recommendation History</h1>
              <p className="text-text-secondary mt-1">
                Track your internship journey and application progress
              </p>
            </div>
            <div className="flex space-x-3">
              <Link to="/internship-recommendations">
                <Button variant="outline" iconName="Target" iconPosition="left">
                  New Recommendations
                </Button>
              </Link>
              <Link to="/user-profile-setup">
                <Button variant="default" iconName="User" iconPosition="left">
                  Update Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-border">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-muted-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <FilterControls
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={handleClearFilters}
            />

            {filteredSessions?.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Search" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">No Results Found</h3>
                <p className="text-text-secondary mb-6">
                  Try adjusting your filters or search terms to find recommendation sessions.
                </p>
                <Button variant="default" onClick={handleClearFilters}>
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredSessions?.map((session) => (
                  <HistoryCard
                    key={session?.id}
                    session={session}
                    onViewDetails={handleViewDetails}
                    onRerunRecommendations={handleRerunRecommendations}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'applications' && (
          <ApplicationTracker applications={mockApplications} />
        )}

        {activeTab === 'saved' && (
          <SavedInternships
            savedInternships={mockSavedInternships}
            onQuickApply={handleQuickApply}
            onRemoveFromSaved={handleRemoveFromSaved}
          />
        )}

        {activeTab === 'evolution' && (
          <ProfileEvolution profileHistory={mockProfileHistory} />
        )}
      </div>
    </div>
  );
};

export default RecommendationHistory;