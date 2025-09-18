import React, { useState, useEffect } from 'react';
import type { Internship } from '../services/internshipService';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import { useLocation } from '../contexts/LocationContext';
import { MapPin, TrendingUp, Award, Briefcase, Star, Shield, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockInternships, verifyInternshipContent } from '../services/internshipService';

type InternshipWithTrust = Internship & { trustScore: number };

const pageVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, type: 'spring', staggerChildren: 0.15 }},
  exit: { opacity: 0, y: 40 }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, type: 'spring' } }
};

const Dashboard: React.FC = () => {
  const { state } = useUser();
  const { location } = useLocation();
  const [nearbyInternships, setNearbyInternships] = useState<InternshipWithTrust[]>([]);
  const [aspirationalInternships, setAspirationalInternships] = useState<InternshipWithTrust[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      const nearby = mockInternships.filter(internship =>
        calculateDistance(location.lat, location.lng, internship.location.lat, internship.location.lng) <= 50
      ).slice(0, 3);
      const aspirational = mockInternships.filter(internship =>
        internship.tags.some(tag =>
          ['Advanced', 'Senior', 'Lead', 'Manager'].some(level => tag.includes(level))
        )
      ).slice(0, 2);

      const verifiedNearby = await Promise.all(
        nearby.map(async (internship) => ({
          ...internship,
          trustScore: await verifyInternshipContent(internship.description),
        }))
      );
      const verifiedAspirational = await Promise.all(
        aspirational.map(async (internship) => ({
          ...internship,
          trustScore: await verifyInternshipContent(internship.description),
        }))
      );

      setNearbyInternships(verifiedNearby);
      setAspirationalInternships(verifiedAspirational);
      setLoading(false);
    };
    loadDashboardData();
  }, [location]);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 +
      Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-center space-y-4"
        >
          <motion.div
            className="rounded-full h-16 w-16 border-b-4 border-white mx-auto"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
            style={{ borderRadius: '50%' }}
          />
          <motion.p className="text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Loading your dashboard...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-8 bg-gradient-to-tr from-gray-900 to-gray-800 text-white min-h-screen"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Welcome Section */}
      <motion.div
        variants={cardVariants}
        className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 text-white shadow-2xl border border-gray-600"
      >
        <motion.h1 className="text-2xl font-extrabold mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          Welcome back, {state.user?.name}! 👋
        </motion.h1>
        <motion.div className="flex items-center space-x-2 text-gray-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <MapPin className="h-4 w-4" />
          <span>{location.district}</span>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={pageVariants}
      >
        {[
          {
            label: "Nearby Opportunities",
            count: nearbyInternships.length,
            icon: <MapPin className="h-6 w-6 text-white" />
          },
          {
            label: "Skills Matched",
            count: state.user?.skills.length,
            icon: <TrendingUp className="h-6 w-6 text-white" />
          },
          {
            label: "Badges Earned",
            count: state.user?.badges.length,
            icon: <Award className="h-6 w-6 text-white" />
          }
        ].map((item) => (
          <motion.div
            key={item.label}
            variants={cardVariants}
            whileHover={{ scale: 1.04, boxShadow: '0 4px 12px #ffffff88' }}
            className="bg-gray-800/90 backdrop-blur rounded-xl p-6 shadow-xl border border-gray-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <motion.p className="text-sm font-medium text-gray-300" layout>
                  {item.label}
                </motion.p>
                <motion.p className="text-2xl font-bold text-white" layout>
                  {item.count}
                </motion.p>
              </div>
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                {item.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Nearby Internships */}
      <motion.div className="space-y-4" variants={cardVariants}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Nearby Opportunities</h2>
          <Link
            to="/internships"
            className="text-white hover:text-gray-300 font-medium flex items-center"
          >
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={{}}>
          <AnimatePresence>
            {nearbyInternships.map((internship) => (
              <motion.div
                key={internship.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={{ scale: 1.03, boxShadow: '0 4px 12px #ffffff88' }}
                className="bg-gray-800/90 backdrop-blur rounded-xl p-6 border border-gray-600 shadow-xl transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{internship.title}</h3>
                    <p className="text-sm text-gray-300">{internship.company}</p>
                  </div>
                  <motion.div
                    className="flex items-center space-x-1 bg-gray-900 px-2 py-1 rounded-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <Shield className="h-3 w-3 text-gray-300" />
                    <span className="text-xs font-medium text-gray-400">{internship.trustScore}%</span>
                  </motion.div>
                </div>
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">{internship.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-300">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      {Math.round(calculateDistance(
                        location.lat, location.lng,
                        internship.location.lat, internship.location.lng
                      ))} km away
                    </span>
                  </div>
                  <motion.button
                    className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.06, boxShadow: '0 0 4px #ffffff88'}}
                  >
                    Apply
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Aspirational Internships */}
      <motion.div className="space-y-4" variants={cardVariants}>
        <h2 className="text-xl font-bold text-white">Aspirational Opportunities</h2>
        <p className="text-gray-300">Build these skills to unlock premium internships</p>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={{}}>
          <AnimatePresence>
            {aspirationalInternships.map((internship) => (
              <motion.div
                key={internship.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={{ scale: 1.04, boxShadow: '0 4px 12px #ffffff88' }}
                className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-600 shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{internship.title}</h3>
                    <p className="text-sm text-gray-300">{internship.company}</p>
                  </div>
                  <motion.div
                    className="flex items-center space-x-1"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 1.3 }}>
                    <Star className="h-4 w-4 text-gray-300" />
                    <span className="text-sm font-bold text-gray-300">Premium</span>
                  </motion.div>
                </div>
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">{internship.description}</p>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {internship.tags.slice(0, 3).map((tag: string, index: number) => (
                      <motion.span
                        key={index}
                        className="px-2 py-1 bg-gray-700 text-white rounded-lg text-xs font-semibold"
                        whileHover={{ scale: 1.06, backgroundColor: '#ffffff44' }}>
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <motion.button
                    className="w-full bg-gradient-to-r from-white to-gray-300 text-gray-900 py-2 rounded-lg text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    whileHover={{ scale: 1.08, boxShadow: '0 0 8px #ffffff88' }}
                  >
                    View Skill-Up Path
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div className="bg-gray-800/90 backdrop-blur rounded-xl p-6 shadow-sm border border-gray-600"
        variants={cardVariants}>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}>
          <Link to="/internships"
            className="flex flex-col items-center p-4 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors">
            <Briefcase className="h-8 w-8 text-white mb-2" />
            <span className="text-sm font-semibold text-white">Browse All</span>
          </Link>
          <motion.button className="flex flex-col items-center p-4 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.06, boxShadow: '0 0 4px #ffffffAA' }}>
            <Award className="h-8 w-8 text-white mb-2" />
            <span className="text-sm font-semibold text-white">My Badges</span>
          </motion.button>
          <Link to="/profile"
            className="flex flex-col items-center p-4 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors">
            <TrendingUp className="h-8 w-8 text-white mb-2" />
            <span className="text-sm font-semibold text-white">Skill Progress</span>
          </Link>
          <motion.button className="flex flex-col items-center p-4 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.04, boxShadow: '0 0 4px #ffffff88' }}>
            <Clock className="h-8 w-8 text-white mb-2" />
            <span className="text-sm font-semibold text-white">Recent Activity</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
