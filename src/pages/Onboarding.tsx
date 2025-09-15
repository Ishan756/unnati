import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, User, GraduationCap, Briefcase, Target, Award } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useLocation } from '../contexts/LocationContext';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useUser();
  const { location } = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    education: '',
    skills: [] as string[],
    preferences: [] as string[],
  });

  const totalSteps = 4;

  const educationOptions = [
    'High School (10th)',
    '12th Grade',
    'Diploma',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Other',
  ];

  const skillOptions = [
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'Mobile App Development',
    'Artificial Intelligence (AI)',
    'Machine Learning (ML)',
    'Data Science',
    'Data Analytics',
    'DevOps & Cloud Computing',
    'Cybersecurity',
    'Blockchain Development',
    'UI/UX Design',
    'Database Management',
    'Game Development',
    'Embedded Systems / IoT Development',
    'Big Data Engineering',
    'Software Testing & QA',
    'API Development & Integration',
    'Project Management',
    'Agile Methodologies',
    'Version Control (Git)',
    'Technical Writing',
    'Cloud Architecture',
    'Network Administration',
    'System Design',
    'Web Security',
    'Mobile UI Design',
    'Cross-platform Development',
    'Natural Language Processing',
    'Computer Vision',
    'Robotics',
    'Edge Computing',
    'Quantum Computing',
    'Augmented Reality (AR)',
    'Virtual Reality (VR)',
    'Data Visualization',
    'Scripting (Python, Bash, etc.)',
    'API Documentation',
    'Performance Optimization',
    'Testing Automation',
    'Continuous Integration/Continuous Deployment (CI/CD)'
  ];

  const preferenceOptions = [
    'Technology',
    'Healthcare',
    'Education',
    'Finance',
    'Marketing',
    'Design',
    'Engineering',
    'Social Work',
    'Business',
    'Media',
    'Government',
    'Non-Profit',
  ];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    const userData = {
      ...formData,
      location: {
        lat: location.lat,
        lng: location.lng,
        district: location.district || 'Unknown',
      },
      badges: ['Welcome Badge'],
      onboardingComplete: true,
    };

    dispatch({ type: 'SET_USER', payload: userData });
    navigate('/dashboard');
  };

  const toggleArrayItem = (array: string[], item: string, setter: (value: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name.trim().length > 0;
      case 2:
        return formData.education.length > 0;
      case 3:
        return formData.skills.length > 0;
      case 4:
        return formData.preferences.length > 0;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome! Let's get to know you</h2>
              <p className="text-gray-600">What should we call you?</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <GraduationCap className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Educational Background</h2>
              <p className="text-gray-600">What's your current education level?</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {educationOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({ ...formData, education: option })}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    formData.education === option
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Briefcase className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Skills</h2>
              <p className="text-gray-600">Select the skills you have (choose multiple)</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {skillOptions.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleArrayItem(formData.skills, skill, (skills) => setFormData({ ...formData, skills }))}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm ${
                    formData.skills.includes(skill)
                      ? 'border-purple-500 bg-purple-50 text-purple-900'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
            
            <div className="text-center text-sm text-gray-600">
              Selected: {formData.skills.length} skills
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Target className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Career Interests</h2>
              <p className="text-gray-600">Which industries interest you most?</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {preferenceOptions.map((preference) => (
                <button
                  key={preference}
                  onClick={() => toggleArrayItem(formData.preferences, preference, (preferences) => setFormData({ ...formData, preferences }))}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm ${
                    formData.preferences.includes(preference)
                      ? 'border-orange-500 bg-orange-50 text-orange-900'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {preference}
                </button>
              ))}
            </div>
            
            <div className="text-center text-sm text-gray-600">
              Selected: {formData.preferences.length} interests
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (<div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-10">
  <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8">
    {/* Step Indicator */}
    <div className="flex items-center justify-between mb-8">
      <div className="text-lg font-medium text-gray-700">
        Step {step} of {totalSteps}
      </div>
      <div className="text-lg font-medium text-blue-600">
        {Math.round((step / totalSteps) * 100)}%
      </div>
    </div>

    {/* Step Content */}
    <div className="mb-8">
      {renderStep()}
    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-between items-center">
      {step > 1 ? (
        <button
          onClick={handleBack}
          className="flex items-center px-5 py-2 text-gray-600 hover:text-blue-600 transition"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back
        </button>
      ) : <div />}

      <button
        onClick={handleNext}
        disabled={!isStepValid()}
        className={`px-6 py-3 font-semibold rounded-xl transition ${
          isStepValid()
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {step === totalSteps ? (
          <>Complete <Award className="inline-block w-5 h-5 ml-2" /></>
        ) : (
          <>Next <ChevronRight className="inline-block w-5 h-5 ml-2" /></>
        )}
      </button>
    </div>
  </div>
</div>
);
};

export default Onboarding;