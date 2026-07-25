import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import { Users, Box, DollarSign, AlertTriangle } from "lucide-react";
import StatsCard from "../Components/Admin/StatsCard";
import UserGrowthChart from "../Components/Admin/UserGrowthChart";
import RevenueChart from "../Components/Admin/RevenueChart";
import PendingReviews from "../Components/Admin/PendingReviews";
import UserManagement from "../Components/Admin/UserManagement";
import { staggerContainer } from "../lib/motion";
import { useToast } from "../context/ToastContext";

import { getStats, getUsers, toggleUserStatus, deleteUser } from "../api/admin";
import { getListings, updateListingStatus } from "../api/listings";
import { getCategoryRequests, updateCategoryRequest } from "../api/categories";
import { getAdminReuseIdeas, updateReuseIdea } from "../api/reuseIdeas";

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function AdminD() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [pendingListings, setPendingListings] = useState([]);
  const [pendingCategoryRequests, setPendingCategoryRequests] = useState([]);
  const [pendingReuseIdeas, setPendingReuseIdeas] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    setLoading(true);
    Promise.all([
      getStats(),
      getListings({ status: "Pending" }),
      getCategoryRequests(),
      getUsers(),
      getAdminReuseIdeas(),
    ])
      .then(([statsData, listingsData, categoryRequestsData, usersData, reuseIdeasData]) => {
        setStats(statsData);
        setPendingListings(listingsData);
        setPendingCategoryRequests(
          categoryRequestsData.filter((r) => r.status === "Pending")
        );
        setUsers(usersData);
        setPendingReuseIdeas(reuseIdeasData);
      })
      .catch(() => showToast("Could not load admin dashboard data.", "error"))
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

  async function handleToggleStatus(id) {
    try {
      await toggleUserStatus(id);
      showToast("User status updated.");
      loadData();
    } catch {
      showToast("Could not update user status.", "error");
    }
  }

  async function handleDeleteUser(id) {
    if (!window.confirm("Delete this user? This cannot be undone.")) return;
    try {
      await deleteUser(id);
      showToast("User deleted.");
      loadData();
    } catch {
      showToast("Could not delete user.", "error");
    }
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto p-10">
          <h1 className="text-5xl font-bold">Admin Dashboard</h1>

          <p className="text-gray-600 mt-2">
            Manage users, listings, and platform analytics
          </p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-4 gap-6 mt-10"
          >
            <StatsCard
              title="Total Users"
              value={stats ? stats.total_users : "-"}
              growth={stats?.user_growth_percent}
              icon={<Users />}
              iconColor="bg-blue-500 text-white"
              onClick={() => scrollToId("user-management")}
            />

            <StatsCard
              title="Active Listings"
              value={stats ? stats.active_listings : "-"}
              icon={<Box />}
              iconColor="bg-green-500 text-white"
              onClick={() => navigate("/marketplace")}
            />

            <StatsCard
              title="Revenue"
              value={stats ? `LKR ${Number(stats.revenue).toLocaleString()}` : "-"}
              growth={stats?.revenue_growth_percent}
              icon={<DollarSign />}
              iconColor="bg-purple-500 text-white"
              onClick={() => scrollToId("revenue-chart")}
            />

            <StatsCard
              title="Pending Reviews"
              value={stats ? stats.pending_reviews : "-"}
              icon={<AlertTriangle />}
              iconColor="bg-orange-500 text-white"
              onClick={() => scrollToId("pending-reviews")}
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <UserGrowthChart data={stats?.user_growth_series} />
            <div id="revenue-chart">
              <RevenueChart data={stats?.revenue_series} />
            </div>
          </div>

          <div id="pending-reviews">
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

          <div id="user-management">
            <UserManagement
              users={users}
              loading={loading}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDeleteUser}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AdminD;
