// TopCompanies.tsx
import React from "react";
import {
  Building,
  MapPin,
  Calendar,
  DollarSign,
  Briefcase,
  Cpu,
  Leaf,
  CreditCard,
  HeartPulse,
} from "lucide-react";
import { Link } from "react-router-dom";

type Company = {
  id: string;
  name: string;
  industry: string;
  location: string;
  openings: number;
  payRange: string;
  tags: string[];
  icon?: React.ReactNode;
};

const COMPANIES: Company[] = [
  {
    id: "techcorp",
    name: "TechCorp",
    industry: "Technology",
    location: "San Francisco, CA",
    openings: 15,
    payRange: "$25-30/hr",
    tags: ["Remote", "Full-time", "Paid"],
    icon: <Building className="h-8 w-8 text-teal-600" />,
  },
  {
    id: "dataflow",
    name: "DataFlow Inc",
    industry: "Data Science",
    location: "New York, NY",
    openings: 8,
    payRange: "$22-28/hr",
    tags: ["Hybrid", "Part-time", "Paid"],
    icon: <Cpu className="h-8 w-8 text-teal-600" />,
  },
  {
    id: "ai-sol",
    name: "AI Solutions",
    industry: "Artificial Intelligence",
    location: "Seattle, WA",
    openings: 12,
    payRange: "$30-35/hr",
    tags: ["On-site", "Full-time", "Paid"],
    icon: <Briefcase className="h-8 w-8 text-teal-600" />,
  },
  {
    id: "green-energy",
    name: "Green Energy Co",
    industry: "Renewable Energy",
    location: "Austin, TX",
    openings: 6,
    payRange: "$20-25/hr",
    tags: ["Remote", "Full-time", "Paid"],
    icon: <Leaf className="h-8 w-8 text-teal-600" />,
  },
  {
    id: "fintech-pro",
    name: "FinTech Pro",
    industry: "Financial Technology",
    location: "Boston, MA",
    openings: 10,
    payRange: "$28-32/hr",
    tags: ["Hybrid", "Full-time", "Paid"],
    icon: <CreditCard className="h-8 w-8 text-teal-600" />,
  },
  {
    id: "healthtech",
    name: "HealthTech Labs",
    industry: "Healthcare Technology",
    location: "Los Angeles, CA",
    openings: 7,
    payRange: "$24-29/hr",
    tags: ["On-site", "Part-time", "Paid"],
    icon: <HeartPulse className="h-8 w-8 text-teal-600" />,
  },
];

const Tag: React.FC<{ text: string }> = ({ text }) => (
  <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-teal-50 text-teal-600 border border-teal-100">
    {text}
  </span>
);

const CompanyCard: React.FC<{ c: Company }> = ({ c }) => {
  return (
    <article
      className=" bg-gradient-to-tr from-gray-900 via- to-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md  duration-200 border border-gray-100 hover:scale-[1.02] transition-all delay-75 "
      aria-labelledby={`company-${c.id}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center rounded-lg bg-gray-800 p-3">
          {c.icon ?? <Building className="h-8 w-8 text-teal-600" />}
        </div>

        <div className="flex-1">
          <h3 id={`company-${c.id}`} className="text-2xl py-3 font-semibold text-teal-200">
            {c.name}
          </h3>
          <p className="text-lg text-gray-300 mt-1">{c.industry}</p>

          <div className="mt-4 flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-200" />
              <span className="text-gray-200">{c.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-200 " />
              <span className="text-gray-200">{c.openings} open positions</span>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-200" />
              <span className="text-gray-200">{c.payRange}</span>
            </div>
          </div>

          {/* tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {c.tags.map((t) => (
              <Tag key={t} text={t} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-5">
            <Link
              to={`/companies/${c.id}`}
              className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-teal-500 transition"
              aria-label={`View opportunities at ${c.name}`}
            >
              View Opportunities
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

const TopCompanies: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-6 w-full">
      <div className="max-w-8xl mx-auto">
        <header className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-100">
            Top Companies
          </h2>
          <p className="mt-3 text-gray-300 text-xl max-w-2xl mx-auto">
            Connect with industry-leading companies offering exciting internship opportunities
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {COMPANIES.map((c) => (
            <CompanyCard key={c.id} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCompanies;
