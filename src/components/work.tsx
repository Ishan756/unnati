import React from "react";
import { Mic, Gamepad2, MapPin, Languages, Trophy } from "lucide-react";

type SupportedLang = 'en' | 'hi' | 'bn' | 'mr' | 'te' | 'ta' | 'gu' | 'ur' | 'kn' | 'or' | 'ml';

const featuresByLang: Record<SupportedLang, Array<{ icon: JSX.Element; title: string; desc: string }>> = {
  en: [
    { icon: <Mic className="h-8 w-8 text-teal-400" />, title: "Voice-First Interaction", desc: "Simply speak in your regional language. Our AI assistant guides you through the entire process." },
    { icon: <Gamepad2 className="h-8 w-8 text-teal-400" />, title: "Gamified Onboarding", desc: "Build your profile through interactive games. Earn badges for adding skills and preferences." },
    { icon: <MapPin className="h-8 w-8 text-teal-400" />, title: "Hyper-Local Opportunities", desc: "Get internships prioritized by your home district. Local opportunities come first." },
    { icon: <Languages className="h-8 w-8 text-teal-400" />, title: "Auto-Translation", desc: "All content automatically translated to simple, clear regional languages." },
    { icon: <Trophy className="h-8 w-8 text-teal-400" />, title: "Aspirational Pathfinding", desc: "Get both direct matches and aspirational internships with clear skill-up paths." },
  ],
  hi: [
    { icon: <Mic className="h-8 w-8 text-teal-400" />, title: "वॉयस-फर्स्ट इंटरैक्शन", desc: "बस अपनी क्षेत्रीय भाषा में बोलें। हमारा एआई सहायक आपको पूरी प्रक्रिया में मार्गदर्शन करता है।" },
    { icon: <Gamepad2 className="h-8 w-8 text-teal-400" />, title: "गेमिफाइड ऑनबोर्डिंग", desc: "इंटरएक्टिव गेम्स के माध्यम से अपनी प्रोफ़ाइल बनाएं। कौशल और पसंद जोड़ने पर बैज कमाएँ।" },
    { icon: <MapPin className="h-8 w-8 text-teal-400" />, title: "हाइपर-लोकल अवसर", desc: "अपने गृह जिले के अनुसार इंटर्नशिप प्राप्त करें। स्थानीय अवसरों को प्राथमिकता दी जाती है।" },
    { icon: <Languages className="h-8 w-8 text-teal-400" />, title: "ऑटो-ट्रांसलेशन", desc: "सभी सामग्री स्वचालित रूप से सरल, स्पष्ट क्षेत्रीय भाषाओं में अनुवादित।" },
    { icon: <Trophy className="h-8 w-8 text-teal-400" />, title: "आकांक्षी पाथफाइंडिंग", desc: "प्रत्यक्ष और आकांक्षी इंटर्नशिप दोनों प्राप्त करें, स्पष्ट स्किल-अप पथ के साथ।" },
  ],
  ta: [
    { icon: <Mic className="h-8 w-8 text-teal-400" />, title: "வாய்ஸ்-ஃபர்ஸ்ட் தொடர்பு", desc: "உங்கள் பிராந்திய மொழியில் பேசுங்கள். எங்கள் AI உதவியாளர் முழு செயல்முறையில் வழிகாட்டும்." },
    { icon: <Gamepad2 className="h-8 w-8 text-teal-400" />, title: "விளையாட்டு-மயமாக்கப்பட்ட சேர்க்கை", desc: "இணைய விளையாட்டுகள் மூலம் உங்கள் சுயவிவரத்தை உருவாக்குங்கள். திறன்கள் மற்றும் விருப்பங்களை சேர்க்கும் போது பதக்கங்களைப் பெறுங்கள்." },
    { icon: <MapPin className="h-8 w-8 text-teal-400" />, title: "ஹைபர்-லோகல் வாய்ப்புகள்", desc: "உங்கள் சொந்த மாவட்டத்தின் அடிப்படையில் பயிற்சிகள் கிடைக்கும். உள்ளூர் வாய்ப்புகள் முதன்மை." },
    { icon: <Languages className="h-8 w-8 text-teal-400" />, title: "தானாக மொழிபெயர்ப்பு", desc: "அனைத்து உள்ளடக்கமும் தானாக எளிய, தெளிவான பிராந்திய மொழிகளில் மொழிபெயர்க்கப்படுகிறது." },
    { icon: <Trophy className="h-8 w-8 text-teal-400" />, title: "ஆஸ்பிரேஷனல் பாதை கண்டறிதல்", desc: "நேரடி மற்றும் ஆஸ்பிரேஷனல் பயிற்சிகள் இரண்டும் கிடைக்கும், தெளிவான திறன் மேம்பாட்டு பாதையுடன்." },
  ],
  te: [
    { icon: <Mic className="h-8 w-8 text-teal-400" />, title: "వాయిస్-ఫస్ట్ ఇంటరాక్షన్", desc: "మీ ప్రాంతీయ భాషలో మాట్లాడండి. మా AI అసిస్టెంట్ మొత్తం ప్రక్రియలో మార్గనిర్దేశం చేస్తుంది." },
    { icon: <Gamepad2 className="h-8 w-8 text-teal-400" />, title: "గేమిఫైడ్ ఆన్‌బోర్డింగ్", desc: "ఇంటరాక్టివ్ గేమ్స్ ద్వారా మీ ప్రొఫైల్‌ను నిర్మించండి. నైపుణ్యాలు మరియు అభిరుచులు జోడించడంలో బ్యాడ్జ్‌లు సంపాదించండి." },
    { icon: <MapPin className="h-8 w-8 text-teal-400" />, title: "హైపర్-లోకల్ అవకాశాలు", desc: "మీ హోం జిల్లా ప్రాధాన్యతతో ఇంటర్న్‌షిప్‌లు పొందండి. స్థానిక అవకాశాలకు ప్రాధాన్యత ఉంటుంది." },
    { icon: <Languages className="h-8 w-8 text-teal-400" />, title: "ఆటో-ట్రాన్స్‌లేషన్", desc: "అన్ని కంటెంట్ స్వయంచాలకంగా సరళమైన, స్పష్టమైన ప్రాంతీయ భాషలకు అనువదించబడుతుంది." },
    { icon: <Trophy className="h-8 w-8 text-teal-400" />, title: "ఆకాంక్షాత్మక మార్గదర్శనం", desc: "ప్రత్యక్ష మరియు ఆకాంక్షాత్మక ఇంటర్న్‌షిప్‌లు రెండింటిని పొందండి, స్పష్టమైన నైపుణ్య మార్గాలతో." },
  ],
  bn: [
    { icon: <Mic className="h-8 w-8 text-teal-400" />, title: "ভয়েস-ফার্স্ট ইন্টারঅ্যাকশন", desc: "আপনার আঞ্চলিক ভাষায় কথা বলুন। আমাদের AI সহকারী আপনাকে পুরো প্রক্রিয়ায় গাইড করবে।" },
    { icon: <Gamepad2 className="h-8 w-8 text-teal-400" />, title: "গেমিফাইড অনবোর্ডিং", desc: "ইন্টারেক্টিভ গেমের মাধ্যমে আপনার প্রোফাইল তৈরি করুন। দক্ষতা ও পছন্দ যোগ করলে ব্যাজ পান।" },
    { icon: <MapPin className="h-8 w-8 text-teal-400" />, title: "হাইপার-লোকাল সুযোগ", desc: "আপনার বাড়ির জেলার অগ্রাধিকার অনুযায়ী ইন্টার্নশিপ পান। স্থানীয় সুযোগ অগ্রাধিকার পায়।" },
    { icon: <Languages className="h-8 w-8 text-teal-400" />, title: "অটো-অনুবাদ", desc: "সব কন্টেন্ট স্বয়ংক্রিয়ভাবে সহজ, স্পষ্ট আঞ্চলিক ভাষায় অনুবাদ করা হয়।" },
    { icon: <Trophy className="h-8 w-8 text-teal-400" />, title: "আকাঙ্ক্ষিত পথনির্দেশ", desc: "সরাসরি এবং আকাঙ্ক্ষিত ইন্টার্নশিপ দুটোই পান, স্পষ্ট স্কিল-আপ পথ সহ।" },
  ],
  mr: [
    { icon: <Mic className="h-8 w-8 text-teal-400" />, title: "व्हॉइस-फर्स्ट संवाद", desc: "फक्त आपल्या प्रादेशिक भाषेत बोला. आमचा एआय सहाय्यक तुम्हाला संपूर्ण प्रक्रियेत मार्गदर्शन करतो." },
    { icon: <Gamepad2 className="h-8 w-8 text-teal-400" />, title: "गेमिफाइड ऑनबोर्डिंग", desc: "इंटरएक्टिव गेम्सद्वारे आपली प्रोफाइल तयार करा. कौशल्ये आणि पसंती जोडल्यावर बॅज मिळवा." },
    { icon: <MapPin className="h-8 w-8 text-teal-400" />, title: "हायपर-लोकल संधी", desc: "आपल्या गृह जिल्ह्याच्या प्राधान्यानुसार इंटर्नशिप मिळवा. स्थानिक संधींना प्राधान्य दिले जाते." },
    { icon: <Languages className="h-8 w-8 text-teal-400" />, title: "ऑटो-भाषांतर", desc: "सर्व सामग्री स्वयंचलितपणे सोप्या, स्पष्ट प्रादेशिक भाषेत भाषांतरित केली जाते." },
    { icon: <Trophy className="h-8 w-8 text-teal-400" />, title: "आकांक्षी पाथफाइंडिंग", desc: "थेट आणि आकांक्षी इंटर्नशिप दोन्ही मिळवा, स्पष्ट कौशल्य-वाढीच्या मार्गासह." },
  ],
  gu: [
    { icon: <Mic className="h-8 w-8 text-teal-400" />, title: "વોઇસ-ફર્સ્ટ ઇન્ટરએક્શન", desc: "ફક્ત તમારી પ્રાદેશિક ભાષામાં બોલો. અમારો AI સહાયક તમને સમગ્ર પ્રક્રિયામાં માર્ગદર્શન આપે છે." },
    { icon: <Gamepad2 className="h-8 w-8 text-teal-400" />, title: "ગેમિફાઇડ ઓનબોર્ડિંગ", desc: "ઇન્ટરએક્ટિવ ગેમ્સ દ્વારા તમારી પ્રોફાઇલ બનાવો. કુશળતા અને પસંદગીઓ ઉમેરવાથી બેજ મેળવો." },
    { icon: <MapPin className="h-8 w-8 text-teal-400" />, title: "હાઇપર-લોકલ તકો", desc: "તમારા ઘર જિલ્લાના આધારે ઇન્ટર્નશિપ મેળવો. સ્થાનિક તકોને પ્રાથમિકતા આપવામાં આવે છે." },
    { icon: <Languages className="h-8 w-8 text-teal-400" />, title: "ઓટો-ટ્રાન્સલેશન", desc: "બધી સામગ્રી આપમેળે સરળ, સ્પષ્ટ પ્રાદેશિક ભાષાઓમાં અનુવાદિત થાય છે." },
    { icon: <Trophy className="h-8 w-8 text-teal-400" />, title: "આકાંક્ષી પાથફાઇન્ડિંગ", desc: "પ્રત્યક્ષ અને આકાંક્ષી ઇન્ટર્નશિપ બંને મેળવો, સ્પષ્ટ સ્કિલ-અપ પાથ સાથે." },
  ],
  ur: [
    { icon: <Mic className="h-8 w-8 text-teal-400" />, title: "وائس-فرسٹ انٹرایکشن", desc: "بس اپنی علاقائی زبان میں بولیں۔ ہمارا AI اسسٹنٹ آپ کو پوری عمل میں رہنمائی کرتا ہے۔" },
    { icon: <Gamepad2 className="h-8 w-8 text-teal-400" />, title: "گیمیفائیڈ آن بورڈنگ", desc: "انٹرایکٹو گیمز کے ذریعے اپنی پروفائل بنائیں۔ مہارتیں اور ترجیحات شامل کرنے پر بیجز حاصل کریں۔" },
    { icon: <MapPin className="h-8 w-8 text-teal-400" />, title: "ہائپر-لوکل مواقع", desc: "اپنے گھر کے ضلع کی ترجیح کے مطابق انٹرن شپ حاصل کریں۔ مقامی مواقع کو ترجیح دی جاتی ہے۔" },
    { icon: <Languages className="h-8 w-8 text-teal-400" />, title: "آٹو-ترجمہ", desc: "تمام مواد خود بخود آسان، واضح علاقائی زبانوں میں ترجمہ کیا جاتا ہے۔" },
    { icon: <Trophy className="h-8 w-8 text-teal-400" />, title: "امید افزا پاتھ فائنڈنگ", desc: "براہ راست اور امید افزا انٹرن شپ دونوں حاصل کریں، واضح اسکل اپ پاتھ کے ساتھ۔" },
  ],
  kn: [
    { icon: <Mic className="h-8 w-8 text-teal-400" />, title: "ವಾಯ್ಸ್-ಫರ್ಸ್ಟ್ ಸಂವಹನ", desc: "ನಿಮ್ಮ ಪ್ರಾದೇಶಿಕ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ. ನಮ್ಮ AI ಸಹಾಯಕವು ನಿಮಗೆ ಸಂಪೂರ್ಣ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ." },
    { icon: <Gamepad2 className="h-8 w-8 text-teal-400" />, title: "ಗೇಮಿಫೈಡ್ ಆನ್‌ಬೋರ್ಡಿಂಗ್", desc: "ಇಂಟರಾಕ್ಟಿವ್ ಗೇಮ್ಸ್ ಮೂಲಕ ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ನಿರ್ಮಿಸಿ. ಕೌಶಲ್ಯಗಳು ಮತ್ತು ಆಯ್ಕೆಗಳು ಸೇರಿಸಿದಾಗ ಬ್ಯಾಜ್‌ಗಳನ್ನು ಪಡೆಯಿರಿ." },
    { icon: <MapPin className="h-8 w-8 text-teal-400" />, title: "ಹೈಪರ್-ಲೋಕಲ್ ಅವಕಾಶಗಳು", desc: "ನಿಮ್ಮ ಮನೆ ಜಿಲ್ಲೆಯ ಆದ್ಯತೆಯ ಪ್ರಕಾರ ಇಂಟರ್ನ್‌ಶಿಪ್‌ಗಳನ್ನು ಪಡೆಯಿರಿ. ಸ್ಥಳೀಯ ಅವಕಾಶಗಳಿಗೆ ಆದ್ಯತೆ ನೀಡಲಾಗುತ್ತದೆ." },
    { icon: <Languages className="h-8 w-8 text-teal-400" />, title: "ಆಟೋ-ಅನುವಾದ", desc: "ಎಲ್ಲಾ ವಿಷಯವನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸರಳ, ಸ್ಪಷ್ಟ ಪ್ರಾದೇಶಿಕ ಭಾಷೆಗಳಿಗೆ ಅನುವಾದಿಸಲಾಗುತ್ತದೆ." },
    { icon: <Trophy className="h-8 w-8 text-teal-400" />, title: "ಆಕಾಂಕ್ಷಾತ್ಮಕ ಪಾಥ್‌ಫೈಂಡಿಂಗ್", desc: "ಪ್ರತ್ಯಕ್ಷ ಮತ್ತು ಆಕಾಂಕ್ಷಾತ್ಮಕ ಇಂಟರ್ನ್‌ಶಿಪ್‌ಗಳನ್ನು ಎರಡನ್ನೂ ಪಡೆಯಿರಿ, ಸ್ಪಷ್ಟ ಕೌಶಲ್ಯ ಮಾರ್ಗಗಳೊಂದಿಗೆ." },
  ],
  or: [
    { icon: <Mic className="h-8 w-8 text-teal-400" />, title: "ଭଏସ୍-ଫର୍ଷ୍ଟ ଇଣ୍ଟରାକ୍ସନ୍", desc: "ମାତ୍ର ଆପଣଙ୍କ ଅଞ୍ଚଳିକ ଭାଷାରେ କହନ୍ତୁ। ଆମ AI ସହାୟକ ଆପଣଙ୍କୁ ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରକ୍ରିୟାରେ ମାର୍ଗଦର୍ଶନ କରେ।" },
    { icon: <Gamepad2 className="h-8 w-8 text-teal-400" />, title: "ଗେମିଫାଇଡ୍ ଅନବୋର୍ଡିଂ", desc: "ଇଣ୍ଟରାକ୍ଟିଭ୍ ଗେମ୍ସ ମାଧ୍ୟମରେ ଆପଣଙ୍କର ପ୍ରୋଫାଇଲ୍ ତିଆରି କରନ୍ତୁ। ଦକ୍ଷତା ଏବଂ ପସନ୍ଦ ଯୋଗ କରିବାରେ ବ୍ୟାଜ୍ ପାଆନ୍ତୁ।" },
    { icon: <MapPin className="h-8 w-8 text-teal-400" />, title: "ହାଇପର୍-ଲୋକାଲ୍ ଅବସର", desc: "ଆପଣଙ୍କ ଘର ଜିଲ୍ଲାର ପ୍ରାଧାନ୍ୟ ଅନୁସାରେ ଇଣ୍ଟର୍ନ୍‌ଶିପ୍ ପାଆନ୍ତୁ। ସ୍ଥାନୀୟ ଅବସରକୁ ପ୍ରାଧାନ୍ୟ ଦିଆଯାଏ।" },
    { icon: <Languages className="h-8 w-8 text-teal-400" />, title: "ଅଟୋ-ଅନୁବାଦ", desc: "ସମସ୍ତ ବିଷୟବସ୍ତୁ ସ୍ୱୟଂଚାଳିତ ଭାବରେ ସରଳ, ସ୍ପଷ୍ଟ ଅଞ୍ଚଳିକ ଭାଷାକୁ ଅନୁବାଦିତ କରାଯାଏ।" },
    { icon: <Trophy className="h-8 w-8 text-teal-400" />, title: "ଆକାଂକ୍ଷାତ୍ମକ ପଥଫାଇଣ୍ଡିଂ", desc: "ପ୍ରତ୍ୟକ୍ଷ ଏବଂ ଆକାଂକ୍ଷାତ୍ମକ ଇଣ୍ଟର୍ନ୍‌ଶିପ୍ ଦୁଇଟି ପାଆନ୍ତୁ, ସ୍ପଷ୍ଟ ଦକ୍ଷତା ମାର୍ଗ ସହିତ।" },
  ],
  ml: [
    { icon: <Mic className="h-8 w-8 text-teal-400" />, title: "വോയ്സ്-ഫസ്റ്റ് ഇന്ററാക്ഷൻ", desc: "നിങ്ങളുടെ പ്രാദേശിക ഭാഷയിൽ സംസാരിക്കുക. ഞങ്ങളുടെ AI അസിസ്റ്റന്റ് മുഴുവൻ പ്രക്രിയയിലും നിങ്ങളെ മാർഗ്ഗനിർദ്ദേശം ചെയ്യുന്നു." },
    { icon: <Gamepad2 className="h-8 w-8 text-teal-400" />, title: "ഗെയ്മിഫൈഡ് ഓൺബോർഡിംഗ്", desc: "ഇന്ററാക്ടീവ് ഗെയിമുകൾ വഴി നിങ്ങളുടെ പ്രൊഫൈൽ നിർമ്മിക്കുക. കഴിവുകളും ഇഷ്ടങ്ങളും ചേർക്കുമ്പോൾ ബാഡ്ജുകൾ നേടുക." },
    { icon: <MapPin className="h-8 w-8 text-teal-400" />, title: "ഹൈപ്പർ-ലോകൽ അവസരങ്ങൾ", desc: "നിങ്ങളുടെ ഹോം ജില്ലയുടെ മുൻഗണന പ്രകാരം ഇന്റേൺഷിപ്പുകൾ നേടുക. പ്രാദേശിക അവസരങ്ങൾക്ക് മുൻഗണന നൽകുന്നു." },
    { icon: <Languages className="h-8 w-8 text-teal-400" />, title: "ഓട്ടോ-ട്രാൻസ്ലേഷൻ", desc: "എല്ലാ ഉള്ളടക്കവും സ്വയമേവ എളുപ്പവും വ്യക്തവുമായ പ്രാദേശിക ഭാഷകളിലേക്ക് വിവർത്തനം ചെയ്യപ്പെടുന്നു." },
    { icon: <Trophy className="h-8 w-8 text-teal-400" />, title: "ആകാംക്ഷാത്മക പാത കണ്ടെത്തൽ", desc: "നേരിട്ടും ആകാംക്ഷാത്മകമായ ഇന്റേൺഷിപ്പുകളും നേടുക, വ്യക്തമായ കഴിവ്-അപ്പ് പാതയോടെ." },
  ],
};

