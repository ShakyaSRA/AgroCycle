import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, FileText, Pencil, X } from "lucide-react";
import DashboardLayout from "../Components/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { fadeUp, staggerContainer } from "../lib/motion";

function fieldsFromUser(user) {
  return {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    description: user?.description || "",
  };
}

function Profile() {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(fieldsFromUser(user));
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function startEditing() {
    setForm(fieldsFromUser(user));
    setEditing(true);
  }

  function cancelEditing() {
    setForm(fieldsFromUser(user));
    setEditing(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateProfile(form);
      showToast("Profile updated.");
      setEditing(false);
    } catch (err) {
      const errors = err.response?.data?.errors;
      const message = errors
        ? Object.values(errors)[0][0]
        : err.response?.data?.message || "Could not update profile.";
      showToast(message, "error");
    } finally {
      setSubmitting(false);
    }
  }

  if (!user) return null;

  const infoRows = [
    { icon: User, label: "Full Name", value: user.name },
    { icon: Mail, label: "Email", value: user.email },
    { icon: Phone, label: "Phone", value: user.phone || "Not provided" },
    { icon: MapPin, label: "Location", value: user.location || "Not provided" },
    {
      icon: FileText,
      label: "Description",
      value: user.description || "Not provided",
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
              My Profile
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              View and update your account information
            </p>
          </div>

          <span className="capitalize bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
            {user.role}
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-6">
          {editing ? (
            <motion.form
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
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

              <motion.div variants={fadeUp}>
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
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">
                  Description
                </label>
                <div className="flex items-start border border-gray-300 rounded-lg px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-green-500/30 focus-within:border-green-500 transition">
                  <FileText className="text-gray-400 mt-1" size={17} />
                  <textarea
                    name="description"
                    rows={3}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Tell others a little about yourself."
                    className="w-full ml-2.5 outline-none resize-none text-sm"
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="flex-1 border border-gray-300 rounded-lg py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <X size={15} />
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: submitting ? 1 : 1.01 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
                >
                  {submitting ? "Saving..." : "Save Changes"}
                </motion.button>
              </motion.div>
            </motion.form>
          ) : (
            <>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="space-y-5"
              >
                {infoRows.map(({ icon: Icon, label, value }) => (
                  <motion.div
                    key={label}
                    variants={fadeUp}
                    className="flex items-start gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <Icon className="text-gray-400 mt-0.5" size={17} />
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                        {label}
                      </p>
                      <p className="text-sm text-gray-900 mt-0.5">{value}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={startEditing}
                className="mt-6 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2.5 px-5 rounded-lg transition-colors flex items-center gap-2"
              >
                <Pencil size={15} />
                Edit Profile
              </motion.button>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
