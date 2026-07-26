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

      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-5xl grid lg:grid-cols-5 rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white">
          <div className="hidden lg:flex lg:col-span-2 relative flex-col justify-between bg-green-700 p-10">
            <div>
              <img src={logo} alt="logo" className="w-11 h-11 object-contain" />
              <h2 className="text-white text-2xl font-semibold mt-8 tracking-tight">
                Join AgroCycle
              </h2>
              <p className="text-green-100 mt-3 text-sm leading-relaxed">
                Turn agricultural waste into value. Connect with buyers,
                recyclers, and eco-friendly product makers while supporting a
                circular economy.
              </p>
            </div>

            <div className="flex flex-col gap-3 text-sm text-green-100">
              <div className="flex items-center gap-2">
                <Leaf size={16} /> Eco-Friendly & Sustainable
              </div>
              <div className="flex items-center gap-2">
                <Recycle size={16} /> Circular Economy
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-3 p-8 md:p-12"
          >
            <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
              Create Account
            </h2>

            <p className="text-gray-500 text-sm mt-1.5">
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
                <label className="block text-gray-700 text-sm font-medium mb-3">
                  I am a <span className="text-red-500">*</span>
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, role: "farmer" })}
                    className={`rounded-xl p-5 cursor-pointer transition ${
                      form.role === "farmer"
                        ? "border-2 border-green-500 bg-green-50"
                        : "border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <Leaf
                        size={28}
                        className={
                          form.role === "farmer"
                            ? "text-green-600"
                            : "text-gray-400"
                        }
                      />
                      <h3 className="mt-3 text-sm font-semibold text-gray-900">Farmer</h3>
                      <p className="text-gray-500 text-xs mt-1">
                        Sell agricultural waste
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, role: "buyer" })}
                    className={`rounded-xl p-5 cursor-pointer transition ${
                      form.role === "buyer"
                        ? "border-2 border-green-500 bg-green-50"
                        : "border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <ShoppingBag
                        size={28}
                        className={
                          form.role === "buyer"
                            ? "text-green-600"
                            : "text-gray-400"
                        }
                      />
                      <h3 className="mt-3 text-sm font-semibold text-gray-900">Buyer</h3>
                      <p className="text-gray-500 text-xs mt-1">
                        Purchase waste for recycling
                      </p>
                    </div>
                  </button>
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>

                <div className="flex items-center border border-gray-300 rounded-lg px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-green-500/30 focus-within:border-green-500 transition">
                  <User className="text-gray-400" size={17} />
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full ml-2.5 outline-none text-sm"
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center border border-gray-300 rounded-lg px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-green-500/30 focus-within:border-green-500 transition">
                    <Mail className="text-gray-400" size={17} />
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full ml-2.5 outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5">
                    Phone Number
                  </label>

                  <div className="flex items-center border border-gray-300 rounded-lg px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-green-500/30 focus-within:border-green-500 transition">
                    <Phone className="text-gray-400" size={17} />
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+94 77 123 4567"
                      className="w-full ml-2.5 outline-none text-sm"
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
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">
                        Location
                      </label>

                      <div className="flex items-center border border-gray-300 rounded-lg px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-green-500/30 focus-within:border-green-500 transition">
                        <MapPin className="text-gray-400" size={17} />
                        <input
                          type="text"
                          name="location"
                          value={form.location}
                          onChange={handleChange}
                          placeholder="City, State, Country"
                          className="w-full ml-2.5 outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">
                        Description <span className="text-red-500">*</span>
                      </label>

                      <div className="flex items-start border border-gray-300 rounded-lg px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-green-500/30 focus-within:border-green-500 transition">
                        <FileText className="text-gray-400 mt-1" size={17} />
                        <textarea
                          name="description"
                          required={form.role === "farmer"}
                          rows={3}
                          value={form.description}
                          onChange={handleChange}
                          placeholder="Tell buyers about the waste you typically produce (e.g. rice husk, coconut shells)."
                          className="w-full ml-2.5 outline-none resize-none text-sm"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5">
                    Password <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center border border-gray-300 rounded-lg px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-green-500/30 focus-within:border-green-500 transition">
                    <Lock className="text-gray-400" size={17} />
                    <input
                      type="password"
                      name="password"
                      required
                      minLength={8}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Min. 8 characters"
                      className="w-full ml-2.5 outline-none text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center border border-gray-300 rounded-lg px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-green-500/30 focus-within:border-green-500 transition">
                    <Lock className="text-gray-400" size={17} />
                    <input
                      type="password"
                      name="password_confirmation"
                      required
                      value={form.password_confirmation}
                      onChange={handleChange}
                      placeholder="Confirm password"
                      className="w-full ml-2.5 outline-none text-sm"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.button
                variants={fadeUp}
                whileHover={{ scale: submitting ? 1 : 1.01 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                type="submit"
                disabled={submitting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-sm font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? "Creating account..." : "Create Account"}
                {!submitting && <ArrowRight size={16} />}
              </motion.button>
            </motion.form>

            <div className="text-center mt-6 text-sm text-gray-600">
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
