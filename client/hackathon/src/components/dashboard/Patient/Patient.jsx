import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../ui/Card.jsx";
import { Button } from "../../ui/Button.jsx";
import { Bell, User, Droplet, MapPin, Heart, Eye, Brain, Settings, FileText, Users, Phone, Clock, Activity } from "lucide-react";

export default function Patient() {
  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    navigate("/patient/update-profile");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-2xl p-6 shadow-lg mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome, John Doe</h1>
          <p className="opacity-90">Your health is our priority</p>
        </div>
        <div className="relative">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">2</span>
        </div>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Profile Summary */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Patient Profile</h2>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-center gap-2"><User className="w-5 h-5 text-blue-500"/> <strong>Full Name:</strong> John Doe</p>
              <p className="flex items-center gap-2"><Droplet className="w-5 h-5 text-blue-500"/> <strong>Blood Group:</strong> B+</p>
              <p className="flex items-center gap-2"><Clock className="w-5 h-5 text-blue-500"/> <strong>Age:</strong> 45 years</p>
              <p className="flex items-center gap-2"><MapPin className="w-5 h-5 text-blue-500"/> <strong>City:</strong> New York, NY</p>
              <p className="text-sm text-gray-500">Patient ID: #PAT20230089</p>
            </div>
          </CardContent>
        </Card>

        {/* Medical Status */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Medical Status</h2>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="font-medium text-blue-700">Required Organ: <span className="text-blue-900">Kidney</span></p>
                <p className="text-sm text-blue-600 mt-1">Priority Status: <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Medium</span></p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-gray-100">
                  <p className="text-sm font-medium">Waiting Since</p>
                  <p className="text-blue-600">3 months</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-100">
                  <p className="text-sm font-medium">Last Checkup</p>
                  <p className="text-blue-600">2 weeks ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Medical Updates */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center gap-2"><Activity className="w-5 h-5"/> Medical Updates</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="text-blue-600 font-medium">Doctor's Appointment <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 text-xs rounded">Completed</span></h3>
                <p className="text-sm text-gray-700">Regular checkup with Dr. Smith - Blood work results normal.</p>
                <div className="flex justify-between text-xs text-gray-500 mt-2"><span>Memorial Hospital</span><span>Yesterday</span></div>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="text-blue-600 font-medium">Medication Update <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">New</span></h3>
                <p className="text-sm text-gray-700">Updated immunosuppressant prescription - Please collect from pharmacy.</p>
                <div className="flex justify-between text-xs text-gray-500 mt-2"><span>Dr. Johnson</span><span>2 days ago</span></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center gap-2"><Settings className="w-5 h-5"/> Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={handleUpdateProfile}
                className="p-4 bg-blue-500 text-white rounded-xl flex flex-col items-center justify-center shadow cursor-pointer hover:bg-blue-600"
              >
                <User className="w-6 h-6 mb-2"/> Update Profile
              </div>
              <div className="p-4 bg-blue-500 text-white rounded-xl flex flex-col items-center justify-center shadow cursor-pointer hover:bg-blue-600">
                <FileText className="w-6 h-6 mb-2"/> Medical Records
              </div>
              <div className="p-4 bg-blue-500 text-white rounded-xl flex flex-col items-center justify-center shadow cursor-pointer hover:bg-blue-600">
                <Phone className="w-6 h-6 mb-2"/> Contact Doctor
              </div>
              <div className="p-4 bg-blue-100 text-blue-700 rounded-xl flex flex-col items-center justify-center shadow cursor-pointer hover:bg-blue-200">
                <Clock className="w-6 h-6 mb-2"/> Appointments
              </div>
              <div className="p-4 bg-blue-100 text-blue-700 rounded-xl flex flex-col items-center justify-center shadow cursor-pointer hover:bg-blue-200">
                <Settings className="w-6 h-6 mb-2"/> Settings
              </div>
              <div className="p-4 bg-blue-100 text-blue-700 rounded-xl flex flex-col items-center justify-center shadow cursor-pointer hover:bg-blue-200">
                <Users className="w-6 h-6 mb-2"/> Support Group
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}