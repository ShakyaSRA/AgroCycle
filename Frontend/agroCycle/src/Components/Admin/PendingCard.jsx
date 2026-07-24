import { motion } from "framer-motion";
import { Check, X, Eye } from "lucide-react";
import { fadeUp } from "../../lib/motion";

function PendingCard({ title, details, user, date, flagged, onApprove, onReject, onView }) {
  return (
    <motion.div
      variants={fadeUp}
      layout
      className={`rounded-2xl border p-5 ${
        flagged ? "border-red-300 bg-red-50" : "border-gray-200"
      }`}
    >
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-semibold">{title}</h3>

            {flagged && (
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded">
                Flagged
              </span>
            )}
          </div>

          <p className="text-gray-500 mt-2">{details}</p>
          <p className="mt-2 text-gray-700">Posted by: {user}</p>
        </div>

        <p className="text-gray-500">{date}</p>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onApprove}
          className="flex-1 bg-green-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-green-700"
        >
          <Check size={18} />
          Approve
        </button>

        <button
          onClick={onReject}
          className="flex-1 bg-red-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-red-700"
        >
          <X size={18} />
          Reject
        </button>

        {onView && (
          <button
            onClick={onView}
            className="px-4 border rounded-xl hover:bg-gray-50"
          >
            <Eye />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default PendingCard;
