import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Leaf,
  ShoppingBag,
} from "lucide-react";

function Register() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-green-50 flex items-center justify-center py-10 px-4">
        <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Create Account
          </h2>

          <p className="text-gray-500 text-center mt-2">
            Join AgroCycle and start making a difference
          </p>

          <form className="mt-10 space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-4">
                I am a <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-green-500 rounded-2xl p-6 cursor-pointer hover:shadow-md transition">
                  <div className="flex flex-col items-center">
                    <Leaf size={40} className="text-green-600" />

                    <h3 className="mt-4 text-xl font-semibold">Farmer</h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Sell agricultural waste
                    </p>
                  </div>
                </div>

                <div className="border border-gray-300 rounded-2xl p-6 cursor-pointer hover:shadow-md transition">
                  <div className="flex flex-col items-center">
                    <ShoppingBag size={40} className="text-gray-400" />

                    <h3 className="mt-4 text-xl font-semibold">Buyer</h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Purchase waste for recycling
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>

              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
                <User className="text-gray-400" size={20} />

                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full ml-3 outline-none"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email <span className="text-red-500">*</span>
                </label>

                <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
                  <Mail className="text-gray-400" size={20} />

                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full ml-3 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>

                <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
                  <Phone className="text-gray-400" size={20} />

                  <input
                    type="text"
                    placeholder="+94 77 123 4567"
                    className="w-full ml-3 outline-none"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Location
              </label>

              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
                <MapPin className="text-gray-400" size={20} />

                <input
                  type="text"
                  placeholder="City, State, Country"
                  className="w-full ml-3 outline-none"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {" "}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Password <span className="text-red-500">*</span>
                </label>

                <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
                  <Lock className="text-gray-400" size={20} />

                  <input
                    type="password"
                    placeholder="Min. 6 characters"
                    className="w-full ml-3 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>

                <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
                  <Lock className="text-gray-400" size={20} />

                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="w-full ml-3 outline-none"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition duration-300 shadow-md"
            >
              Create Account
            </button>
          </form>

          <div className="text-center mt-6 text-gray-600">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-600 font-semibold hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
