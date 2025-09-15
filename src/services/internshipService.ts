// Mock internship data and services
export interface Internship {
  id: string;
  title: string;
  company: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    city: string;
  };
  tags: string[];
  type: 'remote' | 'onsite' | 'hybrid';
  duration: string;
  stipend?: string;
  postedDate: string;
}

export const mockInternships: Internship[] = [
  // 40 dummy internships, each mapped to a tech skill from onboarding
  {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'Webify Solutions',
    description: 'Work with React, HTML, CSS, and JavaScript to build modern web interfaces.',
    location: { lat: 19.0760, lng: 72.8777, city: 'Mumbai' },
    tags: ['Frontend Development', 'React', 'HTML', 'CSS', 'JavaScript'],
    type: 'onsite',
    duration: '3 months',
    stipend: '₹10,000/month',
    postedDate: '2025-01-15'
  },
  {
    id: '2',
    title: 'Backend Developer Intern',
    company: 'CloudCore',
    description: 'Develop REST APIs and microservices using Node.js and Express.',
    location: { lat: 12.9716, lng: 77.5946, city: 'Bangalore' },
    tags: ['Backend Development', 'Node.js', 'Express', 'API Development & Integration'],
    type: 'remote',
    duration: '4 months',
    stipend: '₹12,000/month',
    postedDate: '2025-01-14'
  },
  {
    id: '3',
    title: 'Full Stack Developer Intern',
    company: 'StackMakers',
    description: 'End-to-end web app development using MERN stack.',
    location: { lat: 28.7041, lng: 77.1025, city: 'Delhi' },
    tags: ['Full Stack Development', 'MongoDB', 'Express', 'React', 'Node.js'],
    type: 'hybrid',
    duration: '6 months',
    stipend: '₹15,000/month',
    postedDate: '2025-01-13'
  },
  {
    id: '4',
    title: 'Mobile App Developer Intern',
    company: 'AppCrafters',
    description: 'Build cross-platform mobile apps using Flutter and React Native.',
    location: { lat: 22.5726, lng: 88.3639, city: 'Kolkata' },
    tags: ['Mobile App Development', 'Flutter', 'React Native', 'Cross-platform Development'],
    type: 'onsite',
    duration: '5 months',
    stipend: '₹13,000/month',
    postedDate: '2025-01-12'
  },
  {
    id: '5',
    title: 'AI Research Intern',
    company: 'AIMinds',
    description: 'Research and prototype AI models for real-world applications.',
    location: { lat: 13.0827, lng: 80.2707, city: 'Chennai' },
    tags: ['Artificial Intelligence (AI)', 'Python', 'TensorFlow', 'Research'],
    type: 'remote',
    duration: '6 months',
    stipend: '₹18,000/month',
    postedDate: '2025-01-11'
  },
  {
    id: '6',
    title: 'Machine Learning Intern',
    company: 'MLWorks',
    description: 'Build and train ML models using Python and scikit-learn.',
    location: { lat: 18.5204, lng: 73.8567, city: 'Pune' },
    tags: ['Machine Learning (ML)', 'Python', 'scikit-learn', 'Data Science'],
    type: 'hybrid',
    duration: '4 months',
    stipend: '₹14,000/month',
    postedDate: '2025-01-10'
  },
  {
    id: '7',
    title: 'Data Science Intern',
    company: 'DataViz Analytics',
    description: 'Analyze datasets and build predictive models.',
    location: { lat: 23.0225, lng: 72.5714, city: 'Ahmedabad' },
    tags: ['Data Science', 'Python', 'Data Analytics', 'Data Visualization'],
    type: 'onsite',
    duration: '5 months',
    stipend: '₹13,000/month',
    postedDate: '2025-01-09'
  },
  {
    id: '8',
    title: 'Data Analytics Intern',
    company: 'Insightful',
    description: 'Work with Excel, SQL, and BI tools to analyze business data.',
    location: { lat: 17.3850, lng: 78.4867, city: 'Hyderabad' },
    tags: ['Data Analytics', 'SQL', 'Excel', 'Power BI'],
    type: 'remote',
    duration: '3 months',
    stipend: '₹10,000/month',
    postedDate: '2025-01-08'
  },
  {
    id: '9',
    title: 'DevOps Intern',
    company: 'CloudOps',
    description: 'Automate deployments and manage cloud infrastructure.',
    location: { lat: 15.2993, lng: 74.1240, city: 'Goa' },
    tags: ['DevOps & Cloud Computing', 'AWS', 'CI/CD', 'Docker'],
    type: 'hybrid',
    duration: '6 months',
    stipend: '₹16,000/month',
    postedDate: '2025-01-07'
  },
  {
    id: '10',
    title: 'Cybersecurity Intern',
    company: 'SecureNet',
    description: 'Assist in penetration testing and security audits.',
    location: { lat: 19.0760, lng: 72.8777, city: 'Mumbai' },
    tags: ['Cybersecurity', 'Web Security', 'Penetration Testing', 'Network Administration'],
    type: 'onsite',
    duration: '4 months',
    stipend: '₹15,000/month',
    postedDate: '2025-01-06'
  },
  // ... 30 more dummy internships for each skill ...
  {
    id: '11',
    title: 'Blockchain Developer Intern',
    company: 'BlockForge',
    description: 'Develop smart contracts and blockchain apps using Solidity and Ethereum.',
    location: { lat: 28.7041, lng: 77.1025, city: 'Delhi' },
    tags: ['Blockchain Development', 'Solidity', 'Ethereum', 'Smart Contracts'],
    type: 'remote',
    duration: '5 months',
    stipend: '₹17,000/month',
    postedDate: '2025-01-05'
  },
  {
    id: '12',
    title: 'UI/UX Design Intern',
    company: 'DesignForward',
    description: 'Design user interfaces and experiences for web/mobile apps.',
    location: { lat: 12.9716, lng: 77.5946, city: 'Bangalore' },
    tags: ['UI/UX Design', 'Figma', 'Wireframing', 'Prototyping'],
    type: 'onsite',
    duration: '4 months',
    stipend: '₹11,000/month',
    postedDate: '2025-01-04'
  },
  {
    id: '13',
    title: 'Database Management Intern',
    company: 'DataKeepers',
    description: 'Manage and optimize SQL/NoSQL databases.',
    location: { lat: 22.5726, lng: 88.3639, city: 'Kolkata' },
    tags: ['Database Management', 'SQL', 'NoSQL', 'MongoDB'],
    type: 'hybrid',
    duration: '3 months',
    stipend: '₹12,000/month',
    postedDate: '2025-01-03'
  },
  {
    id: '14',
    title: 'Game Development Intern',
    company: 'PlayMakers',
    description: 'Develop 2D/3D games using Unity and C#.',
    location: { lat: 13.0827, lng: 80.2707, city: 'Chennai' },
    tags: ['Game Development', 'Unity', 'C#', '3D Modeling'],
    type: 'onsite',
    duration: '6 months',
    stipend: '₹14,000/month',
    postedDate: '2025-01-02'
  },
  {
    id: '15',
    title: 'Embedded Systems Intern',
    company: 'EmbedTech',
    description: 'Work on IoT and embedded systems using C/C++ and Arduino.',
    location: { lat: 18.5204, lng: 73.8567, city: 'Pune' },
    tags: ['Embedded Systems / IoT Development', 'C', 'C++', 'Arduino'],
    type: 'remote',
    duration: '5 months',
    stipend: '₹13,000/month',
    postedDate: '2025-01-01'
  },
  {
    id: '16',
    title: 'Big Data Engineering Intern',
    company: 'BigDataX',
    description: 'Work with Hadoop, Spark, and big data pipelines.',
    location: { lat: 23.0225, lng: 72.5714, city: 'Ahmedabad' },
    tags: ['Big Data Engineering', 'Hadoop', 'Spark', 'Data Pipelines'],
    type: 'hybrid',
    duration: '6 months',
    stipend: '₹16,000/month',
    postedDate: '2024-12-31'
  },
  {
    id: '17',
    title: 'Software Testing Intern',
    company: 'Testify',
    description: 'Manual and automated software testing using Selenium.',
    location: { lat: 17.3850, lng: 78.4867, city: 'Hyderabad' },
    tags: ['Software Testing & QA', 'Selenium', 'Testing Automation'],
    type: 'onsite',
    duration: '4 months',
    stipend: '₹10,000/month',
    postedDate: '2024-12-30'
  },
  {
    id: '18',
    title: 'API Developer Intern',
    company: 'APIConnect',
    description: 'Develop and document RESTful APIs.',
    location: { lat: 15.2993, lng: 74.1240, city: 'Goa' },
    tags: ['API Development & Integration', 'REST', 'Swagger', 'API Documentation'],
    type: 'remote',
    duration: '3 months',
    stipend: '₹11,000/month',
    postedDate: '2024-12-29'
  },
  {
    id: '19',
    title: 'Project Management Intern',
    company: 'PMO Solutions',
    description: 'Assist in project planning and agile ceremonies.',
    location: { lat: 19.0760, lng: 72.8777, city: 'Mumbai' },
    tags: ['Project Management', 'Agile Methodologies', 'Scrum'],
    type: 'hybrid',
    duration: '5 months',
    stipend: '₹12,000/month',
    postedDate: '2024-12-28'
  },
  {
    id: '20',
    title: 'Agile Intern',
    company: 'AgileX',
    description: 'Learn and implement agile methodologies in software teams.',
    location: { lat: 12.9716, lng: 77.5946, city: 'Bangalore' },
    tags: ['Agile Methodologies', 'Scrum', 'Kanban'],
    type: 'onsite',
    duration: '4 months',
    stipend: '₹10,000/month',
    postedDate: '2024-12-27'
  },
  {
    id: '21',
    title: 'Git & Version Control Intern',
    company: 'CodeTrack',
    description: 'Work with Git, GitHub, and version control best practices.',
    location: { lat: 22.5726, lng: 88.3639, city: 'Kolkata' },
    tags: ['Version Control (Git)', 'GitHub', 'Collaboration'],
    type: 'remote',
    duration: '3 months',
    stipend: '₹9,000/month',
    postedDate: '2024-12-26'
  },
  {
    id: '22',
    title: 'Technical Writing Intern',
    company: 'DocuTech',
    description: 'Write technical documentation and user guides.',
    location: { lat: 13.0827, lng: 80.2707, city: 'Chennai' },
    tags: ['Technical Writing', 'API Documentation', 'User Guides'],
    type: 'onsite',
    duration: '4 months',
    stipend: '₹8,000/month',
    postedDate: '2024-12-25'
  },
  {
    id: '23',
    title: 'Cloud Architecture Intern',
    company: 'CloudBuilders',
    description: 'Design and deploy cloud solutions on AWS and Azure.',
    location: { lat: 18.5204, lng: 73.8567, city: 'Pune' },
    tags: ['Cloud Architecture', 'AWS', 'Azure', 'DevOps & Cloud Computing'],
    type: 'hybrid',
    duration: '6 months',
    stipend: '₹18,000/month',
    postedDate: '2024-12-24'
  },
  {
    id: '24',
    title: 'Network Admin Intern',
    company: 'NetSecure',
    description: 'Assist in network setup, monitoring, and troubleshooting.',
    location: { lat: 23.0225, lng: 72.5714, city: 'Ahmedabad' },
    tags: ['Network Administration', 'Web Security', 'System Design'],
    type: 'onsite',
    duration: '5 months',
    stipend: '₹13,000/month',
    postedDate: '2024-12-23'
  },
  {
    id: '25',
    title: 'System Design Intern',
    company: 'SysDesigners',
    description: 'Learn and apply system design principles for scalable apps.',
    location: { lat: 17.3850, lng: 78.4867, city: 'Hyderabad' },
    tags: ['System Design', 'Architecture', 'Performance Optimization'],
    type: 'remote',
    duration: '4 months',
    stipend: '₹12,000/month',
    postedDate: '2024-12-22'
  },
  {
    id: '26',
    title: 'Web Security Intern',
    company: 'SecureWeb',
    description: 'Test and secure web applications from vulnerabilities.',
    location: { lat: 15.2993, lng: 74.1240, city: 'Goa' },
    tags: ['Web Security', 'Penetration Testing', 'Cybersecurity'],
    type: 'hybrid',
    duration: '3 months',
    stipend: '₹11,000/month',
    postedDate: '2024-12-21'
  },
  {
    id: '27',
    title: 'Mobile UI Design Intern',
    company: 'AppDesigners',
    description: 'Design mobile app interfaces and user flows.',
    location: { lat: 19.0760, lng: 72.8777, city: 'Mumbai' },
    tags: ['Mobile UI Design', 'UI/UX Design', 'Figma'],
    type: 'onsite',
    duration: '4 months',
    stipend: '₹10,000/month',
    postedDate: '2024-12-20'
  },
  {
    id: '28',
    title: 'Cross-platform Dev Intern',
    company: 'CrossPlat',
    description: 'Develop apps for web, Android, and iOS using cross-platform tools.',
    location: { lat: 12.9716, lng: 77.5946, city: 'Bangalore' },
    tags: ['Cross-platform Development', 'Flutter', 'React Native'],
    type: 'remote',
    duration: '5 months',
    stipend: '₹13,000/month',
    postedDate: '2024-12-19'
  },
  {
    id: '29',
    title: 'NLP Intern',
    company: 'LangAI',
    description: 'Work on natural language processing projects using Python.',
    location: { lat: 22.5726, lng: 88.3639, city: 'Kolkata' },
    tags: ['Natural Language Processing', 'Python', 'AI'],
    type: 'hybrid',
    duration: '6 months',
    stipend: '₹15,000/month',
    postedDate: '2024-12-18'
  },
  {
    id: '30',
    title: 'Computer Vision Intern',
    company: 'VisionX',
    description: 'Develop computer vision models for image/video analysis.',
    location: { lat: 13.0827, lng: 80.2707, city: 'Chennai' },
    tags: ['Computer Vision', 'Deep Learning', 'Python'],
    type: 'onsite',
    duration: '5 months',
    stipend: '₹14,000/month',
    postedDate: '2024-12-17'
  },
  {
    id: '31',
    title: 'Robotics Intern',
    company: 'RoboTech',
    description: 'Build and program robots for automation tasks.',
    location: { lat: 18.5204, lng: 73.8567, city: 'Pune' },
    tags: ['Robotics', 'Embedded Systems / IoT Development', 'C++'],
    type: 'remote',
    duration: '6 months',
    stipend: '₹16,000/month',
    postedDate: '2024-12-16'
  },
  {
    id: '32',
    title: 'Edge Computing Intern',
    company: 'EdgeX',
    description: 'Work on edge computing solutions for IoT devices.',
    location: { lat: 23.0225, lng: 72.5714, city: 'Ahmedabad' },
    tags: ['Edge Computing', 'IoT', 'Embedded Systems / IoT Development'],
    type: 'hybrid',
    duration: '5 months',
    stipend: '₹13,000/month',
    postedDate: '2024-12-15'
  },
  {
    id: '33',
    title: 'Quantum Computing Intern',
    company: 'QubitLabs',
    description: 'Explore quantum algorithms and quantum programming.',
    location: { lat: 17.3850, lng: 78.4867, city: 'Hyderabad' },
    tags: ['Quantum Computing', 'Q#', 'Research'],
    type: 'onsite',
    duration: '6 months',
    stipend: '₹18,000/month',
    postedDate: '2024-12-14'
  },
  {
    id: '34',
    title: 'AR Developer Intern',
    company: 'AugmentX',
    description: 'Develop AR experiences for mobile and web.',
    location: { lat: 15.2993, lng: 74.1240, city: 'Goa' },
    tags: ['Augmented Reality (AR)', 'Unity', 'Mobile App Development'],
    type: 'remote',
    duration: '4 months',
    stipend: '₹12,000/month',
    postedDate: '2024-12-13'
  },
  {
    id: '35',
    title: 'VR Developer Intern',
    company: 'Virtuality',
    description: 'Create VR simulations and games.',
    location: { lat: 19.0760, lng: 72.8777, city: 'Mumbai' },
    tags: ['Virtual Reality (VR)', 'Unity', 'Game Development'],
    type: 'hybrid',
    duration: '5 months',
    stipend: '₹13,000/month',
    postedDate: '2024-12-12'
  },
  {
    id: '36',
    title: 'Data Visualization Intern',
    company: 'VizData',
    description: 'Create dashboards and visualizations using Tableau and D3.js.',
    location: { lat: 12.9716, lng: 77.5946, city: 'Bangalore' },
    tags: ['Data Visualization', 'Tableau', 'D3.js', 'Data Analytics'],
    type: 'onsite',
    duration: '4 months',
    stipend: '₹11,000/month',
    postedDate: '2024-12-11'
  },
  {
    id: '37',
    title: 'Scripting Intern',
    company: 'Scriptify',
    description: 'Automate tasks using Python, Bash, and PowerShell.',
    location: { lat: 22.5726, lng: 88.3639, city: 'Kolkata' },
    tags: ['Scripting (Python, Bash, etc.)', 'Automation', 'DevOps & Cloud Computing'],
    type: 'remote',
    duration: '3 months',
    stipend: '₹10,000/month',
    postedDate: '2024-12-10'
  },
  {
    id: '38',
    title: 'API Documentation Intern',
    company: 'DocuAPI',
    description: 'Document APIs and write developer guides.',
    location: { lat: 13.0827, lng: 80.2707, city: 'Chennai' },
    tags: ['API Documentation', 'Technical Writing', 'REST'],
    type: 'onsite',
    duration: '4 months',
    stipend: '₹9,000/month',
    postedDate: '2024-12-09'
  },
  {
    id: '39',
    title: 'Performance Optimization Intern',
    company: 'PerfOpt',
    description: 'Optimize web and mobile app performance.',
    location: { lat: 18.5204, lng: 73.8567, city: 'Pune' },
    tags: ['Performance Optimization', 'Frontend Development', 'System Design'],
    type: 'hybrid',
    duration: '5 months',
    stipend: '₹12,000/month',
    postedDate: '2024-12-08'
  },
  {
    id: '40',
    title: 'CI/CD Intern',
    company: 'DeployNow',
    description: 'Implement and maintain CI/CD pipelines for software projects.',
    location: { lat: 23.0225, lng: 72.5714, city: 'Ahmedabad' },
    tags: ['Continuous Integration/Continuous Deployment (CI/CD)', 'DevOps & Cloud Computing', 'Automation'],
    type: 'remote',
    duration: '6 months',
    stipend: '₹15,000/month',
    postedDate: '2024-12-07'
  }
];

