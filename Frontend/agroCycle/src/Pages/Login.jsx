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
          ? "/admin"
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

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-4xl grid lg:grid-cols-2 rounded-3xl shadow-2xl overflow-hidden bg-white">
          <div className="hidden lg:flex relative flex-col justify-between bg-gradient-to-br from-green-600 to-emerald-800 p-10 overflow-hidden">
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
                Welcome back to AgroCycle
              </h2>
              <p className="text-green-100 mt-4 leading-relaxed">
                Turning agricultural waste into value — connect with buyers,
                recyclers, and eco-friendly product makers.
              </p>
            </div>

            <div className="relative z-10 flex gap-6 text-green-100">
              <div className="flex items-center gap-2">
                <Leaf size={18} /> Eco-Friendly
              </div>
              <div className="flex items-center gap-2">
                <Recycle size={18} /> Circular Economy
              </div>
              <div className="flex items-center gap-2">
                <Sprout size={18} /> Sustainable
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="p-8 md:p-12 flex flex-col justify-center"
          >
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>

            <p className="text-gray-500 mt-2">Login to your account</p>

            <motion.form
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="mt-8 space-y-5"
              onSubmit={handleSubmit}
            >
              <motion.div variants={fadeUp}>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition">
                  <Mail className="text-gray-400" size={18} />
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
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition">
                  <Lock className="text-gray-400" size={18} />
                  <input
                    type="password"
                    name="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full ml-3 outline-none"
                  />
                </div>
              </motion.div>

              <motion.button
                variants={fadeUp}
                whileHover={{ scale: submitting ? 1 : 1.02, y: submitting ? 0 : -1 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2"
              >
                {submitting ? "Logging in..." : "Login"}
                {!submitting && <ArrowRight size={18} />}
              </motion.button>
            </motion.form>

            <div className="text-center mt-6 text-gray-600">
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
