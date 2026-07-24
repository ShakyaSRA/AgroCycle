import React from "react";

function MarketplaceHero() {
  return (
    <section className="pt-16 ">
      <div className="max-w-4xl mx-80">
        <h2 className="text-3xl md:text-3xl font-bold text-gray-900 hover:text-green-700 transition duration-300">
          Waste Marketplace
        </h2>

        <p className="text-gray-700 mt-4 text-lg md:text-md leading-relaxed">
          Browse available agricultural waste and request pickup.
        </p>
      </div>
    </section>
  );
}

export default MarketplaceHero;
