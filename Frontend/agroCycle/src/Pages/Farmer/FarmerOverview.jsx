import { useEffect, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import FarmerStats from "../../Components/Farmer/FarmerStats";
import { getMyListings } from "../../api/listings";
import { getBuyerRequests } from "../../api/buyerRequests";
import { useToast } from "../../context/ToastContext";

function FarmerOverview() {
  const { showToast } = useToast();
  const [listings, setListings] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    Promise.all([getMyListings(), getBuyerRequests()])
      .then(([listingsData, requestsData]) => {
        setListings(listingsData);
        setRequests(requestsData);
      })
      .catch(() => showToast("Could not load dashboard data.", "error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Farmer Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your waste listings and track sales
        </p>

        <FarmerStats listings={listings} requests={requests} />
      </div>
    </DashboardLayout>
  );
}

export default FarmerOverview;
