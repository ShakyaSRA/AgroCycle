import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ListChecks, Clock, CheckCircle2, XCircle } from "lucide-react";
import StatsCard from "../Admin/StatsCard";
import { staggerContainer } from "../../lib/motion";

function BuyerStats({ requests }) {
  const navigate = useNavigate();
  const total = requests.length;
  const pending = requests.filter((r) => r.status === "Pending").length;
  const accepted = requests.filter((r) => r.status === "Accepted").length;
  const rejected = requests.filter((r) => r.status === "Rejected").length;

  function handleClick(status) {
    navigate("/buyer/requests", { state: { statusFilter: status } });
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
        iconColor="bg-blue-50 text-blue-600"
        onClick={() => handleClick(null)}
      />
      <StatsCard
        title="Pending"
        value={pending}
        icon={<Clock />}
        iconColor="bg-yellow-50 text-yellow-600"
        onClick={() => handleClick("Pending")}
      />
      <StatsCard
        title="Accepted"
        value={accepted}
        icon={<CheckCircle2 />}
        iconColor="bg-green-50 text-green-600"
        onClick={() => handleClick("Accepted")}
      />
      <StatsCard
        title="Rejected"
        value={rejected}
        icon={<XCircle />}
        iconColor="bg-red-50 text-red-600"
        onClick={() => handleClick("Rejected")}
      />
    </motion.div>
  );
}

export default BuyerStats;
