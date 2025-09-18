
import React from "react";
import {
  Mic,
  MapPin,
  Languages,
  Gamepad2,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

type Feature = {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
};

const FEATURES: Feature[] = [
  {
    Icon: Mic,
    title: "Voice-First Interface",
    desc:
      "Interact naturally by speaking in your regional language. No typing required - just talk to our AI assistant.",
  },
  {
    Icon: MapPin,
    title: "Hyper-Local Focus",
    desc:
      "Prioritizes opportunities within your home district to reduce economic barriers and support local talent.",
  },
  {
    Icon: Languages,
    title: "Multi-Language Support",
    desc:
      "Content automatically translated into 12+ regional languages with simple, clear explanations.",
  },
  {
    Icon: Gamepad2,
    title: "Gamified Experience",
    desc:
      "Build your profile through engaging games and earn badges for completing different sections.",
  },
  {
    Icon: ShieldCheck,
    title: "Inclusive Design",
    desc:
      "Specially designed for youth with limited digital exposure, removing literacy and technology barriers.",
  },
  {
    Icon: TrendingUp,
    title: "Skill Development",
    desc:
      "Aspirational pathfinding suggests growth opportunities with clear skill-up paths for career advancement.",
  },
];

const Choose: React.FC = () => {
  return (
    <section className=" bg-gradient-to-tr from-gray-900 via- to-gray-800 py-16 px-6">
      <div className="max-w-9xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            Why Choose <span className="text-teal-500">UNNATI</span>
          </h2>
          <p className="mt-3 text-gray-400 max-w-3xl mx-auto text-xl">
            The only platform designed specifically for inclusive access, breaking
            language and digital barriers for PM Internship Scheme
          </p>
        </div>

        {/* Grid */}
        <div className="grid  gap-8 sm:grid-cols-2 lg:grid-cols-3  ">
          {FEATURES.map((f, i) => (
            <article
              key={i}
              className=" bg-gradient-to-tr from-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:scale-105  delay-100 "
              aria-labelledby={`feature-${i}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="rounded-lg bg-teal-100 p-3 inline-flex items-center justify-center hover:scale-105 transition-all delay-75">
                    <f.Icon className="h-6 w-6 text-teal-600 " />
                  </div>
                </div>

                <div>
                  <h3
                    id={`feature-${i}`}
                    className="text-2xl font-semibold text-teal-500"
                  >
                    {f.title}
                  </h3>
                  <p className="mt-2 text-lg text-gray-400 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Choose;
