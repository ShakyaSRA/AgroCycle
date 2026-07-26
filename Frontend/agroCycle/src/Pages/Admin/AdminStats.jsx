import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../Components/DashboardLayout";
import { Users, Box, DollarSign, AlertTriangle } from "lucide-react";
import StatsCard from "../../Components/Admin/StatsCard";
import UserGrowthChart from "../../Components/Admin/UserGrowthChart";
import RevenueChart from "../../Components/Admin/RevenueChart";
import { staggerContainer } from "../../lib/motion";
import { useToast } from "../../context/ToastContext";
import { getStats } from "../../api/admin";

function AdminStats() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch(() => showToast("Could not load admin stats.", "error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Stats & Analytics
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Platform-wide performance at a glance
        </p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-4 gap-4 mt-8"
        >
          <StatsCard
            title="Total Users"
            value={stats ? stats.total_users : "-"}
            growth={stats?.user_growth_percent}
            icon={<Users />}
            iconColor="bg-blue-50 text-blue-600"
            onClick={() => navigate("/admin/users")}
          />

          <StatsCard
            title="Active Listings"
            value={stats ? stats.active_listings : "-"}
            icon={<Box />}
            iconColor="bg-green-50 text-green-600"
            onClick={() => navigate("/marketplace")}
          />

          <StatsCard
            title="Revenue"
            value={stats ? `LKR ${Number(stats.revenue).toLocaleString()}` : "-"}
            growth={stats?.revenue_growth_percent}
            icon={<DollarSign />}
            iconColor="bg-purple-50 text-purple-600"
          />

          <StatsCard
            title="Pending Reviews"
            value={stats ? stats.pending_reviews : "-"}
            icon={<AlertTriangle />}
            iconColor="bg-orange-50 text-orange-600"
            onClick={() => navigate("/admin/requests")}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <UserGrowthChart data={stats?.user_growth_series} />
          <RevenueChart data={stats?.revenue_series} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminStats;
