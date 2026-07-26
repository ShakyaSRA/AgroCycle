import { useCallback, useEffect, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import BuyerRequests from "../../Components/Farmer/BuyerRequests";
import { getBuyerRequests, updateBuyerRequest } from "../../api/buyerRequests";
import { useToast } from "../../context/ToastContext";

function FarmerRequests() {
  const { showToast } = useToast();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    setLoading(true);
    getBuyerRequests()
      .then(setRequests)
      .catch(() => showToast("Could not load requests.", "error"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleRequestDecision(id, status) {
    try {
      await updateBuyerRequest(id, status);
      showToast(`Request ${status.toLowerCase()}.`);
      loadData();
    } catch {
      showToast("Could not update request.", "error");
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Buyer Requests
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Review and respond to pickup requests from buyers
        </p>

        <BuyerRequests
          requests={requests}
          loading={loading}
          onDecision={handleRequestDecision}
        />
      </div>
    </DashboardLayout>
  );
}

export default FarmerRequests;