// Simulate Gemini API call for content verification
export const verifyInternshipContent = async (description: string): Promise<number> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
  
  // Mock trust score calculation based on description quality
  let trustScore = 70; // Base score
  
  // Positive indicators
  if (description.includes('real projects')) trustScore += 10;
  if (description.includes('experienced')) trustScore += 8;
  if (description.includes('learn') || description.includes('training')) trustScore += 5;
  if (description.includes('mentorship') || description.includes('guidance')) trustScore += 7;
  if (description.length > 100) trustScore += 5;
  
  // Negative indicators
  if (description.includes('easy money')) trustScore -= 20;
  if (description.includes('no experience needed') && !description.includes('training')) trustScore -= 10;
  if (description.length < 50) trustScore -= 15;
  
  // Ensure score is within valid range
  trustScore = Math.min(Math.max(trustScore, 30), 98);
  
  return trustScore;
};

// Calculate skill gap for aspirational internships
export const calculateSkillGap = (userSkills: string[], requiredSkills: string[]) => {
  const missingSkills = requiredSkills.filter(skill => 
    !userSkills.some(userSkill => 
      userSkill.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(userSkill.toLowerCase())
    )
  );
  
  return {
    missingSkills,
    matchPercentage: ((requiredSkills.length - missingSkills.length) / requiredSkills.length) * 100
  };
};

// Generate skill-up path recommendations
export const generateSkillUpPath = (missingSkills: string[]) => {
  const skillPaths = {
    'React': {
      resources: ['React Official Docs', 'FreeCodeCamp React Course', 'React Tutorial on YouTube'],
      duration: '2-3 months',
      difficulty: 'Intermediate'
    },
    'Python': {
      resources: ['Python.org Tutorial', 'Codecademy Python Course', 'Python Crash Course Book'],
      duration: '1-2 months',
      difficulty: 'Beginner'
    },
    'Data Analysis': {
      resources: ['Kaggle Learn', 'Coursera Data Analysis Course', 'Excel for Data Analysis'],
      duration: '3-4 months',
      difficulty: 'Intermediate'
    },
    'Digital Marketing': {
      resources: ['Google Digital Marketing Course', 'HubSpot Academy', 'SEMrush Academy'],
      duration: '2-3 months',
      difficulty: 'Beginner'
    }
  };

  return missingSkills.map(skill => ({
    skill,
    ...skillPaths[skill as keyof typeof skillPaths] || {
      resources: ['Online tutorials', 'Practice projects', 'Industry blogs'],
      duration: '2-3 months',
      difficulty: 'Intermediate'
    }
  }));
};