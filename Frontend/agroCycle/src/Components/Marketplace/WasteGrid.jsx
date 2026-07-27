import { motion } from "framer-motion";
import WasteCard from "./WasteCard";
import { staggerContainer } from "../../lib/motion";

function WasteGrid({ listings, loading, onOpenDetail }) {
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto mt-10 py-10 text-center text-gray-500">
        Loading listings...
      </div>
    );
  }

  if (!listings || listings.length === 0) {
    return (
      <div className="max-w-7xl mx-auto mt-10 py-16 text-center text-gray-500">
        No waste listings match your search yet.
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto mt-10 grid md:grid-cols-3 gap-10 py-10"
    >
      {listings.map((listing) => (
        <WasteCard key={listing.id} listing={listing} onOpenDetail={onOpenDetail} />
      ))}
    </motion.div>
  );
}

export default WasteGrid;
