import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  MessageSquare,
  CreditCard,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { fadeUp } from "../../lib/motion";
import Payment from "../../Pages/Buyer/PaymentPage";

const statusColors = {
  Pending: "bg-yellow-50 text-yellow-700",
  Accepted: "bg-green-50 text-green-700",
  Rejected: "bg-red-50 text-red-700",
};

function BuyerRequestCard({ request, onPaymentComplete }) {
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const listing = request.listing;
  const priceLabel =
    listing?.price != null
      ? `LKR ${Number(listing.price).toLocaleString()}`
      : "Free";

  return (
    <motion.div
      variants={fadeUp}
      className="border border-gray-200 rounded-xl p-5"
    >
      <div className="flex justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {listing?.category?.name}
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            {listing?.quantity} {listing?.unit} — {priceLabel}
          </p>
          <p className="flex items-center gap-2 text-gray-500 text-sm mt-2">
            <MapPin size={15} />
            {listing?.location}
          </p>
          {request.message && (
            <p className="mt-3 text-sm text-gray-600">"{request.message}"</p>
          )}
        </div>

        <div className="text-right">
          <p className="text-gray-400 text-xs">
            {new Date(request.created_at).toLocaleDateString()}
          </p>
          <span
            className={`inline-block mt-2 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[request.status]}`}
          >
            {request.status}
          </span>
        </div>
      </div>

      {request.status === "Accepted" && (
        <div className="mt-4">
          {request.payment_status === "Paid" ? (
            <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
              <CheckCircle2 size={15} />
              Paid • Card •••• {request.card_last_four}
            </span>
          ) : request.payment_method === "cod" ? (
            <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
              <Truck size={15} />
              Cash on Delivery
            </span>
          ) : // Only show payment option when the listing has a price > 0
          listing?.price != null && Number(listing.price) > 0 ? (
            <button
              onClick={() => navigate(`/payment/${request.id}`)}
              className="w-full bg-green-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard size={15} />
              Pay Now
            </button>
          ) : null}
        </div>
      )}

      {listing?.farmer_id && (
        <button
          onClick={() => navigate(`/messages/${listing.farmer_id}`)}
          className="mt-4 w-full border border-green-600 text-green-700 text-sm font-medium py-2.5 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
        >
          <MessageSquare size={15} />
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
