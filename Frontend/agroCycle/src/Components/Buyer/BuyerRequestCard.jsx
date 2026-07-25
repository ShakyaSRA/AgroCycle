import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, MessageSquare, CreditCard, Truck, CheckCircle2 } from "lucide-react";
import { fadeUp } from "../../lib/motion";
import Payment from "./Payment";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Accepted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

function BuyerRequestCard({ request, onPaymentComplete }) {
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const listing = request.listing;
  const priceLabel =
    listing?.price != null ? `LKR ${Number(listing.price).toLocaleString()}` : "Free";

  return (
    <motion.div variants={fadeUp} className="border rounded-2xl p-5">
      <div className="flex justify-between">
        <div>
          <h3 className="text-2xl font-semibold">{listing?.category?.name}</h3>
          <p className="text-gray-500">
            {listing?.quantity} {listing?.unit} — {priceLabel}
          </p>
          <p className="flex items-center gap-2 text-gray-500 mt-2">
            <MapPin size={16} />
            {listing?.location}
          </p>
          {request.message && (
            <p className="mt-3 text-gray-700">"{request.message}"</p>
          )}
        </div>

        <div className="text-right">
          <p className="text-gray-500">
            {new Date(request.created_at).toLocaleDateString()}
          </p>
          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${statusColors[request.status]}`}
          >
            {request.status}
          </span>
        </div>
      </div>

      {request.status === "Accepted" && (
        <div className="mt-4">
          {request.payment_status === "Paid" ? (
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-medium">
              <CheckCircle2 size={16} />
              Paid • Card •••• {request.card_last_four}
            </span>
          ) : request.payment_method === "cod" ? (
            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-medium">
              <Truck size={16} />
              Cash on Delivery
            </span>
          ) : (
            <button
              onClick={() => setShowPayment(true)}
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 flex items-center justify-center gap-2 font-semibold"
            >
              <CreditCard size={16} />
              Pay Now
            </button>
          )}
        </div>
      )}

      {listing?.farmer_id && (
        <button
          onClick={() => navigate(`/messages/${listing.farmer_id}`)}
          className="mt-4 w-full border border-green-600 text-green-700 py-3 rounded-xl hover:bg-green-50 flex items-center justify-center gap-2"
        >
          <MessageSquare size={16} />
          Message Farmer
        </button>
      )}

      <AnimatePresence>
        {showPayment && (
          <Payment
            request={request}
            onClose={() => setShowPayment(false)}
            onSuccess={onPaymentComplete}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default BuyerRequestCard;
