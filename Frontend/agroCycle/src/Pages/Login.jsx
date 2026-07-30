import { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import Navbar from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Mail, Lock, ArrowRight, Leaf, Recycle, Sprout } from "lucide-react";
import { staggerContainer, fadeUp } from "../lib/motion";

function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const user = await login(form);
      showToast(`Welcome back, ${user.name.split(" ")[0]}!`);
      const dashboardPath =
        user.role === "admin"
          ? "/admin/stats"
          : user.role === "farmer"
            ? "/farmer"
            : "/buyer";
      navigate(dashboardPath);
    } catch (err) {
      const message =
        err.response?.data?.errors?.email?.[0] ||
        err.response?.data?.message ||
        "Login failed. Please try again.";
      showToast(message, "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-4xl grid lg:grid-cols-2 rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white">
          <div className="hidden lg:flex relative flex-col justify-between bg-green-700 p-10">
            <div>
              <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <img
                  src={logo}
                  alt="AgroCycle Logo"
                  className="w-10 h-10 object-contain flex justify-center"
                />
              </div>
              <h2 className="text-white text-2xl font-semibold mt-8 tracking-tight">
                Welcome back to AgroCycle
              </h2>
              <p className="text-green-100 mt-3 text-sm leading-relaxed">
                Turning agricultural waste into value — <br></br>Connect with
                buyers, recyclers, and eco-friendly product makers.
              </p>
            </div>

            <div className="flex flex-row gap-6 text-sm text-green-100">
              <div className="flex items-center gap-1 text-xs">
                <Leaf size={14} /> Eco-Friendly
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Recycle size={14} /> Circular Economy
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Sprout size={14} /> Sustainable
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="p-8 md:p-12 flex flex-col justify-center"
          >
            <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
              Welcome Back
            </h2>

            <p className="text-gray-500 text-sm mt-1.5">
              Login to your account
            </p>

            <motion.form
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="mt-8 space-y-5"
              onSubmit={handleSubmit}
            >
              <motion.div variants={fadeUp}>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">
                  Email
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
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">
                  Password
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-green-500/30 focus-within:border-green-500 transition">
                  <Lock className="text-gray-400" size={17} />
                  <input
                    type="password"
                    name="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full ml-2.5 outline-none text-sm"
                  />
                </div>
              </motion.div>

              <motion.button
                variants={fadeUp}
                whileHover={{ scale: submitting ? 1 : 1.01 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                type="submit"
                disabled={submitting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? "Logging in..." : "Login"}
                {!submitting && <ArrowRight size={16} />}
              </motion.button>
            </motion.form>

            <div className="text-center mt-6 text-sm text-gray-600">
              <p>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-green-600 font-semibold cursor-pointer hover:underline"
                >
                  Register here
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Login;
