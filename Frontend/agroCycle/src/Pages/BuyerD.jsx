import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import BuyerStats from "../Components/Buyer/BuyerStats";
import BuyerRequestCard from "../Components/Buyer/BuyerRequestCard";
import { getBuyerRequests } from "../api/buyerRequests";
import { staggerContainer } from "../lib/motion";
import { useToast } from "../context/ToastContext";

function BuyerD() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(null);

  const loadData = useCallback(() => {
    setLoading(true);
    getBuyerRequests()
      .then(setRequests)
      .catch(() => showToast("Could not load your requests.", "error"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const visibleRequests = statusFilter
    ? requests.filter((r) => r.status === statusFilter)
    : requests;

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto p-10">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-5xl font-bold">Buyer Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Track your pickup requests and browse more waste materials
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/marketplace")}
              className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
            >
              Browse Marketplace
            </motion.button>
          </div>

          <BuyerStats requests={requests} onFilter={setStatusFilter} />

          <div id="my-requests" className="bg-white rounded-2xl shadow p-8 mt-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">My Requests</h2>

              {statusFilter && (
                <button
                  onClick={() => setStatusFilter(null)}
                  className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-100"
                >
                  Filtered: {statusFilter}
                  <X size={14} />
                </button>
              )}
            </div>

            {loading ? (
              <p className="text-gray-500">Loading requests...</p>
            ) : visibleRequests.length === 0 ? (
              <p className="text-gray-500">
                {statusFilter
                  ? `No ${statusFilter.toLowerCase()} requests.`
                  : "You haven't requested any waste materials yet."}
              </p>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="space-y-6"
              >
                {visibleRequests.map((request) => (
                  <BuyerRequestCard
                    key={request.id}
                    request={request}
                    onPaymentComplete={loadData}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default BuyerD;
