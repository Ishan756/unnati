import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Shield, Star, Clock, Briefcase } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import { useUser } from '../contexts/UserContext';
import { mockInternships, verifyInternshipContent } from '../services/internshipService';

const Internships: React.FC = () => {
  const { location } = useLocation();
  const { state } = useUser();
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    { key: 'all', label: 'All Internships' },
    { key: 'nearby', label: 'Nearby (50km)' },
    { key: 'remote', label: 'Remote' },
    { key: 'high-trust', label: 'High Trust Score' },
    { key: 'matched-skills', label: 'Skills Match' },
  ];

  useEffect(() => {
    const loadInternships = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add trust scores to internships
      const verifiedInternships = await Promise.all(
        mockInternships.map(async (internship) => {
          const trustScore = await verifyInternshipContent(internship.description);
          const distance = calculateDistance(
            location.lat,
            location.lng,
            internship.location.lat,
            internship.location.lng
          );
          return { ...internship, trustScore, distance };
        })
      );

      setInternships(verifiedInternships);
      setFilteredInternships(verifiedInternships);
      setLoading(false);
    };

    loadInternships();
  }, [location]);

  useEffect(() => {
    filterInternships();
  }, [searchQuery, selectedFilter, internships]);

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

  const filterInternships = () => {
    let filtered = internships;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(internship =>
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    switch (selectedFilter) {
      case 'nearby':
        filtered = filtered.filter(internship => internship.distance <= 50);
        break;
      case 'remote':
        filtered = filtered.filter(internship => 
          internship.tags.some(tag => tag.toLowerCase().includes('remote'))
        );
        break;
      case 'high-trust':
        filtered = filtered.filter(internship => internship.trustScore >= 85);
        break;
      case 'matched-skills':
        filtered = filtered.filter(internship =>
          internship.tags.some(tag =>
            state.user?.skills.some(skill =>
              skill.toLowerCase().includes(tag.toLowerCase()) ||
              tag.toLowerCase().includes(skill.toLowerCase())
            )
          )
        );
        break;
    }

    setFilteredInternships(filtered);
  };

  const getTrustColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 75) return 'text-blue-600 bg-blue-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Loading internships...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Internship Opportunities</h1>
        <p className="text-gray-600">
          Discover verified internships near {location.district} and beyond
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search internships, companies, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center space-x-2 overflow-x-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedFilter === filter.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredInternships.length} of {internships.length} internships
        </p>
        
        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>Sort by Relevance</option>
          <option>Sort by Distance</option>
          <option>Sort by Trust Score</option>
          <option>Sort by Date Posted</option>
        </select>
      </div>

      {/* Internship Cards */}
      <div className="space-y-6">
        {filteredInternships.map((internship: any) => (
          <div key={internship.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{internship.title}</h3>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${getTrustColor(internship.trustScore)}`}>
                      <Shield className="h-3 w-3" />
                      <span className="text-xs font-medium">{internship.trustScore}%</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 font-medium">{internship.company}</p>
                  
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{Math.round(internship.distance)} km away</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Posted 2 days ago</span>
                    </div>
                  </div>
                </div>

                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <Star className="h-5 w-5" />
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-600 line-clamp-3">
                {internship.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {internship.tags.slice(0, 5).map((tag: string, index: number) => (
                  <span 
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      state.user?.skills.some(skill =>
                        skill.toLowerCase().includes(tag.toLowerCase()) ||
                        tag.toLowerCase().includes(skill.toLowerCase())
                      )
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
                {internship.tags.length > 5 && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    +{internship.tags.length - 5} more
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <button className="text-gray-500 hover:text-blue-600 transition-colors">
                    <Briefcase className="h-5 w-5" />
                  </button>
                  <span className="text-sm text-gray-500">Share</span>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    Learn More
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredInternships.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No internships found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or filters
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedFilter('all');
            }}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Internships;