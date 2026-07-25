import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PendingCard from "./PendingCard";
import PendingReuseIdeaCard from "./PendingReuseIdeaCard";
import ListingDetailModal from "./ListingDetailModal";
import { staggerContainer } from "../../lib/motion";

function PendingReviews({
  listings,
  categoryRequests,
  reuseIdeas = [],
  loading,
  onListingDecision,
  onCategoryRequestDecision,
  onReuseIdeaDecision,
}) {
  const [viewingListing, setViewingListing] = useState(null);

  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-10">
      <h2 className="text-4xl font-bold mb-8">Pending Listings for Review</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : listings.length === 0 ? (
        <p className="text-gray-500">No listings awaiting review.</p>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {listings.map((listing) => (
            <PendingCard
              key={listing.id}
              title={listing.category?.name}
              details={`${listing.quantity} ${listing.unit} • ${listing.location}`}
              user={listing.farmer?.name}
              date={new Date(listing.created_at).toLocaleDateString()}
              flagged={Number(listing.quantity) > 5000}
              onApprove={() => onListingDecision(listing.id, "Approved")}
              onReject={() => onListingDecision(listing.id, "Rejected")}
              onView={() => setViewingListing(listing)}
            />
          ))}
        </motion.div>
      )}

      {categoryRequests.length > 0 && (
        <>
          <h2 className="text-4xl font-bold mb-8 mt-12">
            Pending Category Requests
          </h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {categoryRequests.map((request) => (
              <PendingCard
                key={request.id}
                title={request.name}
                details={request.description || "No description provided."}
                user={request.farmer?.name}
                date={new Date(request.created_at).toLocaleDateString()}
                onApprove={() => onCategoryRequestDecision(request.id, "Approved")}
                onReject={() => onCategoryRequestDecision(request.id, "Rejected")}
              />
            ))}
          </motion.div>
        </>
      )}

      {reuseIdeas.length > 0 && (
        <>
          <h2 className="text-4xl font-bold mb-8 mt-12">
            Pending Reuse Ideas
          </h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {reuseIdeas.map((idea) => (
              <PendingReuseIdeaCard
                key={idea.id}
                idea={idea}
                onApprove={(icon) => onReuseIdeaDecision(idea.id, "Approved", icon)}
                onReject={() => onReuseIdeaDecision(idea.id, "Rejected")}
              />
            ))}
          </motion.div>
        </>
      )}

      <AnimatePresence>
        {viewingListing && (
          <ListingDetailModal
            listing={viewingListing}
            onClose={() => setViewingListing(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default PendingReviews;
