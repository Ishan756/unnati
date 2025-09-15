// Gemini AI API integration service
// Note: In production, this would integrate with the actual Gemini API

interface GeminiResponse {
  trustScore: number;
  reasoning: string;
  flags: string[];
}

interface SkillRecommendation {
  skill: string;
  importance: number;
  relatedOpportunities: number;
}

// Mock Gemini API for internship content verification
export const verifyWithGemini = async (content: string): Promise<GeminiResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Mock analysis logic
  const flags: string[] = [];
  let trustScore = 85; // Base trust score
  
  // Content quality indicators
  const qualityIndicators = {
    hasDetailedDescription: content.length > 150,
    mentionsSkills: /skills|experience|learn|training/i.test(content),
    mentionsCompany: /company|organization|team/i.test(content),
    hasClearBenefits: /certificate|stipend|mentorship|growth/i.test(content),
    professionalTone: !/easy money|guaranteed|no work|minimal effort/i.test(content)
  };
  
  // Suspicious content indicators
  const suspiciousIndicators = {
    tooGoodToBeTrueOffers: /high salary|guaranteed job|immediate hiring|no interview/i.test(content),
    vagueDescription: content.split(' ').length < 20,
    unprofessionalLanguage: /txt me|whatsapp only|urgent urgent/i.test(content),
    personalInformation: /send resume to personal|personal email|personal number/i.test(content)
  };
  
  // Calculate trust score
  Object.entries(qualityIndicators).forEach(([key, value]) => {
    if (value) {
      trustScore += 3;
    } else {
      trustScore -= 2;
      flags.push(`Missing ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
    }
  });
  
  Object.entries(suspiciousIndicators).forEach(([key, value]) => {
    if (value) {
      trustScore -= 15;
      flags.push(`Detected ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
    }
  });
  
  // Ensure score is within bounds
  trustScore = Math.min(Math.max(trustScore, 20), 98);
  
  let reasoning = '';
  if (trustScore >= 90) {
    reasoning = 'High-quality internship posting with comprehensive details and professional presentation.';
  } else if (trustScore >= 75) {
    reasoning = 'Good internship posting with adequate information and professional approach.';
  } else if (trustScore >= 60) {
    reasoning = 'Acceptable internship posting but may lack some important details or clarity.';
  } else {
    reasoning = 'Internship posting has several concerning indicators and should be approached with caution.';
  }
  
  return {
    trustScore,
    reasoning,
    flags
  };
};

// Generate skill recommendations based on user profile and market trends
export const getSkillRecommendations = async (
  currentSkills: string[],
  interests: string[],
  location: string
): Promise<SkillRecommendation[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock skill recommendations based on current market trends
  const marketTrends = {
    'Digital Marketing': { importance: 95, opportunities: 245 },
    'Data Analysis': { importance: 92, opportunities: 189 },
    'Programming': { importance: 88, opportunities: 156 },
    'UI/UX Design': { importance: 85, opportunities: 134 },
    'Content Writing': { importance: 80, opportunities: 198 },
    'Social Media Marketing': { importance: 78, opportunities: 267 },
    'Project Management': { importance: 75, opportunities: 123 },
    'Customer Service': { importance: 73, opportunities: 289 },
    'Sales': { importance: 70, opportunities: 234 },
    'Research': { importance: 68, opportunities: 98 }
  };
  
  // Filter recommendations based on user's current skills and interests
  const recommendations = Object.entries(marketTrends)
    .filter(([skill]) => {
      // Don't recommend skills user already has
      const hasSkill = currentSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      );
      return !hasSkill;
    })
    .map(([skill, data]) => ({
      skill,
      importance: data.importance,
      relatedOpportunities: data.opportunities
    }))
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 6);
  
  return recommendations;
};

// Analyze career path progression
export const analyzeCareerPath = async (
  userProfile: {
    skills: string[];
    education: string;
    preferences: string[];
  }
): Promise<{
  suggestedPath: string[];
  timelineMonths: number;
  successProbability: number;
}> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Mock career path analysis
  const careerPaths = {
    'Technology': {
      path: ['Learn Programming Basics', 'Build Projects', 'Contribute to Open Source', 'Apply for Tech Internships', 'Specialize in Framework', 'Senior Developer Role'],
      timeline: 18,
      baseProbability: 75
    },
    'Marketing': {
      path: ['Digital Marketing Fundamentals', 'Social Media Certification', 'Content Creation', 'Analytics Training', 'Campaign Management', 'Marketing Manager'],
      timeline: 12,
      baseProbability: 80
    },
    'Design': {
      path: ['Design Principles', 'Tool Proficiency', 'Portfolio Building', 'Client Projects', 'Specialized Skills', 'Senior Designer'],
      timeline: 15,
      baseProbability: 70
    },
    'Business': {
      path: ['Business Fundamentals', 'Industry Knowledge', 'Networking', 'Leadership Skills', 'Strategic Thinking', 'Management Role'],
      timeline: 24,
      baseProbability: 65
    }
  };
  
  // Determine most relevant path based on user preferences
  const primaryInterest = userProfile.preferences[0] || 'Business';
  const pathKey = Object.keys(careerPaths).find(key => 
    primaryInterest.toLowerCase().includes(key.toLowerCase())
  ) || 'Business';
  
  const selectedPath = careerPaths[pathKey as keyof typeof careerPaths];
  
  // Adjust success probability based on user's current skills and education
  let adjustedProbability = selectedPath.baseProbability;
  
  if (userProfile.skills.length > 5) adjustedProbability += 10;
  if (userProfile.education.includes('Degree')) adjustedProbability += 8;
  if (userProfile.skills.length > 8) adjustedProbability += 5;
  
  adjustedProbability = Math.min(adjustedProbability, 95);
  
  return {
    suggestedPath: selectedPath.path,
    timelineMonths: selectedPath.timeline,
    successProbability: adjustedProbability
  };
};