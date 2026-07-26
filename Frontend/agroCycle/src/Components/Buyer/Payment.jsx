import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Truck, X, Lock } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { payForRequest } from "../../api/buyerRequests";

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 19);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function Payment({ request, onClose, onSuccess }) {
  const { showToast } = useToast();
  const [method, setMethod] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [card, setCard] = useState({
    card_number: "",
    card_name: "",
    card_expiry: "",
    cvv: "",
  });

  const listing = request.listing;
  const priceLabel =
    listing?.price != null ? `LKR ${Number(listing.price).toLocaleString()}` : "Free";

  async function submitPayment(payload) {
    setSubmitting(true);
    try {
      await payForRequest(request.id, payload);
      showToast(
        payload.payment_method === "card"
          ? "Payment successful."
          : "Cash on Delivery confirmed."
      );
      onSuccess?.();
      onClose?.();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Payment could not be completed.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleCardSubmit(e) {
    e.preventDefault();
    const digits = card.card_number.replace(/\s/g, "");
    if (digits.length < 13 || digits.length > 19) {
      showToast("Enter a valid card number.", "error");
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(card.card_expiry)) {
      showToast("Enter expiry as MM/YY.", "error");
      return;
    }
    if (card.cvv.length < 3 || card.cvv.length > 4) {
      showToast("Enter a valid CVV.", "error");
      return;
    }
    if (!card.card_name.trim()) {
      showToast("Enter the name on the card.", "error");
      return;
    }

    submitPayment({
      payment_method: "card",
      card_number: digits,
      card_name: card.card_name,
      card_expiry: card.card_expiry,
      cvv: card.cvv,
    });
  }

  function handleCod() {
    submitPayment({ payment_method: "cod" });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl border border-gray-200 shadow-lg w-full max-w-md p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        <h2 className="text-lg font-semibold text-gray-900">Complete Payment</h2>
        <p className="text-gray-500 text-sm mt-1">
          {listing?.category?.name} — {priceLabel}
        </p>

        {!method && (
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => setMethod("card")}
              className="border border-gray-200 rounded-xl p-5 hover:border-green-500 hover:bg-green-50/40 transition-colors flex flex-col items-center gap-2.5"
            >
              <CreditCard size={26} className="text-green-600" />
              <span className="text-sm font-semibold text-gray-900">Card</span>
              <span className="text-xs text-gray-500">Visa / Debit</span>
            </button>

            <button
              onClick={() => setMethod("cod")}
              className="border border-gray-200 rounded-xl p-5 hover:border-green-500 hover:bg-green-50/40 transition-colors flex flex-col items-center gap-2.5"
            >
              <Truck size={26} className="text-green-600" />
              <span className="text-sm font-semibold text-gray-900">Cash on Delivery</span>
              <span className="text-xs text-gray-500">Pay when it arrives</span>
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {method === "card" && (
            <motion.form
              key="card-form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleCardSubmit}
              className="mt-6 space-y-3 overflow-hidden"
            >
              <input
                type="text"
                required
                placeholder="Card Number"
                value={card.card_number}
                onChange={(e) =>
                  setCard({ ...card, card_number: formatCardNumber(e.target.value) })
                }
                maxLength={23}
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
              />
              <input
                type="text"
                required
                placeholder="Name on Card"
                value={card.card_name}
                onChange={(e) => setCard({ ...card, card_name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  value={card.card_expiry}
                  onChange={(e) =>
                    setCard({ ...card, card_expiry: formatExpiry(e.target.value) })
                  }
                  maxLength={5}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
                />
                <input
                  type="password"
                  required
                  placeholder="CVV"
                  value={card.cvv}
                  onChange={(e) =>
                    setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })
                  }
                  maxLength={4}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
                />
              </div>

              <p className="flex items-center gap-2 text-xs text-gray-400">
                <Lock size={12} />
                Simulated payment for demo purposes — no real charge is made.
              </p>

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setMethod(null)}
                  className="flex-1 border border-gray-300 rounded-lg py-2.5 text-sm hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-green-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-green-700 disabled:opacity-60 transition-colors"
                >
                  {submitting ? "Processing..." : `Pay ${priceLabel}`}
                </button>
              </div>
            </motion.form>
          )}

          {method === "cod" && (
            <motion.div
              key="cod-confirm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 space-y-4 overflow-hidden"
            >
              <p className="text-gray-600 text-sm">
                You'll pay <span className="font-semibold">{priceLabel}</span> in
                cash directly to the farmer when the waste is delivered/picked
                up.
              </p>
              <div className="flex gap-2.5">
                <button
                  onClick={() => setMethod(null)}
                  className="flex-1 border border-gray-300 rounded-lg py-2.5 text-sm hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleCod}
                  disabled={submitting}
                  className="flex-1 bg-green-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-green-700 disabled:opacity-60 transition-colors"
                >
                  {submitting ? "Confirming..." : "Confirm Cash on Delivery"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default Payment;
