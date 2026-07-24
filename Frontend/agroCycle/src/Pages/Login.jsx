import React from "react";
import logo from "../assets/logo.png";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-green-100 flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md ">
          <div className="flex items-center justify-center gap-3 mb-8 ">
            <img src={logo} alt="logo" className="w-14 h-14 object-contain" />
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-900">
            Welcome Back
          </h2>

          <p className="text-gray-500 text-center mt-2">
            Login to your account
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="your@email.com"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition duration-300"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-6 text-gray-600">
            <p>
              Don’t have an account?{" "}
              <span>
                <Link
                  to="/register"
                  className="text-green-600 font-semibold cursor-pointer hover:underline"
                >
                  Register here
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
