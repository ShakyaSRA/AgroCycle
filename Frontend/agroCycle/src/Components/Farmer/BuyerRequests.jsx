import { motion } from "framer-motion";
import RequestCard from "./RequestCard";
import { staggerContainer } from "../../lib/motion";

function BuyerRequests({ requests, loading, onDecision }) {
  return (
    <div className="bg-white rounded-2xl shadow p-8 mt-10">
      <h2 className="text-3xl font-bold mb-8">Recent Buyer Requests</h2>

      {loading ? (
        <p className="text-gray-500">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-gray-500">No buyer requests yet.</p>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onAccept={() => onDecision(request.id, "Accepted")}
              onReject={() => onDecision(request.id, "Rejected")}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default BuyerRequests;
