import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, MapPin, Users, Zap, Mic, MicOff } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import Navbar from '../components/navbar';
import Work from '../components/work';
import Choose from '../components/chose';
import Companies from '../components/Topcompanies';

const Welcome: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('en');
  const { location } = useLocation();

  const languages = [
    { code: 'en', name: 'English', greeting: 'Welcome to UNNATI!' },
    { code: 'hi', name: 'हिन्दी', greeting: 'UNNATI Me Aapka Swagat haai' },
    { code: 'ta', name: 'தமிழ்', greeting: 'UNNATI க்கு வரவேற்கிறோம்!' },
    { code: 'te', name: 'తెలుగు', greeting: 'UNNATI కి స్వాగతం!' },
  ];

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  const speakWelcomeWithEndHandler = React.useCallback(() => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentLang.greeting);
      utterance.lang = language === 'en' ? 'en-IN' : `${language}-IN`;
      utterance.onend = () => setIsListening(false);
      speechSynthesis.speak(utterance);
    }
  }, [currentLang.greeting, language]);

  const toggleVoice = () => {
    if (isListening) {
      speechSynthesis.cancel();
      setIsListening(false);
    } else {
      setIsListening(true);
      speechSynthesis.cancel();
      speakWelcomeWithEndHandler();
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => speakWelcomeWithEndHandler(), 1500);
    return () => clearTimeout(timer);
  }, [language, speakWelcomeWithEndHandler]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-tr from-gray-900 to-gray-800 text-gray-100 flex flex-col items-center px-6 pb-10">
        {/* Top Controls */}
        <div className=''><Navbar /></div>

        <div className="w-full my-6 flex justify-between max-w-7xl items-center py-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-700 text-gray-100 rounded-md px-3 py-1 shadow-md focus:outline-none"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>

          <button
            onClick={toggleVoice}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${isListening ? 'bg-teal-400 text-gray-900' : 'bg-gray-700 text-teal-400'}`}
            aria-label={isListening ? 'Mute' : 'Speak'}
          >
            {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </button>
        </div>

        {/* Branding */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-gray-700 rounded-full p-4">
            <Award className="h-12 w-12 text-teal-400" />
          </div>
          <h1 className="text-5xl font-bold text-teal-400">UNNATI</h1>
          <p className="text-lg text-gray-300">{currentLang.greeting}</p>
        </div>

        {/* Description */}
        <p className="max-w-xl text-center mt-6 text-gray-300">
          {language === 'en' && 'Discover local internship opportunities and build your career path with AI-powered guidance.'}
          {language === 'hi' && 'AI-संचालित मार्गदर्शन के साथ स्थानीय इंटर्नशिप अवसरों को खोजें और अपना करियर पथ बनाएं।'}
          {language === 'ta' && 'AI-சக்தி வழிகாட்டுதலுடன் உள்ளூர் பயிற்சி வாய்ப்புகளைக் கண்டறிந்து உங்கள் தொழில் பாதையை உருவாக்குங்கள்.'}
          {language === 'te' && 'AI-శక్తితో మార్గదర్శకత్వంతో స్థానిక ఇంటర్న్‌షిప్ అవకాశాలను కనుగొనండి మరియు మీ కెరీర్ మార్గాన్ని నిర్మించండి.'}
        </p>

        {/* Features */}
        <div className="grid sm:grid-cols-3 gap-8 mt-10 max-w-7xl">
          {[
            { icon: <MapPin className="h-8 w-8 text-teal-400 " />, title: 'Local Focus', desc: 'Find opportunities near you' },
            { icon: <Zap className="h-8 w-8 text-teal-400" />, title: 'AI Powered', desc: 'Smart matching & verification' },
            { icon: <Users className="h-8 w-8 text-teal-400" />, title: 'Inclusive', desc: 'Designed for everyone' },
          ].map((feature, idx) => (
            <div key={idx} className="bg-gray-700 rounded-lg p-6 text-center hover:scale-105 transition-transform shadow-lg">
              {feature.icon}
              <h3 className="text-xl font-semibold text-teal-400 mt-2">{feature.title}</h3>
              <p className="text-gray-300 mt-1">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Location Status */}
        {location.district && (
          <div className="mt-8 flex items-center space-x-2 bg-gray-700 rounded-lg px-4 py-2 shadow-md">
            <MapPin className="h-5 w-5 text-teal-400" />
            <span className="text-gray-300 text-sm">
              {language === 'en' && `Detected location: ${location.district}`}
              {language === 'hi' && `स्थान का पता चला: ${location.district}`}
              {language === 'ta' && `இடம் கண்டறியப்பட்டது: ${location.district}`}
              {language === 'te' && `స్థానం కనుగొనబడింది: ${location.district}`}
            </span>
          </div>
        )}

        {/* CTA Button */}
        <div className="flex justify-center mt-10 mb-4 w-full">
          <Link
            to="/onboarding"
            className="px-8 py-4 bg-teal-400 text-gray-900 rounded-xl text-lg font-semibold shadow-lg hover:bg-teal-500 transition-colors"
            style={{ zIndex: 10 }}
          >
            {language === 'en' && 'Get Started'}
            {language === 'hi' && 'शुरू करें'}
            {language === 'ta' && 'தொடங்குங்கள்'}
            {language === 'te' && 'ప్రారంభించండి'}
          </Link>
        </div>
      </div>

      {/* Add extra spacing to ensure no overlap with below sections */}
      <div className="mt-8" />
      <div>
        <Work />
      </div>
      <div className="mt-8">
        <Choose />
      </div>
      <div className="mt-8">
        <Companies />
      </div>
    </>
  );
};

export default Welcome;