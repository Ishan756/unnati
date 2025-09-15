import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useLocation } from '../contexts/LocationContext';
import { MapPin, TrendingUp, Award, Briefcase, Star, Shield, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockInternships, verifyInternshipContent } from '../services/internshipService';

const Dashboard: React.FC = () => {
  const { state } = useUser();
  const { location } = useLocation();
  const [nearbyInternships, setNearbyInternships] = useState([]);
  const [aspirationalInternships, setAspirationalInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get nearby internships (within 50km radius)
      const nearby = mockInternships.filter(internship => {
        const distance = calculateDistance(
          location.lat,
          location.lng,
          internship.location.lat,
          internship.location.lng
        );
        return distance <= 50; // 50km radius
      }).slice(0, 3);

      // Get aspirational internships (higher skill requirements)
      const aspirational = mockInternships.filter(internship => 
        internship.tags.some(tag => 
          ['Advanced', 'Senior', 'Lead', 'Manager'].some(level => 
            tag.includes(level)
          )
        )
      ).slice(0, 2);

      // Verify internship content using Gemini API simulation
      const verifiedNearby = await Promise.all(
        nearby.map(async (internship) => {
          const trustScore = await verifyInternshipContent(internship.description);
          return { ...internship, trustScore };
        })
      );

      const verifiedAspirational = await Promise.all(
        aspirational.map(async (internship) => {
          const trustScore = await verifyInternshipContent(internship.description);
          return { ...internship, trustScore };
        })
      );

      setNearbyInternships(verifiedNearby);
      setAspirationalInternships(verifiedAspirational);
      setLoading(false);
    };

    loadDashboardData();
  }, [location]);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Loading your personalized dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {state.user?.name}! 👋
        </h1>
        <div className="flex items-center space-x-2 text-blue-100">
          <MapPin className="h-4 w-4" />
          <span>{location.district}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Nearby Opportunities</p>
              <p className="text-2xl font-bold text-gray-900">{nearbyInternships.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Skills Matched</p>
              <p className="text-2xl font-bold text-gray-900">{state.user?.skills.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Badges Earned</p>
              <p className="text-2xl font-bold text-gray-900">{state.user?.badges.length}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Nearby Internships */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Nearby Opportunities</h2>
          <Link 
            to="/internships" 
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyInternships.map((internship: any) => (
            <div key={internship.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{internship.title}</h3>
                  <p className="text-sm text-gray-600">{internship.company}</p>
                </div>
                <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-lg">
                  <Shield className="h-3 w-3 text-green-600" />
                  <span className="text-xs font-medium text-green-600">
                    {internship.trustScore}%
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {internship.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>
                    {Math.round(calculateDistance(
                      location.lat,
                      location.lng,
                      internship.location.lat,
                      internship.location.lng
                    ))} km away
                  </span>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Aspirational Internships */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Aspirational Opportunities</h2>
        <p className="text-gray-600">Build these skills to unlock premium internships</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aspirationalInternships.map((internship: any) => (
            <div key={internship.id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{internship.title}</h3>
                  <p className="text-sm text-gray-600">{internship.company}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium text-purple-600">Premium</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {internship.description}
              </p>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {internship.tags.slice(0, 3).map((tag: string, index: number) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  View Skill-Up Path
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            to="/internships" 
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Briefcase className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Browse All</span>
          </Link>

          <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <Award className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">My Badges</span>
          </button>

          <Link 
            to="/profile" 
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Skill Progress</span>
          </Link>

          <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <Clock className="h-8 w-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Recent Activity</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;