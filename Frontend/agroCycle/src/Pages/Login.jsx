import { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import Navbar from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

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

      <div className="min-h-screen bg-green-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md "
        >
          <div className="flex items-center justify-center gap-3 mb-8 ">
            <img src={logo} alt="logo" className="w-14 h-14 object-contain" />
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-900">
            Welcome Back
          </h2>

          <p className="text-gray-500 text-center mt-2">
            Login to your account
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
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
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <motion.button
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
              type="submit"
              disabled={submitting}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition duration-300"
            >
              {submitting ? "Logging in..." : "Login"}
            </motion.button>
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
        </motion.div>
      </div>
    </>
  );
}

export default Login;
