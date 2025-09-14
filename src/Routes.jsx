import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import RecommendationHistory from './pages/recommendation-history';
import DataUploadManagement from './pages/data-upload-management';
import InternshipRecommendations from './pages/internship-recommendations';
import UserProfileSetup from './pages/user-profile-setup';
import AuthenticationPortal from './pages/authentication-portal';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AuthenticationPortal />} />
        <Route path="/recommendation-history" element={<RecommendationHistory />} />
        <Route path="/data-upload-management" element={<DataUploadManagement />} />
        <Route path="/internship-recommendations" element={<InternshipRecommendations />} />
        <Route path="/user-profile-setup" element={<UserProfileSetup />} />
        <Route path="/authentication-portal" element={<AuthenticationPortal />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
