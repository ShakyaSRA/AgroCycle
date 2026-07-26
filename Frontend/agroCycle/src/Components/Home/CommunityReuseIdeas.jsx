import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lightbulb, Plus, Minus, Send } from "lucide-react";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { getReuseIcon } from "../../lib/reuseIcons";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { getReuseIdeas, createReuseIdea } from "../../api/reuseIdeas";

const MIN_ITEMS = 2;
const MAX_ITEMS = 4;

function CommunityReuseIdeas() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [items, setItems] = useState(["", ""]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getReuseIdeas()
      .then(setIdeas)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function handleShareClick() {
    if (!user) {
      navigate("/login");
      return;
    }
    setShowForm((prev) => !prev);
  }

  function updateItem(index, value) {
    setItems((prev) => prev.map((it, i) => (i === index ? value : it)));
  }

  function addItem() {
    if (items.length < MAX_ITEMS) setItems((prev) => [...prev, ""]);
  }

  function removeItem(index) {
    if (items.length > MIN_ITEMS) {
      setItems((prev) => prev.filter((_, i) => i !== index));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const cleanItems = items.map((it) => it.trim()).filter(Boolean);
    if (cleanItems.length < MIN_ITEMS) {
      showToast(`Add at least ${MIN_ITEMS} reuse ideas.`, "error");
      return;
    }

    setSubmitting(true);
    try {
      await createReuseIdea({ title, items: cleanItems });
      showToast("Idea submitted — pending admin approval.");
      setTitle("");
      setItems(["", ""]);
      setShowForm(false);
    } catch (err) {
      showToast(
        err.response?.data?.message || "Could not submit idea.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="py-24 px-6 bg-gray-50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="bg-amber-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Lightbulb size={22} className="text-amber-600" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Community Reuse Ideas
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl text-sm">
            Ideas shared by farmers and buyers like you, reviewed and
            approved by our team.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShareClick}
            className="mt-7 bg-green-600 text-white text-sm font-medium py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
          >
            <Plus size={16} />
            Share Your Idea
          </motion.button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSubmit}
              className="max-w-xl mx-auto mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 overflow-hidden"
            >
              <input
                type="text"
                required
                maxLength={150}
                placeholder="Idea title (e.g. Rice Husk)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />

              <div className="space-y-3">
                <label className="block text-gray-600 text-sm font-medium">
                  What can it be reused for? (2–4 ideas)
                </label>
                {items.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      maxLength={100}
                      placeholder={`Reuse idea ${index + 1}`}
                      value={item}
                      onChange={(e) => updateItem(index, e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {items.length > MIN_ITEMS && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="shrink-0 w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                      >
                        <Minus size={16} />
                      </button>
                    )}
                  </div>
                ))}

                {items.length < MAX_ITEMS && (
                  <button
                    type="button"
                    onClick={addItem}
                    className="flex items-center gap-2 text-green-700 font-medium hover:underline"
                  >
                    <Plus size={16} />
                    Add another idea
                  </button>
                )}
              </div>

              <motion.button
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                type="submit"
                disabled={submitting}
                className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-green-700 disabled:opacity-60"
              >
                <Send size={16} />
                {submitting ? "Submitting..." : "Submit for Review"}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {!loading && ideas.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-14 grid md:grid-cols-3 gap-6"
          >
            {ideas.map((idea) => {
              const Icon = getReuseIcon(idea.icon);
              return (
                <motion.div
                  key={idea.id}
                  variants={fadeUp}
                  className="bg-white border border-gray-200 shadow-sm p-6 rounded-2xl hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center mx-auto text-green-600">
                    <Icon size={20} />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mt-5 text-center">
                    {idea.title}
                  </h3>

                  <ul className="mt-4 space-y-2 text-sm text-gray-600">
                    {(idea.items || []).map((item, i) => (
                      <li
                        key={i}
                        className="bg-gray-50 rounded-lg p-2.5 flex items-center gap-2.5"
                      >
                        <div className="h-1.5 w-1.5 bg-green-500 rounded-full shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="text-gray-400 text-xs mt-4 text-center">
                    Shared by {idea.user?.name || "an AgroCycle user"}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {!loading && ideas.length === 0 && !showForm && (
          <p className="text-center text-gray-500 mt-12">
            No community ideas yet — be the first to share one!
          </p>
        )}
      </div>
    </section>
  );
}

export default CommunityReuseIdeas;
