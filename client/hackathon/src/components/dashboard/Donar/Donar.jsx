import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../ui/Card.jsx";
import { Button } from "../../ui/Button.jsx";
import { Switch } from "../../ui/Switch.jsx";
import { Bell, User, Droplet, MapPin, Heart, Eye, Brain, Settings, FileText, Users, Phone, Clock } from "lucide-react";
import { useDonar } from '../../../context/DonarContext';

export default function Donar() {
  const navigate = useNavigate();
  const { donarProfile } = useDonar();

  const handleUpdateProfile = () => {
    navigate("/donar/update-profile");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-400 text-white rounded-2xl p-6 shadow-lg mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {donarProfile.fullName}</h1>
          <p className="opacity-90">Your kindness saves lives</p>
        </div>
        <div className="relative">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">3</span>
        </div>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Profile Summary */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-green-600 mb-4">Profile Summary</h2>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-center gap-2"><User className="w-5 h-5 text-green-500"/> <strong>Full Name:</strong> {donarProfile.fullName}</p>
              <p className="flex items-center gap-2"><Droplet className="w-5 h-5 text-green-500"/> <strong>Blood Group:</strong> {donarProfile.bloodGroup}</p>
              <p className="flex items-center gap-2"><Clock className="w-5 h-5 text-green-500"/> <strong>Age:</strong> {donarProfile.age} years</p>
              <p className="flex items-center gap-2"><MapPin className="w-5 h-5 text-green-500"/> <strong>City:</strong> {donarProfile.city}</p>
              <p className="text-sm text-gray-500">Member since March 2022</p>
            </div>
          </CardContent>
        </Card>

        {/* Donation Status */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-green-600">Donation Status</h2>
              <Switch defaultChecked />
            </div>
            <p className="mb-4"><span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded">Available for donation</span></p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-gray-100 flex items-center gap-2"><Heart className="w-4 h-4 text-green-500"/> Heart</div>
              <div className="p-3 rounded-lg bg-gray-100 flex items-center gap-2"><Brain className="w-4 h-4 text-green-500"/> Kidney</div>
              <div className="p-3 rounded-lg bg-gray-100 flex items-center gap-2"><Brain className="w-4 h-4 text-green-500"/> Liver</div>
              <div className="p-3 rounded-lg bg-gray-100 flex items-center gap-2"><Eye className="w-4 h-4 text-green-500"/> Eyes</div>
            </div>
            <p className="text-sm text-green-600 bg-green-50 p-2 rounded-lg">✨ Thank you for being an active donor! Your generosity gives hope to those in need.</p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-green-600 mb-4 flex items-center gap-2"><Bell className="w-5 h-5"/> Recent Notifications</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="text-green-600 font-medium">St. Mary’s Hospital Request <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded">High Priority</span></h3>
                <p className="text-sm text-gray-700">Urgent kidney donation needed for 45-year-old patient. Compatible blood type match.</p>
                <div className="flex justify-between text-xs text-gray-500 mt-2"><span>San Francisco, CA</span><span>2 hours ago</span></div>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="text-green-600 font-medium">Patient Match Found <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded">Medium Priority</span></h3>
                <p className="text-sm text-gray-700">Your cornea donation could help restore sight for a 28-year-old teacher.</p>
                <div className="flex justify-between text-xs text-gray-500 mt-2"><span>Oakland, CA</span><span>5 hours ago</span></div>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="text-green-600 font-medium">General Hospital Inquiry <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 text-xs rounded">Low Priority</span></h3>
                <p className="text-sm text-gray-700">Liver transplant candidate seeking compatible donor in Bay Area.</p>
                <div className="flex justify-between text-xs text-gray-500 mt-2"><span>San Jose, CA</span><span>1 day ago</span></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-green-600 mb-4 flex items-center gap-2"><Settings className="w-5 h-5"/> Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={handleUpdateProfile}
                className="p-4 bg-green-500 text-white rounded-xl flex flex-col items-center justify-center shadow cursor-pointer hover:bg-green-600"
              >
                <User className="w-6 h-6 mb-2"/> Update Profile
              </div>
              <div className="p-4 bg-green-500 text-white rounded-xl flex flex-col items-center justify-center shadow cursor-pointer hover:bg-green-600">
                <Clock className="w-6 h-6 mb-2"/> Donation History
              </div>
              <div className="p-4 bg-green-500 text-white rounded-xl flex flex-col items-center justify-center shadow cursor-pointer hover:bg-green-600">
                <Phone className="w-6 h-6 mb-2"/> Contact Support
              </div>
              <div className="p-4 bg-green-100 text-green-700 rounded-xl flex flex-col items-center justify-center shadow cursor-pointer hover:bg-green-200">
                <FileText className="w-6 h-6 mb-2"/> Medical Records
              </div>
              <div className="p-4 bg-green-100 text-green-700 rounded-xl flex flex-col items-center justify-center shadow cursor-pointer hover:bg-green-200">
                <Settings className="w-6 h-6 mb-2"/> Settings
              </div>
              <div className="p-4 bg-green-100 text-green-700 rounded-xl flex flex-col items-center justify-center shadow cursor-pointer hover:bg-green-200">
                <Users className="w-6 h-6 mb-2"/> Find Recipients
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

