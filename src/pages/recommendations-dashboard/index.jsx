import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import WelcomeHeader from './components/WelcomeHeader';
import ProfileSummaryCard from './components/ProfileSummaryCard';
import RecommendationsGrid from './components/RecommendationsGrid';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const RecommendationsDashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  // Mock user profile data
  const mockUserProfile = {
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    education: "12th Pass",
    location: "Mumbai, Maharashtra",
    skills: ["Web Development", "Digital Marketing", "Graphic Design"],
    phone: "+91 9876543210",
    dateOfBirth: "2005-03-15",
    preferences: {
      internshipType: ["technology", "marketing"],
      duration: "3-6",
      workMode: "hybrid"
    }
  };

  // Mock recommendations data
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
      description: 'Work on exciting web projects with modern technologies and gain hands-on experience in frontend development.',
      descriptionHi: 'आधुनिक तकनीकों के साथ रोमांचक वेब प्रोजेक्ट्स पर काम करें और फ्रंटएंड डेवलपमेंट में व्यावहारिक अनुभव प्राप्त करें।',
      matchScore: 95,
      postedDate: '2 days ago',
      postedDateHi: '2 दिन पहले',
      companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center'
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
      description: 'Create engaging campaigns for diverse clients and learn digital marketing strategies.',
      descriptionHi: 'विविध ग्राहकों के लिए आकर्षक अभियान बनाएं और डिजिटल मार्केटिंग रणनीतियां सीखें।',
      matchScore: 88,
      postedDate: '1 week ago',
      postedDateHi: '1 सप्ताह पहले',
      companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=center'
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
      description: 'Analyze complex datasets and build predictive models using cutting-edge technologies.',
      descriptionHi: 'जटिल डेटासेट का विश्लेषण करें और अत्याधुनिक तकनीकों का उपयोग करके भविष्यवाणी मॉडल बनाएं।',
      matchScore: 92,
      postedDate: '3 days ago',
      postedDateHi: '3 दिन पहले',
      companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 4,
      title: 'Graphic Design Intern',
      titleHi: 'ग्राफिक डिज़ाइन इंटर्न',
      company: 'Design Studio',
      companyHi: 'डिज़ाइन स्टूडियो',
      location: 'Pune, Maharashtra',
      locationHi: 'पुणे, महाराष्ट्र',
      duration: '3 months',
      durationHi: '3 महीने',
      stipend: '₹10,000/month',
      skills: ['Photoshop', 'Illustrator', 'Figma'],
      skillsHi: ['फोटोशॉप', 'इलस्ट्रेटर', 'फिग्मा'],
      description: 'Design creative visuals for brands and learn industry-standard design practices.',
      descriptionHi: 'ब्रांडों के लिए रचनात्मक विज़ुअल डिज़ाइन करें और उद्योग-मानक डिज़ाइन प्रथाओं को सीखें।',
      matchScore: 85,
      postedDate: '5 days ago',
      postedDateHi: '5 दिन पहले',
      companyLogo: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 5,
      title: 'Content Writing Intern',
      titleHi: 'कंटेंट राइटिंग इंटर्न',
      company: 'Media House',
      companyHi: 'मीडिया हाउस',
      location: 'Hyderabad, Telangana',
      locationHi: 'हैदराबाद, तेलंगाना',
      duration: '4 months',
      durationHi: '4 महीने',
      stipend: '₹8,000/month',
      skills: ['Writing', 'SEO', 'Research'],
      skillsHi: ['लेखन', 'एसईओ', 'अनुसंधान'],
      description: 'Create compelling content for various platforms and improve your writing skills.',
      descriptionHi: 'विभिन्न प्लेटफॉर्म के लिए आकर्षक कंटेंट बनाएं और अपने लेखन कौशल में सुधार करें।',
      matchScore: 78,
      postedDate: '1 week ago',
      postedDateHi: '1 सप्ताह पहले',
      companyLogo: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop&crop=center'
    }
  ];

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Load user profile
    setUserProfile(mockUserProfile);
    
    // Auto-load recommendations if profile is complete
    if (mockUserProfile?.name && mockUserProfile?.skills && mockUserProfile?.skills?.length > 0) {
      setRecommendations(mockRecommendations);
    }
  }, []);

  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleGetRecommendations = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setRecommendations(mockRecommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshRecommendations = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Shuffle recommendations to simulate new results
      const shuffled = [...mockRecommendations]?.sort(() => Math.random() - 0.5);
      setRecommendations(shuffled);
    } catch (error) {
      console.error('Error refreshing recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    navigate('/profile-management');
  };

  const handleApplyToInternship = (internshipId) => {
    console.log('Applied to internship:', internshipId);
    // Here you would typically make an API call to apply
  };

  const handleSaveInternship = (internshipId, isSaved) => {
    console.log('Internship saved:', internshipId, isSaved);
    // Here you would typically make an API call to save/unsave
  };

  const handleProfileRefresh = () => {
    handleRefreshRecommendations();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AppHeader
        isAuthenticated={true}
        onLanguageChange={handleLanguageChange}
        currentLanguage={currentLanguage}
      />
      {/* Sidebar */}
      <DashboardSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
        userProfile={userProfile}
        currentLanguage={currentLanguage}
        onProfileRefresh={handleProfileRefresh}
      />
      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      }`}>
        <div className="p-4 lg:p-8">
          {/* Welcome Header */}
          <WelcomeHeader
            userName={userProfile?.name}
            currentLanguage={currentLanguage}
            onGetRecommendations={handleGetRecommendations}
            loading={loading}
            hasRecommendations={recommendations?.length > 0}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Profile Summary - Desktop Only */}
            <div className="hidden lg:block lg:col-span-1">
              <ProfileSummaryCard
                userProfile={userProfile}
                currentLanguage={currentLanguage}
                onEditProfile={handleEditProfile}
                onRefreshRecommendations={handleRefreshRecommendations}
              />
            </div>

            {/* Recommendations */}
            <div className="lg:col-span-3">
              <RecommendationsGrid
                recommendations={recommendations}
                loading={loading}
                onRefresh={handleRefreshRecommendations}
                currentLanguage={currentLanguage}
                onApply={handleApplyToInternship}
                onSave={handleSaveInternship}
              />
            </div>
          </div>

          {/* Mobile Profile Summary */}
          <div className="lg:hidden mt-8">
            <ProfileSummaryCard
              userProfile={userProfile}
              currentLanguage={currentLanguage}
              onEditProfile={handleEditProfile}
              onRefreshRecommendations={handleRefreshRecommendations}
            />
          </div>

          {/* Quick Actions - Mobile */}
          <div className="lg:hidden fixed bottom-4 right-4 flex flex-col space-y-2">
            <Button
              size="icon"
              onClick={handleRefreshRecommendations}
              className="rounded-full shadow-lg"
              loading={loading}
            >
              <Icon name="RefreshCw" size={20} />
            </Button>
            
            <Button
              size="icon"
              onClick={handleEditProfile}
              variant="secondary"
              className="rounded-full shadow-lg"
            >
              <Icon name="Settings" size={20} />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecommendationsDashboard;