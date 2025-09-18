import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, MapPin, Users, Zap, Mic, MicOff } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import Navbar from '../components/navbar';
import Work from '../components/work';

const Welcome: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('en');
  const { location } = useLocation();

  const languages = [
    {
      code: 'en', name: 'English', greeting: 'Welcome to UNNATI!',
      desc: 'Discover local internship opportunities and build your career path with AI-powered guidance.',
      locationText: (district: string) => `Detected location: ${district}`,
      cta: 'Get Started',
      features: [
        { title: 'Local Focus', desc: 'Find opportunities near you' },
        { title: 'AI Powered', desc: 'Smart matching & verification' },
        { title: 'Inclusive', desc: 'Designed for everyone' },
      ]
    },
    {
      code: 'hi', name: 'हिन्दी', greeting: 'UNNATI में आपका स्वागत है',
      desc: 'AI-संचालित मार्गदर्शन के साथ स्थानीय इंटर्नशिप अवसरों को खोजें और अपना करियर पथ बनाएं।',
      locationText: (district: string) => `स्थान का पता चला: ${district}`,
      cta: 'शुरू करें',
      features: [
        { title: 'स्थानीय फोकस', desc: 'अपने पास के अवसर खोजें' },
        { title: 'एआई संचालित', desc: 'स्मार्ट मिलान और सत्यापन' },
        { title: 'समावेशी', desc: 'हर किसी के लिए डिज़ाइन किया गया' },
      ]
    },
    {
      code: 'bn', name: 'বাংলা', greeting: 'UNNATI-তে আপনাকে স্বাগতম!',
      desc: 'AI-চালিত নির্দেশনার মাধ্যমে স্থানীয় ইন্টার্নশিপ সুযোগগুলি আবিষ্কার করুন এবং আপনার ক্যারিয়ার তৈরি করুন।',
      locationText: (district: string) => `সনাক্ত অবস্থান: ${district}`,
      cta: 'শুরু করুন',
      features: [
        { title: 'স্থানীয় ফোকাস', desc: 'আপনার কাছে সুযোগ খুঁজুন' },
        { title: 'এআই চালিত', desc: 'স্মার্ট ম্যাচিং এবং যাচাইকরণ' },
        { title: 'সমন্বিত', desc: 'সবাইয়ের জন্য ডিজাইন করা হয়েছে' },
      ]
    },
    {
      code: 'mr', name: 'मराठी', greeting: 'UNNATI मध्ये आपले स्वागत आहे!',
      desc: 'AI-संचालित मार्गदर्शनासह स्थानिक इंटर्नशिप संधी शोधा आणि आपला करिअर मार्ग तयार करा.',
      locationText: (district: string) => `शोधलेले स्थान: ${district}`,
      cta: 'सुरू करा',
      features: [
        { title: 'स्थानिक फोकस', desc: 'आपल्या जवळील संधी शोधा' },
        { title: 'एआय संचालित', desc: 'स्मार्ट जुळणी आणि पडताळणी' },
        { title: 'समावेशक', desc: 'सर्वांसाठी डिझाइन केलेले' },
      ]
    },
    {
      code: 'te', name: 'తెలుగు', greeting: 'UNNATI కి స్వాగతం!',
      desc: 'AI-శక్తితో మార్గదర్శకత్వంతో స్థానిక ఇంటర్న్‌షిప్ అవకాశాలను కనుగొనండి మరియు మీ కెరీర్ మార్గాన్ని నిర్మించండి.',
      locationText: (district: string) => `గుర్తించిన స్థానం: ${district}`,
      cta: 'ప్రారంభించండి',
      features: [
        { title: 'స్థానిక దృష్టి', desc: 'మీ దగ్గర అవకాశాలను కనుగొనండి' },
        { title: 'AI ఆధారితం', desc: 'స్మార్ట్ మ్యాచింగ్ & ధృవీకరణ' },
        { title: 'సమావేశం', desc: 'ప్రతి ఒక్కరికీ రూపొందించబడింది' },
      ]
    },
    {
      code: 'ta', name: 'தமிழ்', greeting: 'UNNATI க்கு வரவேற்கிறோம்!',
      desc: 'AI-சக்தி வழிகாட்டுதலுடன் உள்ளூர் பயிற்சி வாய்ப்புகளைக் கண்டறிந்து உங்கள் தொழில் பாதையை உருவாக்குங்கள்.',
      locationText: (district: string) => `இடம் கண்டறியப்பட்டது: ${district}`,
      cta: 'தொடங்குங்கள்',
      features: [
        { title: 'உள்ளூர் கவனம்', desc: 'உங்களுக்குள் வாய்ப்புகளை கண்டறியுங்கள்' },
        { title: 'AI இயக்கப்பட்டது', desc: 'ச마트 பொருத்தம் மற்றும் சரிபார்ப்பு' },
        { title: 'ஒன்றிணைவு', desc: 'எல்லோருக்கும் வடிவமைக்கப்பட்டது' },
      ]
    },
    {
      code: 'gu', name: 'ગુજરાતી', greeting: 'UNNATI માં આપનું સ્વાગત છે!',
      desc: 'AI આધારિત માર્ગદર્શન સાથે સ્થાનિક ઇન્ટર્નશિપ તકો શોધો અને તમારા કરિયરનો માર્ગ બનાવો.',
      locationText: (district: string) => `ઓળખાયેલ સ્થાન: ${district}`,
      cta: 'શરૂ કરો',
      features: [
        { title: 'સ્થાનિક ફોકસ', desc: 'તમારા નજીકના અવસરો શોધો' },
        { title: 'એઆઈ પાવર્ડ', desc: 'સ્માર્ટ મેચિંગ અને ચકાસણી' },
        { title: 'સમાવિષ્ટ', desc: 'દરેક માટે ડિઝાઇન કરેલું' },
      ]
    },
    {
      code: 'ur', name: 'اردو', greeting: 'UNNATI میں خوش آمدید!',
      desc: 'AI کی رہنمائی کے ساتھ مقامی انٹرن شپ کے مواقع دریافت کریں اور اپنے کیریئر کا راستہ بنائیں۔',
      locationText: (district: string) => `مقام کا پتہ چلا: ${district}`,
      cta: 'شروع کریں',
      features: [
        { title: 'مقامی فوکس', desc: 'اپنے قریب مواقع تلاش کریں' },
        { title: 'اے آئی پاورڈ', desc: 'سمارٹ میچنگ اور تصدیق' },
        { title: 'شامل', desc: 'ہر ایک کے لیے ڈیزائن کیا گیا' },
      ]
    },
    {
      code: 'kn', name: 'ಕನ್ನಡ', greeting: 'UNNATI ಗೆ ಸ್ವಾಗತ!',
      desc: 'AI ಮಾರ್ಗದರ್ಶನದೊಂದಿಗೆ ಸ್ಥಳೀಯ ಇಂಟರ್ನ್‌ಶಿಪ್ ಅವಕಾಶಗಳನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ ಮತ್ತು ನಿಮ್ಮ ವೃತ್ತಿ ಮಾರ್ಗವನ್ನು ನಿರ್ಮಿಸಿ.',
      locationText: (district: string) => `ಹೆಚ್ಚುಪಟ್ಟ ಸ್ಥಳ: ${district}`,
      cta: 'ಪ್ರಾರಂಭಿಸಿ',
      features: [
        { title: 'ಸ್ಥಳೀಯ ಫೋಕಸ್', desc: 'ನಿಮ್ಮ ಹತ್ತಿರದ ಅವಕಾಶಗಳನ್ನು ಹುಡುಕಿ' },
        { title: 'ಎಐ ಪವರ್ಡ್', desc: 'ಸ್ಮಾರ್ಟ್ ಮ್ಯಾಚಿಂಗ್ ಮತ್ತು ಪರಿಶೀಲನೆ' },
        { title: 'ಒಗ್ಗೂಡಿಸಿದ', desc: 'ಪ್ರತಿಯೊಬ್ಬರಿಗೂ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ' },
      ]
    },
    {
      code: 'or', name: 'ଓଡ଼ିଆ', greeting: 'UNNATI ରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ!',
      desc: 'AI-ଚାଳିତ ନିର୍ଦ୍ଦେଶନା ସହିତ ସ୍ଥାନୀୟ ଇଣ୍ଟର୍ନଶିପ୍ ସୁଯୋଗଗୁଡ଼ିକୁ ଖୋଜନ୍ତୁ ଏବଂ ଆପଣଙ୍କର କ୍ୟାରିଅର ପଥ ତିଆରି କରନ୍ତୁ।',
      locationText: (district: string) => `ଚିହ୍ନଟ ଅବସ୍ଥାନ: ${district}`,
      cta: 'ଆରମ୍ଭ କରନ୍ତୁ',
      features: [
        { title: 'ସ୍ଥାନୀୟ ଫୋକସ୍', desc: 'ଆପଣଙ୍କ ନିକଟରେ ସୁଯୋଗ ଖୋଜନ୍ତୁ' },
        { title: 'ଏଆଇ ପାୱାର୍ଡ', desc: 'ସ୍ମାର୍ଟ ମ୍ୟାଚିଂ ଏବଂ ଯାଞ୍ଚ' },
        { title: 'ସମାବେଶୀ', desc: 'ସମସ୍ତଙ୍କ ପାଇଁ ଡିଜାଇନ୍ କରାଯାଇଛି' },
      ]
    },
    {
      code: 'ml', name: 'മലയാളം', greeting: 'UNNATI-ലേക്ക് സ്വാഗതം!',
      desc: 'AI-യുടെ സഹായത്തോടെ പ്രാദേശിക ഇന്റേൺഷിപ്പ് അവസരങ്ങൾ കണ്ടെത്തുക, നിങ്ങളുടെ കരിയർ പാത നിർമിക്കുക.',
      locationText: (district: string) => `കണ്ടെത്തിയ സ്ഥലം: ${district}`,
      cta: 'ആരംഭിക്കുക',
      features: [
        { title: 'പ്രാദേശിക ശ്രദ്ധ', desc: 'നിങ്ങളുടെ അടുത്തുള്ള അവസരങ്ങൾ കണ്ടെത്തുക' },
        { title: 'എഐ പവേർഡ്', desc: 'സ്മാർട്ട് മാച്ചിംഗ് & പരിശോധന' },
        { title: 'ഉൾക്കൊള്ളുന്ന', desc: 'എല്ലാവർക്കും രൂപകൽപ്പന ചെയ്തിരിക്കുന്നു' },
      ]
    },
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
  };

  useEffect(() => {
    const timer = setTimeout(() => speakWelcomeWithEndHandler(), 1500);
    return () => clearTimeout(timer);
  }, [language, speakWelcomeWithEndHandler]);

  return (
    <>
      <div className="min-h-screen relative bg-gradient-to-tr from-gray-900 to-gray-800 text-gray-100 flex flex-col items-center px-6 pb-10 overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-30">
          <source src="../assets/videowebsite.mp4" type="video/mp4" />
        </video>
        <div className='relative z-10'><Navbar /></div>

        {/* Language Selector + Voice */}
        <motion.div className="w-full my-6 flex justify-between max-w-7xl items-center py-4 relative z-10"
          initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <motion.select value={language} onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-700 text-gray-100 rounded-md px-3 py-1 shadow-md focus:outline-none"
            whileFocus={{ scale: 1.05 }} whileHover={{ scale: 1.05 }}>
            {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
          </motion.select>

          <motion.button onClick={toggleVoice}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${isListening ? 'bg-teal-400 text-gray-900' : 'bg-gray-700 text-teal-400'}`}
            aria-label={isListening ? 'Mute' : 'Speak'} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.1 }}>
            {isListening ? <MicOff className="h-6 w-6 animate-pulse" /> : <Mic className="h-6 w-6 animate-pulse" />}
          </motion.button>
        </motion.div>

        {/* Branding */}
        <motion.div className="flex flex-col items-center text-center space-y-4 relative z-10"
          initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <motion.div className="bg-gray-700 rounded-full p-4" whileHover={{ scale: 1.1 }}>
            <Award className="h-12 w-12 text-teal-400 animate-bounce" />
          </motion.div>
          <motion.h1 className="text-5xl font-bold text-teal-400">UNNATI</motion.h1>
          <motion.p className="text-lg text-gray-300">{currentLang.greeting}</motion.p>
        </motion.div>

        {/* Description */}
        <motion.p className="max-w-xl text-center mt-6 text-gray-300 relative z-10"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
          {currentLang.desc}
        </motion.p>

        {/* Features */}
        <motion.div className="grid sm:grid-cols-3 gap-8 mt-10 max-w-7xl relative z-10"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
          {[<MapPin />, <Zap />, <Users />].map((Icon, idx) => (
            <motion.div key={idx} className="bg-gray-700 rounded-lg p-6 text-center shadow-lg"
              whileHover={{ scale: 1.08, boxShadow: '0 0 30px #14b8a6' }}>
              <Icon.type className="h-8 w-8 text-teal-400" />
              <h3 className="text-xl font-semibold text-teal-400 mt-2">{currentLang.features[idx].title}</h3>
              <p className="text-gray-300 mt-1">{currentLang.features[idx].desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Location */}
        {location.district && (
          <motion.div className="mt-8 flex items-center space-x-2 bg-gray-700 rounded-lg px-4 py-2 shadow-md relative z-10"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
            <MapPin className="h-5 w-5 text-teal-400 animate-bounce" />
            <span className="text-gray-300 text-sm">{currentLang.locationText(location.district)}</span>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div className="flex justify-center mt-10 mb-4 w-full relative z-10"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}>
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.97 }}>
            <Link to="/onboarding"
              className="px-8 py-4 bg-teal-400 text-gray-900 rounded-xl text-lg font-semibold shadow-lg hover:bg-teal-500 transition-colors">
              {currentLang.cta}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Work Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
        <Work language={language} />
      </motion.div>
    </>
  );
};

export default Welcome;
