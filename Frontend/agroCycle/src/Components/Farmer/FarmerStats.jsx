import { motion } from "framer-motion";
import { Users, Box, DollarSign, TrendingUp } from "lucide-react";

import StatsCard from "../Admin/StatsCard";
import { staggerContainer } from "../../lib/motion";

function currency(amount) {
  return `LKR ${Number(amount || 0).toLocaleString()}`;
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function FarmerStats({ listings, requests }) {
  const activeListings = listings.filter((l) => l.status === "Approved").length;
  const totalRequests = requests.length;

  const soldListings = listings.filter((l) => l.status === "Sold");
  const totalSales = soldListings.reduce(
    (sum, l) => sum + Number(l.price || 0),
    0
  );

  const now = new Date();
  const thisMonthSales = soldListings
    .filter((l) => {
      const updated = new Date(l.updated_at);
      return (
        updated.getMonth() === now.getMonth() &&
        updated.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, l) => sum + Number(l.price || 0), 0);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid md:grid-cols-4 gap-6 mt-10"
    >
      <StatsCard
        title="Active Listings"
        value={activeListings}
        icon={<Box />}
        iconColor="bg-blue-500 text-white"
        onClick={() => scrollToId("my-listings")}
      />

      <StatsCard
        title="Total Requests"
        value={totalRequests}
        icon={<Users />}
        iconColor="bg-green-500 text-white"
        onClick={() => scrollToId("buyer-requests")}
      />

      <StatsCard
        title="Total Sales"
        value={currency(totalSales)}
        icon={<DollarSign />}
        iconColor="bg-purple-500 text-white"
        onClick={() => scrollToId("my-listings")}
      />

      <StatsCard
        title="This Month"
        value={currency(thisMonthSales)}
        icon={<TrendingUp />}
        iconColor="bg-orange-500 text-white"
        onClick={() => scrollToId("my-listings")}
      />
    </motion.div>
  );
}

export default FarmerStats;
