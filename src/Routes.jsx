import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import JobRecommendationForm from './pages/job-recommendation-form';
import JobRecommendationsResults from './pages/job-recommendations-results';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<JobRecommendationForm />} />
        <Route path="/job-recommendation-form" element={<JobRecommendationForm />} />
        <Route path="/job-recommendations-results" element={<JobRecommendationsResults />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
