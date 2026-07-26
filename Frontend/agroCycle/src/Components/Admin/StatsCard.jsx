import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motion";

function StatsCard({ icon, title, value, growth, iconColor, onClick }) {
  const hasGrowth = growth !== undefined && growth !== null;

  return (
    <motion.div
      variants={fadeUp}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.02 } : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            }
          : undefined
      }
      className={`bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5 ${iconColor}`}
        >
          {icon}
        </div>

        {hasGrowth && (
          <span
            className={`text-sm font-semibold ${
              growth >= 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {growth >= 0 ? "+" : ""}
            {growth}%
          </span>
        )}
      </div>

      <p className="text-gray-500 text-sm mt-5">{title}</p>
      <h2 className="text-3xl font-semibold text-gray-900 mt-1">{value}</h2>
    </motion.div>
  );
}

export default StatsCard;
