import React from "react";
import { useState } from "react";
// import heart from "../../assets/heart.png";
import { Link } from "react-router-dom";
import apple from "../../assets/apple.png";


export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row  bg-red-200">
      {/* Left Side (Form) */}
      <div className="flex flex-1 items-center justify-center p-9 bg-white ">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold">Get Started Now</h2>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <a href="#" className="text-green-700 underline">
                  terms & policy
                </a>
              </label>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full rounded-md bg-green-700 text-white py-2 font-medium hover:bg-green-800 transition"
            >
              Signup
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-500">Or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Social Login */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center border rounded-md py-2 hover:bg-gray-100">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </button>
            <button className="flex-1 flex items-center justify-center border rounded-md py-2 hover:bg-gray-100">
              <img
                src={apple}
                alt="Apple"
                className="w-5 h-5 mr-2"
              />
              Sign in with Apple
            </button>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-sm">
            Have an account?{" "}
            <Link to={'/login'} className="text-blue-600 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side (Image) */}
      {/* <div className="flex-1 hidden md:flex items-center justify-center bg-gray-50 p-8">
        <img
          src={heart}
          alt="Heart"
          className="object-contain max-h-screen"
          width={400}
        />
      </div> */}
    </div>
  );
}
