import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import MarketplaceHero from "../Components/Marketplace/MarketplaceHero";
import WasteGrid from "../Components/Marketplace/WasteGrid";
import Search from "../Components/Marketplace/Search";
import { getListings } from "../api/listings";

function Marketplace() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [listings, setListings] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

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

    const timeout = setTimeout(() => {
      getListings(params)
        .then(setListings)
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 250);

    return () => clearTimeout(timeout);
  }, [search, categoryId]);

  return (
    <div>
      <Navbar />
      <MarketplaceHero />
      <Search
        search={search}
        onSearchChange={setSearch}
        categoryId={categoryId}
        onCategoryChange={setCategoryId}
        resultCount={listings.length}
        totalCount={totalCount}
      />
      <WasteGrid listings={listings} loading={loading} />
      <Footer />
    </div>
  );
}

export default Marketplace;
