import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ListingRow from "./ListingRow";
import { staggerContainer } from "../../lib/motion";

function MyListings({ listings, loading, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow p-8 mt-10">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">My Listings</h2>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/addwaste")}
          className="bg-green-600 text-white px-5 py-2 rounded-xl"
        >
          + Add New
        </motion.button>
      </div>

      {loading ? (
        <p className="text-gray-500 mt-8">Loading listings...</p>
      ) : listings.length === 0 ? (
        <p className="text-gray-500 mt-8">
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
