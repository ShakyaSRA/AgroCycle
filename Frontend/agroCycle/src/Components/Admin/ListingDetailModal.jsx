import { motion } from "framer-motion";
import { X, MapPin, User, Package } from "lucide-react";
import { scaleIn } from "../../lib/motion";
import { API_URL } from "../../api/client";

function ListingDetailModal({ listing, onClose }) {
  const priceLabel =
    listing.price != null ? `LKR ${Number(listing.price).toLocaleString()}` : "Free";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="show"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl border border-gray-200 shadow-lg max-w-lg w-full p-6 max-h-[85vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{listing.category?.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {listing.images?.length > 0 && (
          <div className="flex gap-2.5 mt-4 overflow-x-auto">
            {listing.images.map((img) => (
              <img
                key={img.id}
                src={`${API_URL}/storage/${img.image_path}`}
                alt={listing.category?.name}
                className="w-24 h-24 object-cover rounded-lg shrink-0"
              />
            ))}
          </div>
        )}

        <p className="text-gray-500 text-sm mt-4 leading-relaxed">{listing.description}</p>

        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-gray-400" />
            {listing.quantity} {listing.unit} — {priceLabel}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400" />
            {listing.location}
          </div>
          <div className="flex items-center gap-2">
            <User size={16} className="text-gray-400" />
            {listing.farmer?.name} ({listing.farmer?.phone || "no phone on file"})
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ListingDetailModal;
