import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProcessNavigation from '../../components/ui/ProcessNavigation';
import ResultsHeader from './components/ResultsHeader';
import JobCard from './components/JobCard';
import UserProfileSummary from './components/UserProfileSummary';
import EmptyResults from './components/EmptyResults';
import LoadingState from './components/LoadingState';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const JobRecommendationsResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [jobRecommendations, setJobRecommendations] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [processingTime, setProcessingTime] = useState(0);

  // Mock job data with TF-IDF similarity scores
  const mockJobData = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechCorp Solutions",
      companyType: "Product Company",
      location: "Bangalore, Karnataka",
      workType: "Hybrid",
      salaryMin: 1200000,
      salaryMax: 1800000,
      experienceMin: 4,
      experienceMax: 7,
      skills: ["React", "JavaScript", "Node.js", "TypeScript", "Redux", "MongoDB", "AWS"],
      description: `We are looking for a Senior React Developer to join our dynamic team. You will be responsible for developing user interface components and implementing them following well-known React.js workflows.\n\nKey Responsibilities:\n• Develop new user-facing features using React.js\n• Build reusable components and front-end libraries\n• Translate designs and wireframes into high-quality code\n• Optimize components for maximum performance across devices`,
      requirements: `• 4+ years of experience with React.js and its core principles\n• Strong proficiency in JavaScript, including DOM manipulation and JavaScript object model\n• Experience with popular React.js workflows (such as Flux or Redux)\n• Familiarity with newer specifications of EcmaScript\n• Experience with data structure libraries\n• Knowledge of isomorphic React is a plus`,
      companyInfo: "TechCorp Solutions is a leading product company specializing in enterprise software solutions. We serve over 500+ clients globally and are known for our innovative approach to technology.",
      matchScore: 94,
      postedDate: "2 days ago",
      applicants: 45
    },
    {
      id: 2,
      title: "Full Stack JavaScript Developer",
      company: "InnovateLabs",
      companyType: "Startup",
      location: "Mumbai, Maharashtra",
      workType: "Remote",
      salaryMin: 800000,
      salaryMax: 1400000,
      experienceMin: 2,
      experienceMax: 5,
      skills: ["JavaScript", "React", "Node.js", "Express", "PostgreSQL", "Docker", "Git"],
      description: `Join our fast-growing startup as a Full Stack JavaScript Developer. You'll work on cutting-edge projects and have the opportunity to shape our technology stack.\n\nWhat you'll do:\n• Develop and maintain web applications using modern JavaScript frameworks\n• Design and implement RESTful APIs\n• Collaborate with cross-functional teams to define and develop new features\n• Write clean, maintainable, and efficient code`,
      requirements: `• 2+ years of experience in full-stack JavaScript development\n• Proficiency in React.js and Node.js\n• Experience with relational databases (PostgreSQL preferred)\n• Understanding of RESTful API design principles\n• Familiarity with version control systems (Git)\n• Experience with containerization (Docker) is a plus`,
      companyInfo: "InnovateLabs is a rapidly growing startup focused on building next-generation SaaS solutions. We offer equity participation and a flexible work environment.",
      matchScore: 89,
      postedDate: "1 day ago",
      applicants: 23
    },
    {
      id: 3,
      title: "Frontend Developer - React Specialist",
      company: "Digital Dynamics",
      companyType: "Service Company",
      location: "Pune, Maharashtra",
      workType: "On-site",
      salaryMin: 600000,
      salaryMax: 1000000,
      experienceMin: 1,
      experienceMax: 4,
      skills: ["React", "JavaScript", "HTML5", "CSS3", "Sass", "Webpack", "Jest"],
      description: `We are seeking a talented Frontend Developer with React expertise to join our client-focused development team. You will work on diverse projects across various industries.\n\nResponsibilities:\n• Develop responsive web applications using React.js\n• Collaborate with UX/UI designers to implement pixel-perfect designs\n• Ensure cross-browser compatibility and optimize for performance\n• Participate in code reviews and maintain coding standards`,
      requirements: `• 1+ years of professional experience with React.js\n• Strong understanding of HTML5, CSS3, and JavaScript ES6+\n• Experience with CSS preprocessors (Sass/Less)\n• Knowledge of build tools like Webpack\n• Understanding of testing frameworks (Jest, React Testing Library)\n• Good communication skills for client interaction`,
      companyInfo: "Digital Dynamics is a well-established service company providing custom software solutions to clients across various industries including healthcare, finance, and e-commerce.",
      matchScore: 85,
      postedDate: "3 days ago",
      applicants: 67
    },
    {
      id: 4,
      title: "React Native Mobile Developer",
      company: "MobileFirst Technologies",
      companyType: "Mid-size Company",
      location: "Hyderabad, Telangana",
      workType: "Hybrid",
      salaryMin: 900000,
      salaryMax: 1500000,
      experienceMin: 3,
      experienceMax: 6,
      skills: ["React Native", "JavaScript", "React", "Redux", "iOS", "Android", "Firebase"],
      description: `Looking for a skilled React Native Developer to build high-quality mobile applications for both iOS and Android platforms.\n\nKey Duties:\n• Develop cross-platform mobile applications using React Native\n• Integrate with native modules and third-party libraries\n• Optimize app performance and ensure smooth user experience\n• Collaborate with backend developers to integrate APIs`,
      requirements: `• 3+ years of experience in React Native development\n• Strong knowledge of React.js fundamentals\n• Experience with mobile app deployment (App Store, Google Play)\n• Understanding of native mobile development concepts\n• Experience with state management libraries (Redux/MobX)\n• Knowledge of mobile UI/UX best practices`,
      companyInfo: "MobileFirst Technologies specializes in mobile app development and has delivered 100+ successful mobile applications for clients ranging from startups to Fortune 500 companies.",
      matchScore: 82,
      postedDate: "5 days ago",
      applicants: 34
    },
    {
      id: 5,
      title: "JavaScript Developer - Backend Focus",
      company: "ServerSide Solutions",
      companyType: "Enterprise",
      location: "Chennai, Tamil Nadu",
      workType: "On-site",
      salaryMin: 700000,
      salaryMax: 1200000,
      experienceMin: 2,
      experienceMax: 5,
      skills: ["Node.js", "JavaScript", "Express", "MongoDB", "Redis", "Docker", "Kubernetes"],
      description: `We are hiring a JavaScript Developer with backend expertise to work on scalable server-side applications and microservices architecture.\n\nWhat you'll work on:\n• Design and develop RESTful APIs using Node.js and Express\n• Implement microservices architecture patterns\n• Work with databases and caching solutions\n• Deploy and maintain applications in cloud environments`,
      requirements: `• 2+ years of backend development experience with Node.js\n• Strong understanding of JavaScript and asynchronous programming\n• Experience with NoSQL databases (MongoDB preferred)\n• Knowledge of caching strategies (Redis)\n• Understanding of containerization and orchestration\n• Experience with cloud platforms (AWS/Azure/GCP)`,
      companyInfo: "ServerSide Solutions is an enterprise-level company providing robust backend solutions and infrastructure services to large-scale applications serving millions of users.",
      matchScore: 78,
      postedDate: "1 week ago",
      applicants: 89
    }
  ];

  // Mock user profile from form submission
  const mockUserProfile = {
    skills: ["React", "JavaScript", "Node.js", "MongoDB", "HTML", "CSS"],
    location: "Bangalore, Karnataka",
    education: "Bachelor of Technology in Computer Science",
    experience: 3,
    preferences: {
      workType: "Hybrid",
      salaryRange: "₹8L - ₹15L"
    }
  };

  // TF-IDF Vectorization and Cosine Similarity Implementation
  const calculateTFIDF = (documents) => {
    const vocabulary = new Set();
    const documentTerms = documents?.map(doc => {
      const terms = doc?.toLowerCase()?.split(/\s+/)?.filter(term => term?.length > 2);
      terms?.forEach(term => vocabulary?.add(term));
      return terms;
    });

    const vocabArray = Array.from(vocabulary);
    const tfidfVectors = documentTerms?.map(terms => {
      const termFreq = {};
      terms?.forEach(term => {
        termFreq[term] = (termFreq?.[term] || 0) + 1;
      });

      return vocabArray?.map(term => {
        const tf = (termFreq?.[term] || 0) / terms?.length;
        const df = documentTerms?.filter(doc => doc?.includes(term))?.length;
        const idf = Math.log(documents?.length / (df || 1));
        return tf * idf;
      });
    });

    return tfidfVectors;
  };

  const cosineSimilarity = (vecA, vecB) => {
    const dotProduct = vecA?.reduce((sum, a, i) => sum + a * vecB?.[i], 0);
    const magnitudeA = Math.sqrt(vecA?.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB?.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magnitudeA * magnitudeB) || 0;
  };

  const calculateJobMatches = (userProfile, jobs) => {
    const startTime = performance.now();
    
    // Create text representations
    const userText = `${userProfile?.skills?.join(' ')} ${userProfile?.location} ${userProfile?.education}`;
    const jobTexts = jobs?.map(job => 
      `${job?.title} ${job?.skills?.join(' ')} ${job?.location} ${job?.description} ${job?.requirements || ''}`
    );
    
    // Calculate TF-IDF vectors
    const allTexts = [userText, ...jobTexts];
    const tfidfVectors = calculateTFIDF(allTexts);
    const userVector = tfidfVectors?.[0];
    const jobVectors = tfidfVectors?.slice(1);
    
    // Calculate similarities and sort
    const jobsWithScores = jobs?.map((job, index) => ({
      ...job,
      matchScore: Math.round(cosineSimilarity(userVector, jobVectors?.[index]) * 100)
    }))?.sort((a, b) => b?.matchScore - a?.matchScore);
    
    const endTime = performance.now();
    setProcessingTime(Math.round(endTime - startTime));
    
    return jobsWithScores?.slice(0, 5); // Top 5 matches
  };

  useEffect(() => {
    // Simulate loading and processing
    const timer = setTimeout(() => {
      const profile = location?.state?.userProfile || mockUserProfile;
      setUserProfile(profile);
      
      const matches = calculateJobMatches(profile, mockJobData);
      setJobRecommendations(matches);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location?.state]);

  const handleNewSearch = () => {
    navigate('/job-recommendation-form');
  };

  const handleSaveJob = (job) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs?.has(job?.id)) {
      newSavedJobs?.delete(job?.id);
    } else {
      newSavedJobs?.add(job?.id);
    }
    setSavedJobs(newSavedJobs);
  };

  const handleApplyJob = (job) => {
    // In a real application, this would redirect to the job application page
    window.open(`https://example.com/apply/${job?.id}`, '_blank');
  };

  const handleRefineSearch = () => {
    navigate('/job-recommendation-form', { 
      state: { 
        refineMode: true, 
        currentProfile: userProfile 
      } 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <ProcessNavigation 
          currentStep="processing" 
          isProcessing={true}
          hasResults={false}
        />
        <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <LoadingState />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProcessNavigation 
        currentStep="results" 
        isProcessing={false}
        hasResults={jobRecommendations?.length > 0}
        onNewSearch={handleNewSearch}
      />
      <ResultsHeader 
        totalResults={jobRecommendations?.length}
        processingTime={processingTime}
        onNewSearch={handleNewSearch}
        userProfile={userProfile}
      />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {jobRecommendations?.length === 0 ? (
          <EmptyResults 
            onNewSearch={handleNewSearch}
            onRefineSearch={handleRefineSearch}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Results Column */}
            <div className="lg:col-span-3 space-y-6">
              {/* Results Info */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  Your Job Matches / आपके जॉब मैच
                </h2>
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="TrendingUp" size={16} />
                  <span>Ranked by AI similarity</span>
                </div>
              </div>

              {/* Job Cards */}
              {jobRecommendations?.map((job) => (
                <JobCard
                  key={job?.id}
                  job={job}
                  onSave={handleSaveJob}
                  onApply={handleApplyJob}
                  isSaved={savedJobs?.has(job?.id)}
                />
              ))}

              {/* Load More Button */}
              <div className="text-center pt-8">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  disabled
                >
                  Load More Results (Coming Soon)
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <UserProfileSummary userProfile={userProfile} />
              
              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Bell"
                    iconPosition="left"
                    size="sm"
                  >
                    Set Job Alerts
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Download"
                    iconPosition="left"
                    size="sm"
                  >
                    Export Results
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Share2"
                    iconPosition="left"
                    size="sm"
                  >
                    Share Profile
                  </Button>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Lightbulb" size={18} className="text-accent" />
                  <h4 className="font-medium text-foreground">Pro Tips</h4>
                </div>
                <ul className="text-sm text-text-secondary space-y-2">
                  <li>• Update your profile regularly for better matches</li>
                  <li>• Apply within 24-48 hours for best response</li>
                  <li>• Customize your application for each role</li>
                  <li>• Follow up with recruiters after applying</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-text-secondary">
            <p>
              © {new Date()?.getFullYear()} Avsar AI. Powered by advanced machine learning algorithms.
            </p>
            <p className="mt-1">
              Helping job seekers find their perfect career match with AI precision.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JobRecommendationsResults;