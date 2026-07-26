import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motion";

function Choose({ icon, title, description }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -3 }}
      className="p-7 rounded-2xl w-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-green-600 [&>svg]:w-5 [&>svg]:h-5">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mt-6">
        {title}
      </h3>

      <p className="text-gray-500 text-sm mt-2.5 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default Choose;
