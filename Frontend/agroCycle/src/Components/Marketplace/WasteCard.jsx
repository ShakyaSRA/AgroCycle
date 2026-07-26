import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, User, Calendar, Send, ImageOff } from "lucide-react";
import { fadeUp } from "../../lib/motion";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { createBuyerRequest } from "../../api/buyerRequests";
import { API_URL } from "../../api/client";

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
      whileHover={{ y: -4 }}
      className="overflow-hidden border border-gray-200 shadow-sm rounded-2xl bg-white hover:shadow-md transition-shadow duration-300"
    >
      {listing.images?.length ? (
        <img
          src={`${API_URL}/storage/${listing.images[0].image_path}`}
          alt={listing.category?.name || "Waste listing"}
          className="w-full h-44 object-cover"
        />
      ) : (
        <div className="w-full h-44 bg-green-50 flex items-center justify-center">
          <ImageOff className="text-green-200" size={32} />
        </div>
      )}

      <div className="p-5">
        <div className="flex justify-between items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900">
            {listing.category?.name}
          </h3>

          <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
            {listing.quantity} {listing.unit}
          </div>
        </div>

        <p className="text-green-700 text-sm font-semibold mt-1.5">{priceLabel}</p>

        <p className="text-gray-500 text-sm mt-3 leading-relaxed">
          {listing.description}
        </p>

      <ul className="mt-5 space-y-2 text-sm text-gray-600">
        <li className="flex items-center gap-2.5">
          <MapPin size={15} className="text-gray-400" />
          {listing.location}
        </li>
        <li className="flex items-center gap-2.5">
          <User size={15} className="text-gray-400" />
          {listing.farmer?.name}
        </li>
        <li className="flex items-center gap-2.5">
          <Calendar size={15} className="text-gray-400" />
          {date}
        </li>
      </ul>

      {showForm ? (
        <div className="mt-5 space-y-2.5">
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a message for the farmer (optional)"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 resize-none"
          />
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 border border-gray-300 rounded-lg py-2 text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: sending ? 1 : 1.02 }}
              whileTap={{ scale: sending ? 1 : 0.98 }}
              type="button"
              onClick={handleSend}
              disabled={sending}
              className="flex-1 bg-green-600 text-white text-sm rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-green-700 disabled:opacity-60 transition-colors"
            >
              <Send size={15} />
              {sending ? "Sending..." : "Send"}
            </motion.button>
          </div>
        </div>
      ) : (
        <motion.button
          whileHover={{ scale: sent ? 1 : 1.02 }}
          whileTap={{ scale: sent ? 1 : 0.98 }}
          onClick={handleRequestClick}
          disabled={sent}
          className="mt-5 w-full bg-green-600 cursor-pointer text-white text-sm font-medium py-2.5 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-60"
        >
          {sent ? "Request Sent" : "Request Pickup"}
        </motion.button>
      )}
      </div>
    </motion.div>
  );
}

export default WasteCard;
