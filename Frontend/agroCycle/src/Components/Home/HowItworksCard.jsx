import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motion";

function HowItworksCard({ icon, number, title, description }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className="text-center transition-transform duration-300"
    >
      <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-50 rounded-full flex items-center justify-center mx-auto text-green-600 hover:from-green-200 hover:to-emerald-100 transition duration-300 shadow-sm">
        {icon}
      </div>

      <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mt-6 shadow-md">
        {number}
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 hover:text-green-700 transition duration-300">
        {title}
      </h3>

      <p className="text-gray-600 mt-4 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default HowItworksCard;
