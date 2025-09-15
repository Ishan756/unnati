import React, { useState } from 'react';
import { User, MapPin, Award, TrendingUp, Edit3, Save, X, Plus } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useLocation } from '../contexts/LocationContext';

const Profile: React.FC = () => {
  const { state, dispatch } = useUser();
  const { location } = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: state.user?.name || '',
    education: state.user?.education || '',
    skills: state.user?.skills || [],
    preferences: state.user?.preferences || [],
  });

  const availableSkills = [
    'Communication', 'Computer Skills', 'Problem Solving', 'Teamwork', 'Leadership',
    'Time Management', 'Creative Thinking', 'Research', 'Data Analysis', 'Marketing',
    'Sales', 'Customer Service', 'Project Management', 'Programming', 'Design'
  ];

  const availablePreferences = [
    'Technology', 'Healthcare', 'Education', 'Finance', 'Marketing', 'Design',
    'Engineering', 'Social Work', 'Business', 'Media', 'Government', 'Non-Profit',
    'Startup', 'Corporate', 'Research'
  ];

  const badges = [
    { name: 'Welcome Badge', icon: '🎉', description: 'Completed onboarding' },
    { name: 'Profile Complete', icon: '✅', description: 'Filled all profile details' },
    { name: 'Skill Explorer', icon: '🔍', description: 'Added 5+ skills' },
    { name: 'Location Scout', icon: '📍', description: 'Enabled location services' },
  ];

  const skillProgress = [
    { skill: 'Communication', current: 75, target: 90, match: '12 internships' },
    { skill: 'Computer Skills', current: 60, target: 85, match: '8 internships' },
    { skill: 'Problem Solving', current: 80, target: 95, match: '15 internships' },
    { skill: 'Teamwork', current: 70, target: 80, match: '20 internships' },
  ];

  const handleSave = () => {
    if (state.user) {
      dispatch({
        type: 'UPDATE_USER',
        payload: {
          ...formData,
        },
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: state.user?.name || '',
      education: state.user?.education || '',
      skills: state.user?.skills || [],
      preferences: state.user?.preferences || [],
    });
    setIsEditing(false);
  };

  const toggleSkill = (skill: string) => {
    if (formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: formData.skills.filter(s => s !== skill)
      });
    } else {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill]
      });
    }
  };

  const togglePreference = (preference: string) => {
    if (formData.preferences.includes(preference)) {
      setFormData({
        ...formData,
        preferences: formData.preferences.filter(p => p !== preference)
      });
    } else {
      setFormData({
        ...formData,
        preferences: [...formData.preferences, preference]
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{state.user?.name}</h1>
              <div className="flex items-center space-x-2 text-blue-100">
                <MapPin className="h-4 w-4" />
                <span>{location.district}</span>
              </div>
            </div>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              <Edit3 className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold">{state.user?.skills.length}</p>
            <p className="text-blue-100">Skills</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{state.user?.badges.length}</p>
            <p className="text-blue-100">Badges</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{state.user?.preferences.length}</p>
            <p className="text-blue-100">Interests</p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{state.user?.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
              {isEditing ? (
                <select
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select education level</option>
                  <option value="High School (10th)">High School (10th)</option>
                  <option value="12th Grade">12th Grade</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-gray-900">{state.user?.education}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <p className="text-gray-900 flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                {location.district}
              </p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-orange-500" />
            Badges Earned
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge, index) => (
              <div key={index} className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-2xl mb-2">{badge.icon}</div>
                <h3 className="font-medium text-gray-900 text-sm mb-1">{badge.name}</h3>
                <p className="text-xs text-gray-600">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
        
        {isEditing ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Select your skills:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm ${
                    formData.skills.includes(skill)
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {state.user?.skills.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Career Interests */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Career Interests</h2>
        
        {isEditing ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Select your interests:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availablePreferences.map((preference) => (
                <button
                  key={preference}
                  onClick={() => togglePreference(preference)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm ${
                    formData.preferences.includes(preference)
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {preference}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {state.user?.preferences.map((preference, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-medium"
              >
                {preference}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Skill Progress */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
          Skill Development Progress
        </h2>
        
        <div className="space-y-6">
          {skillProgress.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{skill.skill}</span>
                <span className="text-sm text-gray-600">{skill.match}</span>
              </div>
              
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${skill.current}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-1 text-xs text-gray-600">
                  <span>Current: {skill.current}%</span>
                  <span>Target: {skill.target}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;