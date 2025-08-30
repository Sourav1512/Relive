import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserMd, FaHospital, FaHeartbeat, FaUserInjured, FaEye, FaEyeSlash, FaGoogle, FaApple } from 'react-icons/fa';
import { LuShieldCheck } from "react-icons/lu";
import { GoHeart } from "react-icons/go";

const roles = {
  'Organ Donor': <FaHeartbeat size={20} />,
  'Patient': <FaUserInjured size={20} />,
  'Hospital': <FaHospital size={20} />,
  'Medical Professional': <FaUserMd size={20} />,
};

export default function SignUp() {
  const [activeRole, setActiveRole] = useState("Organ Donor");
  const [authMode, setAuthMode] = useState("Sign In");
  const [inputType, setInputType] = useState("Email");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting for:", { authMode, activeRole, form });
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left Branding Side */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-teal-400 to-green-600 text-white p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <GoHeart size={60} />
          <h1 className="text-5xl font-bold">Relive</h1>
          <p className="text-lg mt-2">Connecting Lives Through Organ Donation</p>
        </div>
        <div className="mt-16 space-y-6">
          <div className="flex items-center gap-4">
            <LuShieldCheck size={24} />
            <span className="text-md">Secure & HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-4">
            <FaHeartbeat size={24} />
            <span className="text-md">Saving Lives Every Day</span>
          </div>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-10 bg-white">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome</h2>
            <p className="text-gray-500 mt-2">Choose your role to get started</p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(roles).map((role) => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`flex items-center justify-center gap-3 p-4 rounded-lg transition-all duration-200 border-2 ${
                  activeRole === role
                    ? "bg-teal-500 text-white border-teal-500 shadow-lg"
                    : "bg-gray-100 text-gray-700 border-gray-100 hover:border-teal-400"
                }`}
              >
                {roles[role]}
                <span className="text-sm font-semibold">{role}</span>
              </button>
            ))}
          </div>

          {/* Sign In / Sign Up Toggle */}
          <div className="flex border-b">
            <button
              onClick={() => setAuthMode('Sign In')}
              className={`flex-1 py-2 font-semibold text-center transition-all ${authMode === 'Sign In' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('Sign Up')}
              className={`flex-1 py-2 font-semibold text-center transition-all ${authMode === 'Sign Up' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500'}`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Conditional Name Field for Sign Up */}
            {authMode === 'Sign Up' && (
              <div>
                <label className="block text-sm font-medium text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="mt-1 w-full rounded-md border px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            )}

            {/* Email or Phone Input */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                {inputType}
              </label>
              <div className="flex items-center mt-1">
                 <input
                  type={inputType === 'Email' ? 'email' : 'tel'}
                  name={inputType.toLowerCase()}
                  value={inputType === 'Email' ? form.email : form.phone}
                  onChange={handleChange}
                  placeholder={`Enter your ${inputType.toLowerCase()}`}
                  className="w-full rounded-md border px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-md border px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            
            {authMode === 'Sign In' && (
                <div className="text-right">
                    <a href="#" className="text-sm font-medium text-teal-600 hover:underline">Forgot password?</a>
                </div>
            )}


            <button
              type="submit"
              className="w-full rounded-md bg-teal-600 text-white py-3 font-semibold hover:bg-teal-700 transition-all shadow"
            >
              {authMode} as {activeRole}
            </button>
          </form>

          <div className="flex items-center gap-3">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-500 text-sm">OR CONTINUE WITH</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Social Logins */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 border rounded-md py-2.5 hover:bg-gray-50 transition-colors">
                <FaGoogle className="text-red-500" /> Sign in with Google
            </button>
             <button className="flex-1 flex items-center justify-center gap-2 border rounded-md py-2.5 hover:bg-gray-50 transition-colors">
                <FaApple /> Sign in with Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}