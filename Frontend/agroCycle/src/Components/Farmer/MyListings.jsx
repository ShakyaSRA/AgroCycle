import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ListingRow from "./ListingRow";
import { staggerContainer } from "../../lib/motion";

function MyListings({ listings, loading, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">My Listings</h2>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/addwaste")}
          className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          + Add New
        </motion.button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm mt-6">Loading listings...</p>
      ) : listings.length === 0 ? (
        <p className="text-gray-500 text-sm mt-6">
          You haven't posted any listings yet.
        </p>
      ) : (
        <table className="w-full mt-8">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-3">Type</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Requests</th>
              <th>Actions</th>
            </tr>
          </thead>

          <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
            {listings.map((listing) => (
              <ListingRow
                key={listing.id}
                listing={listing}
                onEdit={() => navigate(`/addwaste?edit=${listing.id}`)}
                onDelete={() => onDelete(listing.id)}
              />
            ))}
          </motion.tbody>
        </table>
      )}
    </div>
  );
}

export default MyListings;
