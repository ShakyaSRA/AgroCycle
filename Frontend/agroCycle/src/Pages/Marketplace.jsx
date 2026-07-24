import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import MarketplaceHero from "../Components/Marketplace/MarketplaceHero";
import WasteGrid from "../Components/Marketplace/WasteGrid";
import Search from "../Components/Marketplace/Search";

function Marketplace() {
  return (
    <div>
      <Navbar />
      <MarketplaceHero />
      <Search />
      <WasteGrid />
      <Footer />
    </div>
  );
}

export default Marketplace;
