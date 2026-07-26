import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import DashboardLayout from "../../Components/DashboardLayout";
import BuyerRequestCard from "../../Components/Buyer/BuyerRequestCard";
import { getBuyerRequests } from "../../api/buyerRequests";
import { staggerContainer } from "../../lib/motion";
import { useToast } from "../../context/ToastContext";

function BuyerRequestsPage() {
  const { showToast } = useToast();
  const location = useLocation();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(
    location.state?.statusFilter ?? null
  );

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
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          My Requests
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          All your pickup requests in one place
        </p>

        <div
          id="my-requests"
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Requests</h2>

            {statusFilter && (
              <button
                onClick={() => setStatusFilter(null)}
                className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-green-100"
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
    </DashboardLayout>
  );
}

export default BuyerRequestsPage;
