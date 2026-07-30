import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import MarketplaceHero from "../Components/Marketplace/MarketplaceHero";
import WasteGrid from "../Components/Marketplace/WasteGrid";
import Search from "../Components/Marketplace/Search";
import ListingDetailModal from "../Components/Marketplace/ListingDetailModal";
import { getListings } from "../api/listings";
import { useAuth } from "../context/AuthContext";

function Marketplace() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("");
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedListingId, setSelectedListingId] = useState(null);

  useEffect(() => {
    getListings()
      .then((data) => setTotalCount(data.length))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (categoryId) params.category_id = categoryId;
    if (status) params.status = status;

    const timeout = setTimeout(() => {
      getListings(params)
        .then(setListings)
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 250);

    return () => clearTimeout(timeout);
  }, [search, categoryId, status]);

  return (
    <div>
      <Navbar />
      <MarketplaceHero />
      <Search
        search={search}
        onSearchChange={setSearch}
        categoryId={categoryId}
        onCategoryChange={setCategoryId}
        status={status}
        onStatusChange={setStatus}
        isAdmin={user?.role === "admin"}
        resultCount={listings.length}
        totalCount={totalCount}
      />
      <WasteGrid
        listings={listings}
        loading={loading}
        onOpenDetail={(listing) => setSelectedListingId(listing.id)}
      />
      <AnimatePresence>
        {selectedListingId && (
          <ListingDetailModal
            listingId={selectedListingId}
            onClose={() => setSelectedListingId(null)}
          />
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default Marketplace;
