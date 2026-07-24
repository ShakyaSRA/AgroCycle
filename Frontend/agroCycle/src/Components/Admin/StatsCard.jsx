import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motion";

function StatsCard({ icon, title, value, growth, iconColor }) {
  const hasGrowth = growth !== undefined && growth !== null;

  return (
    <motion.div
      variants={fadeUp}
      className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
    >
      <div className="flex justify-between">
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ${iconColor}`}
        >
          {icon}
        </div>

        {hasGrowth && (
          <span
            className={`font-semibold ${
              growth >= 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {growth >= 0 ? "+" : ""}
            {growth}%
          </span>
        )}
      </div>

      <p className="text-gray-500 mt-6">{title}</p>
      <h2 className="text-4xl font-bold">{value}</h2>
    </motion.div>
  );
}

export default StatsCard;
