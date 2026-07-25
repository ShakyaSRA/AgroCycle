import { motion } from "framer-motion";
import { ListChecks, Clock, CheckCircle2, XCircle } from "lucide-react";
import StatsCard from "../Admin/StatsCard";
import { staggerContainer } from "../../lib/motion";

function scrollToRequests() {
  document.getElementById("my-requests")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function BuyerStats({ requests, onFilter }) {
  const total = requests.length;
  const pending = requests.filter((r) => r.status === "Pending").length;
  const accepted = requests.filter((r) => r.status === "Accepted").length;
  const rejected = requests.filter((r) => r.status === "Rejected").length;

  function handleClick(status) {
    onFilter?.(status);
    scrollToRequests();
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid md:grid-cols-4 gap-6 mt-10"
    >
      <StatsCard
        title="Total Requests"
        value={total}
        icon={<ListChecks />}
        iconColor="bg-blue-500 text-white"
        onClick={() => handleClick(null)}
      />
      <StatsCard
        title="Pending"
        value={pending}
        icon={<Clock />}
        iconColor="bg-yellow-500 text-white"
        onClick={() => handleClick("Pending")}
      />
      <StatsCard
        title="Accepted"
        value={accepted}
        icon={<CheckCircle2 />}
        iconColor="bg-green-500 text-white"
        onClick={() => handleClick("Accepted")}
      />
      <StatsCard
        title="Rejected"
        value={rejected}
        icon={<XCircle />}
        iconColor="bg-red-500 text-white"
        onClick={() => handleClick("Rejected")}
      />
    </motion.div>
  );
}

export default BuyerStats;
