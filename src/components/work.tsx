import React from "react";
import { Mic, Gamepad2, MapPin, Languages, Trophy } from "lucide-react";

const features = [
  {
    icon: <Mic className="h-8 w-8 text-teal-400" />,
    title: "Voice-First Interaction",
    desc: "Simply speak in your regional language. Our AI assistant guides you through the entire process.",
  },
  {
    icon: <Gamepad2 className="h-8 w-8 text-teal-400" />,
    title: "Gamified Onboarding",
    desc: "Build your profile through interactive games. Earn badges for adding skills and preferences.",
  },
  {
    icon: <MapPin className="h-8 w-8 text-teal-400" />,
    title: "Hyper-Local Opportunities",
    desc: "Get internships prioritized by your home district. Local opportunities come first.",
  },
  {
    icon: <Languages className="h-8 w-8 text-teal-400" />,
    title: "Auto-Translation",
    desc: "All content automatically translated to simple, clear regional languages.",
  },
  {
    icon: <Trophy className="h-8 w-8 text-teal-400" />,
    title: "Aspirational Pathfinding",
    desc: "Get both direct matches and aspirational internships with clear skill-up paths.",
  },
];

const HowUnnatiWorks: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 pt-16 pb-20 px-6">
      <div className="max-w-8xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          How <span className="text-teal-400">UNNATI</span> Works
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          Five integrated pillars designed to bridge the opportunity gap for youth
          with limited digital exposure
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
