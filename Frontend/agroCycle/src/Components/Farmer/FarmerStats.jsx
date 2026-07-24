import { Users, Box, DollarSign, TrendingUp } from "lucide-react";

import StatsCard from "../Admin/StatsCard";

function FarmerStats() {
  return (
    <div className="grid md:grid-cols-4 gap-6 mt-10">
      <StatsCard
        title="Active Listings"
        value="2"
        icon={<Box />}
        iconColor="bg-blue-500 text-white"
      />

      <StatsCard
        title="Total Requests"
        value="2"
        icon={<Users />}
        iconColor="bg-green-500 text-white"
      />

      <StatsCard
        title="Total Sales"
        value="₹25,000"
        icon={<DollarSign />}
        iconColor="bg-purple-500 text-white"
      />

      <StatsCard
        title="This Month"
        value="₹8,500"
        icon={<TrendingUp />}
        iconColor="bg-orange-500 text-white"
      />
    </div>
  );
}

export default FarmerStats;
