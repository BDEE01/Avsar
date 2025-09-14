import React from 'react';

class RecommendationEngine {
  constructor() {
    this.jobsData = [
      {
        id: 'job_001',
        title: 'Senior Frontend Developer',
        company: 'TechCorp Solutions',
        location: 'Bangalore, Karnataka',
        type: 'Full-time',
        experience: '3-5 years',
        salary: '₹12-18 LPA',
        skills: ['React.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Node.js', 'Git'],
        education: 'B.Tech Computer Science, BCA, MCA',
        description: `We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for developing user-facing web applications using modern JavaScript frameworks.\n\nKey Responsibilities:\n• Develop responsive web applications using React.js\n• Collaborate with backend developers and designers\n• Optimize applications for maximum speed and scalability\n• Write clean, maintainable code following best practices`,
        requirements: 'Strong experience with React.js, JavaScript ES6+, responsive design, RESTful APIs',
        benefits: ['Health Insurance', 'Flexible Working Hours', 'Learning Budget', 'Performance Bonus'],
        posted: '2 days ago',
        applicants: 45,
        matchScore: 0
      },
      {
        id: 'job_002',
        title: 'Full Stack Python Developer',
        company: 'InnovateLabs Pvt Ltd',
        location: 'Mumbai, Maharashtra',
        type: 'Full-time',
        experience: '2-4 years',
        salary: '₹10-15 LPA',
        skills: ['Python', 'Django', 'Flask', 'JavaScript', 'React.js', 'PostgreSQL', 'AWS', 'Docker'],
        education: 'B.Tech, B.Sc Computer Science, MCA',
        description: `Join our innovative team as a Full Stack Python Developer. Work on cutting-edge projects using Python, Django, and modern frontend technologies.\n\nWhat you'll do:\n• Build scalable web applications using Python and Django\n• Develop RESTful APIs and integrate with frontend applications\n• Deploy applications on cloud platforms like AWS\n• Collaborate with cross-functional teams`,
        requirements: 'Proficiency in Python, Django/Flask, database design, version control with Git',
        benefits: ['Medical Coverage', 'Work from Home', 'Annual Bonus', 'Skill Development Programs'],
        posted: '1 day ago',
        applicants: 32,
        matchScore: 0
      },
      {
        id: 'job_003',
        title: 'UI/UX Designer',
        company: 'DesignStudio Inc',
        location: 'Delhi, Delhi',
        type: 'Full-time',
        experience: '1-3 years',
        salary: '₹6-10 LPA',
        skills: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Sketch', 'Adobe XD', 'HTML5', 'CSS3'],
        education: 'Any Graduate, Design Diploma preferred',
        description: `We're seeking a creative UI/UX Designer to create amazing user experiences. You will be responsible for the entire design process from concept to final hand-off to engineering.\n\nResponsibilities:\n• Create wireframes, prototypes, and high-fidelity designs\n• Conduct user research and usability testing\n• Collaborate with product managers and developers\n• Maintain design systems and style guides`,
        requirements: 'Strong portfolio, proficiency in design tools, understanding of user-centered design principles',
        benefits: ['Creative Environment', 'Flexible Hours', 'Health Insurance', 'Professional Development'],
        posted: '3 days ago',
        applicants: 28,
        matchScore: 0
      },
      {
        id: 'job_004',
        title: 'DevOps Engineer',
        company: 'CloudTech Systems',
        location: 'Pune, Maharashtra',
        type: 'Full-time',
        experience: '3-6 years',
        salary: '₹15-22 LPA',
        skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Linux', 'Python', 'Git'],
        education: 'B.Tech, B.E. in Computer Science or related field',
        description: `Looking for an experienced DevOps Engineer to help us build and maintain our cloud infrastructure. You'll work with cutting-edge technologies to ensure our applications are scalable and reliable.\n\nKey Areas:\n• Design and implement CI/CD pipelines\n• Manage cloud infrastructure on AWS\n• Automate deployment processes\n• Monitor system performance and reliability`,
        requirements: 'Experience with cloud platforms, containerization, automation tools, scripting languages',
        benefits: ['Competitive Salary', 'Stock Options', 'Remote Work', 'Learning Opportunities'],
        posted: '1 week ago',
        applicants: 67,
        matchScore: 0
      },
      {
        id: 'job_005',
        title: 'Mobile App Developer - React Native',
        company: 'MobileFirst Technologies',
        location: 'Hyderabad, Telangana',
        type: 'Full-time',
        experience: '2-5 years',
        salary: '₹8-14 LPA',
        skills: ['React Native', 'JavaScript', 'TypeScript', 'iOS Development', 'Android Development', 'Redux', 'Firebase'],
        education: 'B.Tech, BCA, MCA in Computer Science or related field',
        description: `Join our mobile development team to build amazing cross-platform applications. Work with React Native to create apps that run seamlessly on both iOS and Android platforms.\n\nWhat we offer:\n• Work on consumer-facing mobile applications\n• Collaborate with designers and backend developers\n• Implement new features and optimize performance\n• Participate in code reviews and technical discussions`,
        requirements: 'Strong React Native experience, mobile app development lifecycle, API integration',
        benefits: ['Health Coverage', 'Flexible Timing', 'Performance Incentives', 'Team Outings'],
        posted: '4 days ago',
        applicants: 41,
        matchScore: 0
      },
      {
        id: 'job_006',
        title: 'Data Scientist',
        company: 'Analytics Pro Solutions',
        location: 'Bangalore, Karnataka',
        type: 'Full-time',
        experience: '2-4 years',
        salary: '₹12-20 LPA',
        skills: ['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'NumPy', 'SQL', 'Tableau', 'Statistics'],
        education: 'B.Tech, M.Tech, M.Sc in Computer Science, Statistics, Mathematics',
        description: `We're looking for a Data Scientist to join our analytics team. You'll work on machine learning projects and help derive insights from large datasets to drive business decisions.\n\nRole includes:\n• Develop predictive models and algorithms\n• Analyze large datasets to identify trends and patterns\n• Create data visualizations and reports\n• Collaborate with business stakeholders`,
        requirements: 'Strong analytical skills, machine learning experience, programming in Python/R, statistical knowledge',
        benefits: ['Competitive Package', 'Research Opportunities', 'Conference Attendance', 'Flexible Work'],
        posted: '5 days ago',
        applicants: 53,
        matchScore: 0
      },
      {
        id: 'job_007',
        title: 'Java Backend Developer',
        company: 'Enterprise Solutions Ltd',
        location: 'Gurgaon, Haryana',
        type: 'Full-time',
        experience: '3-7 years',
        salary: '₹14-25 LPA',
        skills: ['Java', 'Spring Boot', 'Microservices', 'MySQL', 'MongoDB', 'Kafka', 'Redis', 'AWS'],
        education: 'B.Tech, B.E., MCA in Computer Science or related field',
        description: `Join our backend development team to build robust, scalable enterprise applications. Work with modern Java technologies and microservices architecture.\n\nResponsibilities:\n• Design and develop RESTful APIs\n• Build microservices using Spring Boot\n• Optimize database queries and performance\n• Implement security best practices`,
        requirements: 'Strong Java programming, Spring framework, database design, microservices architecture',
        benefits: ['Excellent Compensation', 'Health Benefits', 'Learning Budget', 'Career Growth'],
        posted: '2 days ago',
        applicants: 72,
        matchScore: 0
      },
      {
        id: 'job_008',
        title: 'Frontend Developer - Angular',
        company: 'WebSolutions India',
        location: 'Chennai, Tamil Nadu',
        type: 'Full-time',
        experience: '1-3 years',
        salary: '₹5-9 LPA',
        skills: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SASS', 'Bootstrap', 'Git'],
        education: 'B.Tech, BCA, B.Sc Computer Science',
        description: `We are hiring a Frontend Developer with Angular expertise to join our web development team. You'll be working on modern web applications with a focus on user experience.\n\nKey tasks:\n• Develop single-page applications using Angular\n• Implement responsive designs and UI components\n• Integrate with backend APIs\n• Ensure cross-browser compatibility`,
        requirements: 'Angular framework experience, TypeScript, responsive web design, version control',
        benefits: ['Health Insurance', 'Skill Enhancement', 'Flexible Hours', 'Team Building Activities'],
        posted: '1 day ago',
        applicants: 29,
        matchScore: 0
      },
      {
        id: 'job_009',
        title: 'Quality Assurance Engineer',
        company: 'TestPro Services',
        location: 'Noida, Uttar Pradesh',
        type: 'Full-time',
        experience: '2-5 years',
        salary: '₹7-12 LPA',
        skills: ['Manual Testing', 'Automation Testing', 'Selenium', 'Java', 'TestNG', 'JIRA', 'API Testing'],
        education: 'B.Tech, BCA, MCA, B.Sc in Computer Science or related field',
        description: `Looking for a QA Engineer to ensure the quality of our software products. You'll be responsible for both manual and automated testing across web and mobile applications.\n\nWhat you'll do:\n• Design and execute test cases\n• Perform functional and regression testing\n• Develop automation scripts using Selenium\n• Report and track defects`,
        requirements: 'Testing methodologies, automation tools, defect tracking, attention to detail',
        benefits: ['Professional Growth', 'Health Coverage', 'Work-Life Balance', 'Training Programs'],
        posted: '6 days ago',
        applicants: 38,
        matchScore: 0
      },
      {
        id: 'job_010',
        title: 'Product Manager - Tech',
        company: 'InnovateNow Technologies',
        location: 'Mumbai, Maharashtra',
        type: 'Full-time',
        experience: '4-8 years',
        salary: '₹20-35 LPA',
        skills: ['Product Management', 'Agile', 'Scrum', 'Analytics', 'User Research', 'Roadmap Planning', 'Stakeholder Management'],
        education: 'B.Tech, MBA preferred, any graduate with relevant experience',
        description: `We're seeking an experienced Product Manager to drive our technology products. You'll work closely with engineering, design, and business teams to deliver exceptional user experiences.\n\nCore responsibilities:\n• Define product strategy and roadmap\n• Gather and prioritize product requirements\n• Work with cross-functional teams\n• Analyze product metrics and user feedback`,
        requirements: 'Product management experience, analytical skills, stakeholder management, technical understanding',
        benefits: ['Leadership Role', 'Stock Options', 'Premium Healthcare', 'Professional Development'],
        posted: '3 days ago',
        applicants: 84,
        matchScore: 0
      },
      {
        id: 'job_011',
        title: 'Cybersecurity Analyst',
        company: 'SecureNet Solutions',
        location: 'Bangalore, Karnataka',
        type: 'Full-time',
        experience: '2-6 years',
        salary: '₹10-18 LPA',
        skills: ['Network Security', 'Penetration Testing', 'SIEM', 'Incident Response', 'Risk Assessment', 'Compliance'],
        education: 'B.Tech, B.E. in Computer Science, Cybersecurity certifications preferred',
        description: `Join our cybersecurity team to protect our organization's digital assets. You'll be responsible for monitoring, detecting, and responding to security threats.\n\nKey areas:\n• Monitor security events and incidents\n• Conduct vulnerability assessments\n• Implement security policies and procedures\n• Respond to security breaches`,
        requirements: 'Security frameworks knowledge, threat analysis, incident response, security tools',
        benefits: ['Specialized Training', 'Certification Support', 'Competitive Salary', 'Career Advancement'],
        posted: '1 week ago',
        applicants: 47,
        matchScore: 0
      },
      {
        id: 'job_012',
        title: 'Business Analyst - IT',
        company: 'ConsultPro India',
        location: 'Delhi, Delhi',
        type: 'Full-time',
        experience: '2-5 years',
        salary: '₹8-15 LPA',
        skills: ['Business Analysis', 'Requirements Gathering', 'Process Modeling', 'SQL', 'Excel', 'Documentation'],
        education: 'B.Tech, BCA, MBA, B.Com with IT knowledge',
        description: `We're looking for a Business Analyst to bridge the gap between business needs and technical solutions. You'll work with stakeholders to understand requirements and translate them into technical specifications.\n\nResponsibilities:\n• Gather and document business requirements\n• Analyze business processes and workflows\n• Create functional specifications\n• Facilitate communication between teams`,
        requirements: 'Analytical thinking, stakeholder management, documentation skills, basic technical knowledge',
        benefits: ['Client Interaction', 'Skill Development', 'Health Benefits', 'Performance Bonus'],
        posted: '4 days ago',
        applicants: 56,
        matchScore: 0
      }
    ];
  }

  // TF-IDF Vectorization Implementation
  calculateTFIDF(documents) {
    const vocabulary = new Set();
    const processedDocs = documents?.map(doc => {
      const words = this.preprocessText(doc)?.split(' ');
      words?.forEach(word => vocabulary?.add(word));
      return words;
    });

    const vocabArray = Array.from(vocabulary);
    const tfidfVectors = [];

    processedDocs?.forEach(doc => {
      const vector = new Array(vocabArray.length)?.fill(0);
      const docLength = doc?.length;

      // Calculate TF for each term
      const termFreq = {};
      doc?.forEach(term => {
        termFreq[term] = (termFreq?.[term] || 0) + 1;
      });

      vocabArray?.forEach((term, index) => {
        if (termFreq?.[term]) {
          const tf = termFreq?.[term] / docLength;
          const df = processedDocs?.filter(d => d?.includes(term))?.length;
          const idf = Math.log(processedDocs?.length / df);
          vector[index] = tf * idf;
        }
      });

      tfidfVectors?.push(vector);
    });

    return { vectors: tfidfVectors, vocabulary: vocabArray };
  }

  // Cosine Similarity Calculation
  calculateCosineSimilarity(vectorA, vectorB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vectorA?.length; i++) {
      dotProduct += vectorA?.[i] * vectorB?.[i];
      normA += vectorA?.[i] * vectorA?.[i];
      normB += vectorB?.[i] * vectorB?.[i];
    }

    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);

    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (normA * normB);
  }

  // Text Preprocessing
  preprocessText(text) {
    return text?.toLowerCase()?.replace(/[^\w\s]/g, ' ')?.replace(/\s+/g, ' ')?.trim();
  }

  // Convert user input to searchable text
  userProfileToText(skills, location, education) {
    const skillsText = skills?.map(skill => skill?.label)?.join(' ');
    return `${skillsText} ${location} ${education}`?.trim();
  }

  // Convert job data to searchable text
  jobToText(job) {
    return `${job?.title} ${job?.skills?.join(' ')} ${job?.location} ${job?.education} ${job?.description} ${job?.requirements}`;
  }

  // Main recommendation function
  getRecommendations(userSkills, userLocation, userEducation) {
    try {
      // Create user profile text
      const userProfileText = this.userProfileToText(userSkills, userLocation, userEducation);
      
      // Create job texts
      const jobTexts = this.jobsData?.map(job => this.jobToText(job));
      
      // Combine user profile with job texts for TF-IDF calculation
      const allTexts = [userProfileText, ...jobTexts];
      
      // Calculate TF-IDF vectors
      const { vectors } = this.calculateTFIDF(allTexts);
      
      // User profile vector is the first one
      const userVector = vectors?.[0];
      
      // Calculate similarity scores for each job
      const jobsWithScores = this.jobsData?.map((job, index) => {
        const jobVector = vectors?.[index + 1]; // +1 because user vector is at index 0
        const similarity = this.calculateCosineSimilarity(userVector, jobVector);
        
        return {
          ...job,
          matchScore: Math.round(similarity * 100) // Convert to percentage
        };
      });

      // Sort by similarity score (highest first) and return top matches
      return jobsWithScores?.sort((a, b) => b?.matchScore - a?.matchScore)?.slice(0, 5); // Return top 5 matches

    } catch (error) {
      console.error('Error generating recommendations:', error);
      return [];
    }
  }

  // Get all jobs (for testing purposes)
  getAllJobs() {
    return this.jobsData;
  }
}

export default RecommendationEngine;