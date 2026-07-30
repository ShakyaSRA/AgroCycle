import { useCallback, useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import BuyerRequests from "../../Components/Farmer/BuyerRequests";
import { getBuyerRequests, updateBuyerRequest } from "../../api/buyerRequests";
import { useToast } from "../../context/ToastContext";

function FarmerRequests() {
  const { showToast } = useToast();
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
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

  const visibleRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesStatus = statusFilter
        ? request.status === statusFilter
        : true;
      const matchesSearch = search
        ? [
            request.buyer?.name,
            request.listing?.category?.name,
            request.listing?.description,
            request.listing?.location,
            request.message,
          ]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(search.toLowerCase()))
        : true;
      return matchesStatus && matchesSearch;
    });
  }, [requests, search, statusFilter]);

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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
              Buyer Requests
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Review and respond to pickup requests from buyers
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:items-end w-full sm:w-auto">
            <div className="w-full sm:w-80">
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                Search requests
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by buyer, category, location, or message"
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition"
              />
            </div>

            <div className="w-full sm:w-60">
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                Filter by status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 bg-white text-sm text-gray-700 cursor-pointer focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition"
              >
                <option value="">All statuses</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <BuyerRequests
          requests={visibleRequests}
          loading={loading}
          onDecision={handleRequestDecision}
        />
      </div>
    </DashboardLayout>
  );
}

export default FarmerRequests;
