import { motion } from "framer-motion";
import { Check, X, Eye } from "lucide-react";
import { fadeUp } from "../../lib/motion";

function PendingCard({ title, details, user, date, flagged, onApprove, onReject, onView }) {
  return (
    <motion.div
      variants={fadeUp}
      layout
      className={`rounded-xl border p-5 ${
        flagged ? "border-red-200 bg-red-50" : "border-gray-200"
      }`}
    >
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>

            {flagged && (
              <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs font-medium">
                Flagged
              </span>
            )}
          </div>

          <p className="text-gray-500 text-sm mt-1.5">{details}</p>
          <p className="mt-1.5 text-sm text-gray-600">Posted by: {user}</p>
        </div>

        <p className="text-gray-400 text-xs">{date}</p>
      </div>

      <div className="flex gap-2.5 mt-5">
        <button
          onClick={onApprove}
          className="flex-1 bg-green-600 text-white text-sm font-medium py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-green-700 transition-colors"
        >
          <Check size={16} />
          Approve
        </button>

        <button
          onClick={onReject}
          className="flex-1 bg-red-600 text-white text-sm font-medium py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-red-700 transition-colors"
        >
          <X size={16} />
          Reject
        </button>

        {onView && (
          <button
            onClick={onView}
            className="px-3.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye size={17} />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default PendingCard;
