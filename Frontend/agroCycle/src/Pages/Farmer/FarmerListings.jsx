import { useCallback, useEffect, useMemo, useState } from "react";
import { Trash } from "lucide-react";
import DashboardLayout from "../../Components/DashboardLayout";
import MyListings from "../../Components/Farmer/MyListings";
import ConfirmDialog from "../../Components/ConfirmDialog";
import { getMyListings, deleteListing } from "../../api/listings";
import { useToast } from "../../context/ToastContext";

function FarmerListings() {
  const { showToast } = useToast();
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesStatus = statusFilter
        ? listing.status === statusFilter
        : true;
      const matchesSearch = search
        ? [
            listing.category?.name,
            listing.description,
            listing.location,
            listing.unit,
          ]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(search.toLowerCase()))
        : true;
      return matchesStatus && matchesSearch;
    });
  }, [listings, search, statusFilter]);

  function confirmDeleteListing(id) {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  }

  async function handleDeleteListing() {
    if (!deleteId) return;

    try {
      await deleteListing(deleteId);
      showToast("Listing deleted.");
      setDeleteDialogOpen(false);
      setDeleteId(null);
      loadData();
    } catch {
      showToast("Could not delete listing.", "error");
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
              My Listings
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage the waste listings you've posted
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-end w-full lg:w-auto">
            <div className="w-full sm:w-80">
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                Search listings
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by type, location, or description"
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition"
              />
            </div>

            <div className="w-full sm:w-64">
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
                <option value="Approved">Accepted</option>
                <option value="Sold">Sold</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <MyListings
          listings={filteredListings}
          loading={loading}
          onDelete={confirmDeleteListing}
        />

        <ConfirmDialog
          open={deleteDialogOpen}
          title="Delete listing"
          message="Are you sure you want to delete this listing? This cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          icon={Trash}
          confirmColor="red"
          onConfirm={handleDeleteListing}
          onCancel={() => {
            setDeleteDialogOpen(false);
            setDeleteId(null);
          }}
        />
      </div>
    </DashboardLayout>
  );
}

export default FarmerListings;
