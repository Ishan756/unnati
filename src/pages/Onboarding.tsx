import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, User, Award } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useLocation } from '../contexts/LocationContext';
import Transcriber from '../components/Transcriber';

const Onboarding: React.FC = () => {
  const educationOptions = [
    'High School (10th)',
    '12th Grade',
    'Diploma',
    "Bachelor's Degree",
    "Master's Degree",
    'Other',
  ];

  const skillOptions = [
    'Frontend Development', 'Backend Development', 'Full Stack Development', 'Mobile App Development',
    'Artificial Intelligence (AI)', 'Machine Learning (ML)', 'Data Science', 'Data Analytics',
    'DevOps & Cloud Computing', 'Cybersecurity', 'Blockchain Development', 'UI/UX Design',
    'Database Management', 'Game Development', 'Embedded Systems / IoT Development', 'Big Data Engineering',
    'Software Testing & QA', 'API Development & Integration', 'Project Management', 'Agile Methodologies',
    'Version Control (Git)', 'Technical Writing', 'Cloud Architecture', 'Network Administration',
    'System Design', 'Web Security', 'Mobile UI Design', 'Cross-platform Development',
    'Natural Language Processing', 'Computer Vision', 'Robotics', 'Edge Computing', 'Quantum Computing',
    'Augmented Reality (AR)', 'Virtual Reality (VR)', 'Data Visualization', 'Scripting (Python, Bash, etc.)',
    'API Documentation', 'Performance Optimization', 'Testing Automation', 'Continuous Integration/Continuous Deployment (CI/CD)'
  ];

  const preferenceOptions = [
    'Technology', 'Healthcare', 'Education', 'Finance', 'Marketing', 'Design', 'Engineering',
    'Social Work', 'Business', 'Media', 'Government', 'Non-Profit',
  ];

  const toggleArrayItem = (array: string[], item: string, setter: (value: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };
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
  const [showModal, setShowModal] = useState(false);

  // ✅ Speech recognition hook
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const totalSteps = 4;

  // if browser doesn’t support
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    setShowModal(true);
    setTimeout(() => {
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
    }, 2000);
  };

  // const toggleArrayItem = (array: string[], item: string, setter: (value: string[]) => void) => {
  //   if (array.includes(item)) {
  //     setter(array.filter(i => i !== item));
  //   } else {
  //     setter([...array, item]);
  //   }
  // };

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

  // ✅ Render Step 1 with Speech Recognition integrated
  const renderStep = () => {
    const variants = {
      initial: { opacity: 0, scale: 0.95, y: 30 },
      animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
      exit: { opacity: 0, scale: 0.95, y: -30, transition: { duration: 0.3 } },
    };
    switch (step) {
      case 1:
        return (
          <AnimatePresence mode="wait">
            <motion.div key="step1" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-6">
              <div className="text-center mb-8">
                <User className="h-12 w-12 text-teal-400 mx-auto mb-4 animate-bounce" />
                <h2 className="text-2xl font-bold text-white mb-2">Welcome! Let's get to know you</h2>
                <p className="text-gray-200">What should we call you?</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Your Name</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name or use voice"
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-gray-900 text-white"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (listening) {
                        SpeechRecognition.stopListening();
                      } else {
                        resetTranscript();
                        SpeechRecognition.startListening({ language: 'en-IN', continuous: true });
                      }
                    }}
                    className={`px-3 py-2 rounded-lg font-semibold transition ${listening ? 'bg-teal-400 text-gray-900' : 'bg-gray-700 text-teal-400'} flex items-center`}
                  >
                    {listening ? 'Stop' : '🎤 Speak'}
                  </button>
                </div>
                {transcript && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-teal-400">{transcript}</span>
                    <button
                      type="button"
                      className="ml-2 px-2 py-1 bg-teal-400 text-gray-900 rounded"
                      onClick={() => {
                        setFormData({ ...formData, name: transcript });
                        resetTranscript();
                      }}
                    >
                      Use
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        );
      case 2:
        return (
          <AnimatePresence mode="wait">
            <motion.div key="step2" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Educational Background</h2>
                <p className="text-gray-200">What's your current education level?</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {educationOptions.map((option) => (
                  <motion.button
                    key={option}
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setFormData({ ...formData, education: option })}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left text-white ${
                      formData.education === option
                        ? 'border-teal-400 bg-gray-900 text-teal-400'
                        : 'border-gray-600 hover:border-teal-400 hover:bg-gray-900'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        );
      case 3:
        return (
          <AnimatePresence mode="wait">
            <motion.div key="step3" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Your Skills</h2>
                <p className="text-gray-200">Select the skills you have (choose multiple)</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {skillOptions.map((skill) => (
                  <motion.button
                    key={skill}
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => toggleArrayItem(formData.skills, skill, (skills) => setFormData({ ...formData, skills }))}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm text-white ${
                      formData.skills.includes(skill)
                        ? 'border-teal-400 bg-gray-900 text-teal-400'
                        : 'border-gray-600 hover:border-teal-400 hover:bg-gray-900'
                    }`}
                  >
                    {skill}
                  </motion.button>
                ))}
              </div>
              <div className="text-center text-sm text-gray-200">
                Selected: {formData.skills.length} skills
              </div>
            </motion.div>
          </AnimatePresence>
        );
      case 4:
        return (
          <AnimatePresence mode="wait">
            <motion.div key="step4" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Career Interests</h2>
                <p className="text-gray-200">Which industries interest you most?</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {preferenceOptions.map((preference) => (
                  <motion.button
                    key={preference}
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => toggleArrayItem(formData.preferences, preference, (preferences) => setFormData({ ...formData, preferences }))}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm text-white ${
                      formData.preferences.includes(preference)
                        ? 'border-teal-400 bg-gray-900 text-teal-400'
                        : 'border-gray-600 hover:border-teal-400 hover:bg-gray-900'
                    }`}
                  >
                    {preference}
                  </motion.button>
                ))}
              </div>
              <div className="text-center text-sm text-gray-200">
                Selected: {formData.preferences.length} interests
              </div>
            </motion.div>
          </AnimatePresence>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 to-gray-800 text-gray-100 flex flex-col items-center px-6 pb-10">
      <div className="max-w-3xl w-full mx-auto bg-gray-800 rounded-3xl shadow-lg p-8 mt-10">
        {/* Step Indicator */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center justify-between mb-8">
          <div className="text-lg font-medium text-white">
            Step {step} of {totalSteps}
          </div>
          <div className="text-lg font-medium text-teal-400">
            {Math.round((step / totalSteps) * 100)}%
          </div>
        </motion.div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex justify-between items-center">
          {step > 1 ? (
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleBack}
              className="flex items-center px-5 py-2 text-white hover:text-teal-400 transition"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </motion.button>
          ) : <div />}

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`px-6 py-3 font-semibold rounded-xl transition ${
              isStepValid()
                ? 'bg-teal-400 text-gray-900 hover:bg-teal-500'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {step === totalSteps ? (
              <>Complete <Award className="inline-block w-5 h-5 ml-2 animate-pulse" /></>
            ) : (
              <>Next <ChevronRight className="inline-block w-5 h-5 ml-2 animate-pulse" /></>
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900 rounded-2xl shadow-2xl p-8 text-center max-w-sm mx-auto"
            >
              <Award className="h-16 w-16 text-teal-400 mx-auto mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold text-white mb-2">Onboarding Complete!</h2>
              <p className="text-gray-200 mb-4">Welcome to UNNATI. Redirecting to your dashboard...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
