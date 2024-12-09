import React, { useState, useEffect } from "react";
import { 
  User, Mail, MapPin, Calendar, Activity, 
  Award, Heart, Clock, Share2, Settings,
  Edit2
} from "lucide-react";

const ProfileOverview = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = () => {
      const data = localStorage.getItem('userData');
      if (data) {
        setUserData(JSON.parse(data));
      }
      setIsLoading(false);
    };

    setTimeout(loadUserData, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-blue-500"></div>
      </div>
    );
  }

  if (!userData) {
    return <div>No user data found</div>;
  }

  return (
    <div className="animate-fadeIn min-h-screen bg-gray-50 p-8">
      {/* Hero Section */}
      <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white shadow-lg">
        <div className="relative z-10 flex items-center gap-8">
          <div className="animate-slideInLeft h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl">
            <div className="flex h-full w-full items-center justify-center bg-blue-100 text-4xl font-bold text-blue-600">
              {userData.fullName.charAt(1)}
            </div>
          </div>
          <div className="animate-slideInRight space-y-2">
            <div className="space-y-1">
              <p className="text-sm text-white/80">fullName</p>
              <h1 className="text-4xl font-bold">{userData.fullName}</h1>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-white/80">location</p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {userData.location}
              </p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm transition hover:bg-white/20">
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </button>
              <button className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm transition hover:bg-white/20">
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Main Info */}
        <div className="animate-slideInUp lg:col-span-8 space-y-8">
          {/* Personal Information */}
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-bold text-gray-800">Personal Information</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">email</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">registeredAt</p>
                  <p className="font-medium">
                    {new Date(userData.registeredAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-100 p-3 text-green-600">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">age</p>
                  <p className="font-medium">{userData.age} years</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-yellow-100 p-3 text-yellow-600">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">disability.title</p>
                  <p className="font-medium">{userData.disability.title}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-2 text-xl font-bold text-gray-800">interests</h2>
            <div className="flex flex-wrap gap-3">
              {userData.interests.map((interest, index) => (
                <div
                  key={index}
                  className="animate-fadeIn rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-600"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {interest}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-bold text-gray-800">Security Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">password</p>
                <p className="font-medium">••••••••</p>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="animate-slideInRight lg:col-span-4 space-y-8">
          {/* Disability Range Card */}
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-2 text-xl font-bold text-gray-800">disabilityRange</h2>
            <div className="relative pt-1">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <span className="inline-block rounded-full bg-blue-200 px-2 py-1 text-xs font-semibold text-blue-600">
                    Current Range
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-blue-600">
                    {userData.disabilityRange}%
                  </span>
                </div>
              </div>
              <div className="mb-4 h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  style={{ width: `${userData.disabilityRange}%` }}
                  className="h-full animate-widthGrow rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Severe</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-bold text-gray-800">Quick Actions</h2>
            <div className="space-y-4">
              <button className="flex w-full items-center gap-3 rounded-lg bg-gray-50 p-4 text-left transition hover:bg-gray-100">
                <Settings className="h-5 w-5 text-gray-600" />
                <span>Account Settings</span>
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg bg-gray-50 p-4 text-left transition hover:bg-gray-100">
                <Heart className="h-5 w-5 text-gray-600" />
                <span>Support</span>
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg bg-gray-50 p-4 text-left transition hover:bg-gray-100">
                <Award className="h-5 w-5 text-gray-600" />
                <span>Achievements</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;