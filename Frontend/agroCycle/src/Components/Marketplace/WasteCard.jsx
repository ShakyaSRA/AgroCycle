import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, User, Calendar, Send } from "lucide-react";
import { fadeUp } from "../../lib/motion";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { createBuyerRequest } from "../../api/buyerRequests";

function WasteCard({ listing }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const priceLabel =
    listing.price != null && listing.price !== ""
      ? `LKR ${Number(listing.price).toLocaleString()}`
      : "Free";

  const date = new Date(listing.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  function handleRequestClick() {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role !== "buyer") {
      showToast("Only buyers can request pickup.", "error");
      return;
    }
    setShowForm(true);
  }

  async function handleSend() {
    setSending(true);
    try {
      await createBuyerRequest({ listing_id: listing.id, message });
      setSent(true);
      setShowForm(false);
      showToast("Pickup request sent to the farmer.");
    } catch (err) {
      showToast(
        err.response?.data?.message || "Could not send request.",
        "error"
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <motion.div
      variants={fadeUp}
      className="border border-green-100 border-t-4 border-t-green-600 shadow-md p-6 rounded-2xl bg-white hover:shadow-xl transition duration-300"
    >
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-2xl font-bold text-gray-900 hover:text-green-700 transition duration-300">
          {listing.category?.name}
        </h3>

        <div className="mt-4 inline-block bg-green-100 text-green-600 px-4 py-1 rounded-full font-medium whitespace-nowrap">
          {listing.quantity} {listing.unit}
        </div>
      </div>

      <p className="text-green-700 font-semibold mt-2">{priceLabel}</p>

      <p className="text-gray-600 mt-4 leading-relaxed">
        {listing.description}
      </p>

      <ul className="mt-6 space-y-3 text-gray-700">
        <li className="flex items-center gap-3">
          <MapPin size={16} className="text-gray-400" />
          {listing.location}
        </li>
        <li className="flex items-center gap-3">
          <User size={16} className="text-gray-400" />
          {listing.farmer?.name}
        </li>
        <li className="flex items-center gap-3">
          <Calendar size={16} className="text-gray-400" />
          {date}
        </li>
      </ul>

      {showForm ? (
        <div className="mt-6 space-y-3">
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a message for the farmer (optional)"
            className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 border rounded-xl py-2 hover:bg-gray-50"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: sending ? 1 : 1.03 }}
              whileTap={{ scale: sending ? 1 : 0.97 }}
              type="button"
              onClick={handleSend}
              disabled={sending}
              className="flex-1 bg-green-600 text-white rounded-xl py-2 flex items-center justify-center gap-2 hover:bg-green-700 disabled:opacity-60"
            >
              <Send size={16} />
              {sending ? "Sending..." : "Send"}
            </motion.button>
          </div>
        </div>
      ) : (
        <motion.button
          whileHover={{ scale: sent ? 1 : 1.03 }}
          whileTap={{ scale: sent ? 1 : 0.97 }}
          onClick={handleRequestClick}
          disabled={sent}
          className="mt-6 w-full bg-green-600 cursor-pointer text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-700 hover:text-white transition duration-300 disabled:opacity-60"
        >
          {sent ? "Request Sent" : "Request Pickup"}
        </motion.button>
      )}
    </motion.div>
  );
}

export default WasteCard;
