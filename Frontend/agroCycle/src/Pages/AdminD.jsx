import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import { Users, Box, DollarSign, AlertTriangle } from "lucide-react";
import StatsCard from "../Components/Admin/StatsCard";
import UserGrowthChart from "../Components/Admin/UserGrowthChart";
import RevenueChart from "../Components/Admin/RevenueChart";
import PendingReviews from "../Components/Admin/PendingReviews";
import UserManagement from "../Components/Admin/UserManagement";

function AdminD() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7l mx-auto p-10">
          <h1 className="text-5xl font-bold">Admin Dashboard</h1>

          <p className="text-gray-600 mt-2">
            Manage users, listings, and platform analytics
          </p>

          <div className="grid md:grid-cols-4 gap-6 mt-10">
            <StatsCard
              title="Total Users"
              value="1,247"
              growth="12"
              icon={<Users />}
              iconColor="bg-blue-500 text-white"
            />

            <StatsCard
              title="Active Listings"
              value="385"
              growth="24"
              icon={<Box />}
              iconColor="bg-green-500 text-white"
            />

            <StatsCard
              title="Revenue"
              value="₹28L"
              growth="27"
              icon={<DollarSign />}
              iconColor="bg-purple-500 text-white"
            />

            <StatsCard
              title="Pending Reviews"
              value="2"
              growth="3"
              icon={<AlertTriangle />}
              iconColor="bg-orange-500 text-white"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <UserGrowthChart />

            <RevenueChart />
          </div>
          <PendingReviews />
          <UserManagement />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AdminD;
