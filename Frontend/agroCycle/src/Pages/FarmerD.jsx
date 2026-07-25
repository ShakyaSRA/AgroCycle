import { useCallback, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import FarmerStats from "../Components/Farmer/FarmerStats";
import MyListings from "../Components/Farmer/MyListings";
import BuyerRequests from "../Components/Farmer/BuyerRequests";
import { getMyListings, deleteListing } from "../api/listings";
import { getBuyerRequests, updateBuyerRequest } from "../api/buyerRequests";
import { useToast } from "../context/ToastContext";

function FarmerD() {
  const { showToast } = useToast();
  const [listings, setListings] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    setLoading(true);
    Promise.all([getMyListings(), getBuyerRequests()])
      .then(([listingsData, requestsData]) => {
        setListings(listingsData);
        setRequests(requestsData);
      })
      .catch(() => showToast("Could not load dashboard data.", "error"))
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
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto p-10">
          <h1 className="text-5xl font-bold">Farmer Dashboard</h1>

          <p className="text-gray-600 mt-2">
            Manage your waste listings and track sales
          </p>

          <FarmerStats listings={listings} requests={requests} />

          <div id="my-listings">
            <MyListings
              listings={listings}
              loading={loading}
              onDelete={handleDeleteListing}
            />
          </div>

          <div id="buyer-requests">
            <BuyerRequests
              requests={requests}
              loading={loading}
              onDecision={handleRequestDecision}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default FarmerD;
