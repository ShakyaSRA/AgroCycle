import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../Components/DashboardLayout";
import BuyerStats from "../../Components/Buyer/BuyerStats";
import { getBuyerRequests } from "../../api/buyerRequests";
import { useToast } from "../../context/ToastContext";

function BuyerOverview() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getBuyerRequests()
      .then(setRequests)
      .catch(() => showToast("Could not load your requests.", "error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
              Buyer Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Track your pickup requests and browse more waste materials
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/marketplace")}
            className="bg-green-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
          >
            Browse Marketplace
          </motion.button>
        </div>

        <BuyerStats requests={requests} />
      </div>
    </DashboardLayout>
  );
}

export default BuyerOverview;
