import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { staggerContainer, fadeUp } from "../lib/motion";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Leaf,
  ShoppingBag,
  FileText,
  ArrowRight,
  Recycle,
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
    description: "",
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
      const payload = { ...form };
      if (payload.role === "buyer") {
        delete payload.location;
        delete payload.description;
      }

      const user = await register(payload);
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

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-5xl grid lg:grid-cols-5 rounded-3xl shadow-2xl overflow-hidden bg-white">
          <div className="hidden lg:flex lg:col-span-2 relative flex-col justify-between bg-gradient-to-br from-green-600 to-emerald-800 p-10 overflow-hidden">
            <motion.div
              animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl"
            />

            <div className="relative z-10">
              <img src={logo} alt="logo" className="w-14 h-14 object-contain" />
              <h2 className="text-white text-3xl font-bold mt-8">
                Join AgroCycle
              </h2>
              <p className="text-green-100 mt-4 leading-relaxed">
                Turn agricultural waste into value. Connect with buyers,
                recyclers, and eco-friendly product makers while supporting a
                circular economy.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-3 text-green-100">
              <div className="flex items-center gap-2">
                <Leaf size={18} /> Eco-Friendly & Sustainable
              </div>
              <div className="flex items-center gap-2">
                <Recycle size={18} /> Circular Economy
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-3 p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2">
              Join AgroCycle and start making a difference
            </p>

            <motion.form
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="mt-8 space-y-6"
              onSubmit={handleSubmit}
            >
              <motion.div variants={fadeUp}>
                <label className="block text-gray-700 font-semibold mb-4">
                  I am a <span className="text-red-500">*</span>
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, role: "farmer" })}
                    className={`rounded-2xl p-6 cursor-pointer hover:shadow-md transition ${
                      form.role === "farmer"
                        ? "border-2 border-green-500 bg-green-50"
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
                        ? "border-2 border-green-500 bg-green-50"
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
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>

                <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition">
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
              </motion.div>

              <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition">
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

                  <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition">
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
              </motion.div>

              <AnimatePresence mode="wait">
                {form.role === "farmer" && (
                  <motion.div
                    key="farmer-fields"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6 overflow-hidden"
                  >
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Location
                      </label>

                      <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition">
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

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Description <span className="text-red-500">*</span>
                      </label>

                      <div className="flex items-start border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition">
                        <FileText className="text-gray-400 mt-1" size={20} />
                        <textarea
                          name="description"
                          required={form.role === "farmer"}
                          rows={3}
                          value={form.description}
                          onChange={handleChange}
                          placeholder="Tell buyers about the waste you typically produce (e.g. rice husk, coconut shells)."
                          className="w-full ml-3 outline-none resize-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition">
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

                  <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition">
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
              </motion.div>

              <motion.button
                variants={fadeUp}
                whileHover={{ scale: submitting ? 1 : 1.02, y: submitting ? 0 : -1 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg disabled:opacity-60 text-white font-semibold py-4 rounded-xl transition duration-300 flex items-center justify-center gap-2"
              >
                {submitting ? "Creating account..." : "Create Account"}
                {!submitting && <ArrowRight size={18} />}
              </motion.button>
            </motion.form>

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
      </div>
    </>
  );
}

export default Register;
