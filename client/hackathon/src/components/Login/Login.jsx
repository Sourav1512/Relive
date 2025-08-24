import React from "react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md px-6 py-10">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
        <p className="mt-1 text-sm text-gray-600">
          Enter your Credentials to access your account
        </p>

        {/* Form */}
        <form className="mt-6 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-green-700 focus:ring-green-700"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                forgot password
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Name"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-green-700 focus:ring-green-700"
            />
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-gray-300 text-green-700 focus:ring-green-700"
            />
            <label htmlFor="remember" className="text-sm text-gray-700">
              Remember for 30 days
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-green-800 px-4 py-2 text-sm font-medium text-white hover:bg-green-900 focus:outline-none"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-gray-500">Or</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="flex gap-3">
          <button className="flex w-1/2 items-center justify-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <FcGoogle className="text-lg" />
            Sign in with Google
          </button>
          <button className="flex w-1/2 items-center justify-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <FaApple className="text-lg" />
            Sign in with Apple
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to={'/signup'} className="font-medium text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
