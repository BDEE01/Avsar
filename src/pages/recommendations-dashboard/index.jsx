import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AppHeader from "../../components/ui/AppHeader";
import DashboardSidebar from "../../components/ui/DashboardSidebar";
import WelcomeHeader from "./components/WelcomeHeader";
import ProfileSummaryCard from "./components/ProfileSummaryCard";
import RecommendationsGrid from "./components/RecommendationsGrid";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";

const RecommendationsDashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  // 🔹 Auto-login check
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    const savedSkills = localStorage.getItem("userSkills");

    if (!savedEmail) {
      navigate("/auth"); // redirect to login/register if not logged in
    } else {
      setUserProfile({
        email: savedEmail,
        skills: savedSkills ? savedSkills.split(",") : [],
      });

      // fetch initial recommendations if skills exist
      if (savedSkills) {
        fetchRecommendations(savedSkills);
      }
    }

    const savedLanguage = localStorage.getItem("language") || "en";
    setCurrentLanguage(savedLanguage);
  }, [navigate]);

  // 🔹 Fetch recommendations from backend
  const fetchRecommendations = async (skills) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/recommend", {
        skills,
      });
      setRecommendations(res.data.recommendations || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleGetRecommendations = async () => {
    if (userProfile?.skills?.length > 0) {
      await fetchRecommendations(userProfile.skills.join(","));
    } else {
      alert("Please update your skills in profile to get recommendations.");
    }
  };

  const handleRefreshRecommendations = async () => {
    if (userProfile?.skills?.length > 0) {
      await fetchRecommendations(userProfile.skills.join(","));
    }
  };

  const handleEditProfile = () => {
    navigate("/profile-management");
  };

  const handleApplyToInternship = (internshipId) => {
    console.log("Applied to internship:", internshipId);
    // Make API call here if needed
  };

  const handleSaveInternship = (internshipId, isSaved) => {
    console.log("Internship saved:", internshipId, isSaved);
    // Make API call here if needed
  };

  const handleProfileRefresh = () => {
    handleRefreshRecommendations();
  };

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userSkills");
    setUserProfile(null);
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AppHeader
        isAuthenticated={true}
        onLanguageChange={handleLanguageChange}
        currentLanguage={currentLanguage}
        onLogout={handleLogout}
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
      <main
        className={`pt-16 transition-all duration-300 ${
          isSidebarCollapsed ? "lg:ml-16" : "lg:ml-72"
        }`}
      >
        <div className="p-4 lg:p-8">
          {/* Welcome Header */}
          <WelcomeHeader
            userName={userProfile?.email?.split("@")[0] || "User"}
            currentLanguage={currentLanguage}
            onGetRecommendations={handleGetRecommendations}
            loading={loading}
            hasRecommendations={recommendations?.length > 0}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Profile Summary - Desktop */}
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

            <Button
              size="icon"
              onClick={handleLogout}
              variant="destructive"
              className="rounded-full shadow-lg"
            >
              <Icon name="LogOut" size={20} />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecommendationsDashboard;
