import React from "react";
import PendingCard from "./PendingCard";

function PendingReviews() {
  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-10">
      <h2 className="text-4xl font-bold mb-8">Pending Listings for Review</h2>

      <div className="space-y-6">
        <PendingCard
          title="Rice Husk"
          details="500 kg • Punjab, India"
          user="Farmer Rajesh"
          date="18/05/2026"
        />

        <PendingCard
          title="Suspicious Listing"
          details="10000 kg • Unknown"
          user="Test User"
          date="19/05/2026"
          flagged
        />
      </div>
    </div>
  );
}

export default PendingReviews;
