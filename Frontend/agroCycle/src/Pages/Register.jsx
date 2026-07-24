import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

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
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: "farmer",
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    password_confirmation: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== form.password_confirmation) {
      showToast("Passwords do not match.", "error");
      return;
    }

    setSubmitting(true);
    try {
      const user = await register(form);
      showToast(`Account created. Welcome, ${user.name.split(" ")[0]}!`);
      navigate(user.role === "farmer" ? "/farmer" : "/buyer");
    } catch (err) {
      const errors = err.response?.data?.errors;
      const message = errors
        ? Object.values(errors)[0][0]
        : err.response?.data?.message || "Registration failed.";
      showToast(message, "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-green-50 flex items-center justify-center py-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-2xl"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Create Account
          </h2>

          <p className="text-gray-500 text-center mt-2">
            Join AgroCycle and start making a difference
          </p>

          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-semibold mb-4">
                I am a <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "farmer" })}
                  className={`rounded-2xl p-6 cursor-pointer hover:shadow-md transition ${
                    form.role === "farmer"
                      ? "border-2 border-green-500"
                      : "border border-gray-300"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <Leaf
                      size={40}
                      className={
                        form.role === "farmer"
                          ? "text-green-600"
                          : "text-gray-400"
                      }
                    />
                    <h3 className="mt-4 text-xl font-semibold">Farmer</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Sell agricultural waste
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "buyer" })}
                  className={`rounded-2xl p-6 cursor-pointer hover:shadow-md transition ${
                    form.role === "buyer"
                      ? "border-2 border-green-500"
                      : "border border-gray-300"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <ShoppingBag
                      size={40}
                      className={
                        form.role === "buyer"
                          ? "text-green-600"
                          : "text-gray-400"
                      }
                    />
                    <h3 className="mt-4 text-xl font-semibold">Buyer</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Purchase waste for recycling
                    </p>
                  </div>
                </button>
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
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full ml-3 outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email <span className="text-red-500">*</span>
                </label>

                <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
                  <Mail className="text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
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
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
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
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="City, State, Country"
                  className="w-full ml-3 outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Password <span className="text-red-500">*</span>
                </label>

                <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
                  <Lock className="text-gray-400" size={20} />
                  <input
                    type="password"
                    name="password"
                    required
                    minLength={8}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min. 8 characters"
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
                    name="password_confirmation"
                    required
                    value={form.password_confirmation}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="w-full ml-3 outline-none"
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
              type="submit"
              disabled={submitting}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-4 rounded-xl transition duration-300 shadow-md"
            >
              {submitting ? "Creating account..." : "Create Account"}
            </motion.button>
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
        </motion.div>
      </div>
    </>
  );
}

export default Register;