interface HowUnnatiWorksProps {
  language: SupportedLang;
}

const HowUnnatiWorks: React.FC<HowUnnatiWorksProps> = ({ language }) => {
  const features = featuresByLang[language] || featuresByLang['en'];
  const headings: Record<SupportedLang, { title: string; desc: string }> = {
    en: {
      title: 'How UNNATI Works',
      desc: 'Five integrated pillars designed to bridge the opportunity gap for youth with limited digital exposure',
    },
    hi: {
      title: 'UNNATI कैसे काम करता है',
      desc: 'सीमित डिजिटल एक्सपोजर वाले युवाओं के लिए अवसरों की खाई को पाटने के लिए पाँच एकीकृत स्तंभ',
    },
    ta: {
      title: 'UNNATI எப்படி வேலை செய்கிறது',
      desc: 'குறைந்த டிஜிட்டல் அனுபவம் கொண்ட இளைஞர்களுக்கான வாய்ப்பு இடைவெளியை குறைக்கும் ஐந்து ஒருங்கிணைந்த தூண்கள்',
    },
    te: {
      title: 'UNNATI ఎలా పనిచేస్తుంది',
      desc: 'పరిమిత డిజిటల్ పరిచయం ఉన్న యువత కోసం అవకాశాల ఖాళీని తగ్గించడానికి ఐదు సమగ్ర స్థంభాలు',
    },
    bn: {
      title: 'UNNATI কীভাবে কাজ করে',
      desc: 'সীমিত ডিজিটাল এক্সপোজার সহ যুবকদের জন্য সুযোগের ব্যবধান কমাতে পাঁচটি সংহত স্তম্ভ',
    },
    mr: {
      title: 'UNNATI कसे कार्य करते',
      desc: 'मर्यादित डिजिटल एक्सपोजर असलेल्या युवकांसाठी संधीची दरी कमी करण्यासाठी पाच एकत्रित स्तंभ',
    },
    gu: {
      title: 'UNNATI કેવી રીતે કાર્ય કરે છે',
      desc: 'મર્યાદિત ડિજિટલ એક્સપોઝર ધરાવતી યુવાનો માટે તકોની ખોટ ઘટાડવા માટે પાંચ સંકલિત સ્તંભ',
    },
    ur: {
      title: 'UNNATI کیسے کام کرتا ہے',
      desc: 'محدود ڈیجیٹل ایکسپوژر والے نوجوانوں کے لیے مواقع کے فرق کو کم کرنے کے لیے پانچ مربوط ستون',
    },
    kn: {
      title: 'UNNATI ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
      desc: 'ಸೀಮಿತ ಡಿಜಿಟಲ್ ಎಕ್ಸ್‌ಪೋಜರ್ ಹೊಂದಿರುವ ಯುವಕರಿಗೆ ಅವಕಾಶಗಳ ಅಂತರವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಐದು ಸಮಗ್ರ ಸ್ತಂಭಗಳು',
    },
    or: {
      title: 'UNNATI କିପରି କାମ କରେ',
      desc: 'ସୀମିତ ଡିଜିଟାଲ୍ ଏକ୍ସପୋଜର୍ ଥିବା ଯୁବମାନେ ପାଇଁ ସୁଯୋଗର ଖାଲିକୁ କମାଇବା ପାଇଁ ପାଞ୍ଚଟି ସଂଯୁକ୍ତ ସ୍ତମ୍ଭ',
    },
    ml: {
      title: 'UNNATI എങ്ങനെ പ്രവർത്തിക്കുന്നു',
      desc: 'പരിമിത ഡിജിറ്റൽ എക്സ്പോഷർ ഉള്ള യുവാക്കൾക്കായി അവസരങ്ങളുടെ വിടവ് കുറയ്ക്കാൻ അഞ്ച് സംയുക്ത തൂണുകൾ',
    },
  };

  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 pt-16 pb-20 px-6">
      <div className="max-w-8xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {headings[language]?.title || headings['en'].title}
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          {headings[language]?.desc || headings['en'].desc}
        </p>

        {/* Features grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 justify-center items-stretch justify-items-center">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-800 min-h-[16rem] rounded-xl p-6 shadow-md hover:shadow-teal-500/20 hover:scale-105 transition-transform flex flex-col items-center text-center mx-2"
            >
              <div className="bg-gray-700 p-3 rounded-full text-2xl mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-teal-400 text-2xl">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-lg mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowUnnatiWorks;