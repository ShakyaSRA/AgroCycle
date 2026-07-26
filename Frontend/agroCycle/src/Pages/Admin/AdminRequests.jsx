import { useCallback, useEffect, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import PendingReviews from "../../Components/Admin/PendingReviews";
import { useToast } from "../../context/ToastContext";
import { getListings, updateListingStatus } from "../../api/listings";
import { getCategoryRequests, updateCategoryRequest } from "../../api/categories";
import { getAdminReuseIdeas, updateReuseIdea } from "../../api/reuseIdeas";

function AdminRequests() {
  const { showToast } = useToast();
  const [pendingListings, setPendingListings] = useState([]);
  const [pendingCategoryRequests, setPendingCategoryRequests] = useState([]);
  const [pendingReuseIdeas, setPendingReuseIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    setLoading(true);
    Promise.all([
      getListings({ status: "Pending" }),
      getCategoryRequests(),
      getAdminReuseIdeas(),
    ])
      .then(([listingsData, categoryRequestsData, reuseIdeasData]) => {
        setPendingListings(listingsData);
        setPendingCategoryRequests(
          categoryRequestsData.filter((r) => r.status === "Pending")
        );
        setPendingReuseIdeas(reuseIdeasData);
      })
      .catch(() => showToast("Could not load pending requests.", "error"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleListingDecision(id, status) {
    try {
      await updateListingStatus(id, status);
      showToast(`Listing ${status.toLowerCase()}.`);
      loadData();
    } catch {
      showToast("Could not update listing.", "error");
    }
  }

  async function handleCategoryRequestDecision(id, status) {
    try {
      await updateCategoryRequest(id, { status });
      showToast(`Category request ${status.toLowerCase()}.`);
      loadData();
    } catch {
      showToast("Could not update category request.", "error");
    }
  }

  async function handleReuseIdeaDecision(id, status, icon) {
    try {
      await updateReuseIdea(id, { status, ...(icon ? { icon } : {}) });
      showToast(`Reuse idea ${status.toLowerCase()}.`);
      loadData();
    } catch {
      showToast("Could not update reuse idea.", "error");
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Requests
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Review pending listings, category requests, and reuse ideas
        </p>

        <PendingReviews
          listings={pendingListings}
          categoryRequests={pendingCategoryRequests}
          reuseIdeas={pendingReuseIdeas}
          loading={loading}
          onListingDecision={handleListingDecision}
          onCategoryRequestDecision={handleCategoryRequestDecision}
          onReuseIdeaDecision={handleReuseIdeaDecision}
        />
      </div>
    </DashboardLayout>
  );
}

export default AdminRequests;
