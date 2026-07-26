import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motion";

function HowItworksCard({ icon, number, title, description }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -3 }}
      className="text-center"
    >
      <div className="relative w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto text-green-600 [&>svg]:w-6 [&>svg]:h-6">
        {icon}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
          {number}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mt-6">
        {title}
      </h3>

      <p className="text-gray-500 text-sm mt-2.5 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default HowItworksCard;
