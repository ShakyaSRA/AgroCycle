import { useCallback, useEffect, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import MyListings from "../../Components/Farmer/MyListings";
import { getMyListings, deleteListing } from "../../api/listings";
import { useToast } from "../../context/ToastContext";

function FarmerListings() {
  const { showToast } = useToast();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    setLoading(true);
    getMyListings()
      .then(setListings)
      .catch(() => showToast("Could not load your listings.", "error"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleDeleteListing(id) {
    if (!window.confirm("Delete this listing? This cannot be undone.")) return;
    try {
      await deleteListing(id);
      showToast("Listing deleted.");
      loadData();
    } catch {
      showToast("Could not delete listing.", "error");
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          My Listings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage the waste listings you've posted
        </p>

        <MyListings
          listings={listings}
          loading={loading}
          onDelete={handleDeleteListing}
        />
      </div>
    </DashboardLayout>
  );
}

export default FarmerListings;
