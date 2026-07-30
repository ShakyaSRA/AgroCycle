import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CreditCard, Lock, ShieldCheck, Truck } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { getBuyerRequest, payForRequest } from "../../api/buyerRequests";

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 19);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function PaymentPage() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [request, setRequest] = useState(null);
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [card, setCard] = useState({
    card_number: "",
    card_name: "",
    card_expiry: "",
    cvv: "",
  });

  useEffect(() => {
    getBuyerRequest(requestId)
      .then(setRequest)
      .catch((err) => {
        console.error("getBuyerRequest error:", err);
        showToast(
          err?.response?.data?.message || "Could not load payment details.",
          "error",
        );
        navigate("/buyer");
      })
      .finally(() => setLoading(false));
  }, [requestId, navigate, showToast]);

  async function submitPayment(payload) {
    setSubmitting(true);

    try {
      await payForRequest(requestId, payload);

      showToast(
        payload.payment_method === "card"
          ? "Payment completed successfully."
          : "Cash on Delivery confirmed.",
      );

      navigate("/buyer/requests");
    } catch (err) {
      showToast(
        err.response?.data?.message || "Payment could not be completed.",
        "error",
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
    submitPayment({
      payment_method: "cod",
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Loading payment details...</p>
      </div>
    );
  }

  if (!request) {
    return null;
  }

  const listing = request.listing;

  const price = listing?.price != null ? Number(listing.price) : 0;

  const priceLabel =
    listing?.price != null ? `LKR ${price.toLocaleString()}` : "Free";

  if (price === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Lock size={15} />
              Secure checkout
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-10">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h1 className="text-xl font-semibold text-gray-900">
              No payment required
            </h1>
            <p className="mt-3 text-sm text-gray-500">
              This listing is free — no payment is necessary.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate("/buyer/requests")}
                className="rounded-lg bg-green-600 text-white px-4 py-2 text-sm font-medium hover:bg-green-700"
              >
                Back to requests
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Lock size={15} />
            Secure checkout
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Complete your payment
          </h1>

          <p className="mt-2 text-gray-500">
            Review the listing and select your preferred payment method.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Payment section */}
          <section className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Payment method
              </h2>

              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setMethod("card")}
                  className={`rounded-xl border p-4 text-left transition ${
                    method === "card"
                      ? "border-green-600 bg-green-50 ring-1 ring-green-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-green-100 p-2.5">
                      <CreditCard size={21} className="text-green-700" />
                    </div>

                    <div>
                      <p className="font-medium text-gray-900">
                        Credit or debit card
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Visa, Mastercard or debit card
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod("cod")}
                  className={`rounded-xl border p-4 text-left transition ${
                    method === "cod"
                      ? "border-green-600 bg-green-50 ring-1 ring-green-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-green-100 p-2.5">
                      <Truck size={21} className="text-green-700" />
                    </div>

                    <div>
                      <p className="font-medium text-gray-900">
                        Cash on Delivery
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Pay during delivery or pickup
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {method === "card" && (
              <form
                onSubmit={handleCardSubmit}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Card details
                  </h2>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <ShieldCheck size={16} />
                    Protected
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Card number
                    </label>

                    <div className="relative mt-2">
                      <CreditCard
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="text"
                        required
                        value={card.card_number}
                        onChange={(e) =>
                          setCard({
                            ...card,
                            card_number: formatCardNumber(e.target.value),
                          })
                        }
                        maxLength={23}
                        placeholder="1234 5678 9012 3456"
                        className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Name on card
                    </label>

                    <input
                      type="text"
                      required
                      value={card.card_name}
                      onChange={(e) =>
                        setCard({
                          ...card,
                          card_name: e.target.value,
                        })
                      }
                      placeholder="Name shown on the card"
                      className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Expiry date
                      </label>

                      <input
                        type="text"
                        required
                        value={card.card_expiry}
                        onChange={(e) =>
                          setCard({
                            ...card,
                            card_expiry: formatExpiry(e.target.value),
                          })
                        }
                        maxLength={5}
                        placeholder="MM/YY"
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        CVV
                      </label>

                      <input
                        type="password"
                        required
                        value={card.cvv}
                        onChange={(e) =>
                          setCard({
                            ...card,
                            cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                          })
                        }
                        maxLength={4}
                        placeholder="123"
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                      />
                    </div>
                  </div>

                  <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                    <p className="flex items-start gap-2 text-xs leading-5 text-amber-700">
                      <Lock size={14} className="mt-0.5 shrink-0" />
                      This is a simulated payment for demonstration purposes. No
                      real payment is processed.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-lg bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
                  >
                    {submitting ? "Processing payment..." : `Pay ${priceLabel}`}
                  </button>
                </div>
              </form>
            )}

            {method === "cod" && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">
                  Cash on Delivery
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  You will pay{" "}
                  <span className="font-semibold text-gray-900">
                    {priceLabel}
                  </span>{" "}
                  directly to the farmer when the agricultural waste is
                  delivered or collected.
                </p>

                <button
                  type="button"
                  onClick={handleCod}
                  disabled={submitting}
                  className="mt-6 w-full rounded-lg bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
                >
                  {submitting ? "Confirming..." : "Confirm Cash on Delivery"}
                </button>
              </div>
            )}
          </section>

          {/* Order summary */}
          <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Order summary
            </h2>

            <div className="mt-5 border-b border-gray-200 pb-5">
              <p className="text-sm font-medium text-gray-900">
                {listing?.category?.name || "Waste listing"}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {listing?.quantity} {listing?.unit}
              </p>

              <p className="mt-1 text-sm text-gray-500">{listing?.location}</p>
            </div>

            <div className="space-y-3 border-b border-gray-200 py-5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Listing price</span>
                <span className="font-medium text-gray-900">{priceLabel}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Service fee</span>
                <span className="font-medium text-gray-900">LKR 0</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-5">
              <span className="font-semibold text-gray-900">Total</span>

              <span className="text-xl font-semibold text-green-700">
                {priceLabel}
              </span>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default PaymentPage;
