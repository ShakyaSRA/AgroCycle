import React from "react";
import WasteCard from "./WasteCard";

function WasteGrid() {
  const wasteData = [
    {
      title: "Rice Husk",
      weight: "500 kg",
      description:
        "Fresh rice husk from recent harvest, suitable for fertilizer production",
      location: "Katugastota, Kandy",
      farmer: "Farmer Rajesh",
      date: "Apr 28, 2026",
    },

    {
      title: "Coconut Shell",
      weight: "300 kg",
      description:
        "Clean coconut shells, perfect for charcoal or craft production",
      location: "Katugastota, Kandy",
      farmer: "Coconut Farm Co-op",
      date: "Apr 29, 2026",
    },

    {
      title: "Wheat Straw",
      weight: "1000 kg",
      description: "Dry wheat straw available for biofuel or animal feed",
      location: "Katugastota, Kandy",
      farmer: "Sharma Farms",
      date: "Apr 30, 2026",
    },

    {
      title: "Sugarcane Bagasse",
      weight: "700 kg",
      description: "Organic sugarcane waste suitable for bioenergy production",
      location: "Katugastota, Kandy",
      farmer: "Green Valley Farms",
      date: "May 1, 2026",
    },

    {
      title: "Sugarcane Bagasse",
      weight: "700 kg",
      description: "Organic sugarcane waste suitable for bioenergy production",
      location: "Katugastota, Kandy",
      farmer: "Green Valley Farms",
      date: "May 1, 2026",
    },

    {
      title: "Sugarcane Bagasse",
      weight: "700 kg",
      description: "Organic sugarcane waste suitable for bioenergy production",
      location: "Katugastota, Kandy",
      farmer: "Green Valley Farms",
      date: "May 1, 2026",
    },

    {
      title: "Sugarcane Bagasse",
      weight: "700 kg",
      description: "Organic sugarcane waste suitable for bioenergy production",
      location: "Katugastota, Kandy",
      farmer: "Green Valley Farms",
      date: "May 1, 2026",
    },

    {
      title: "Sugarcane Bagasse",
      weight: "700 kg",
      description: "Organic sugarcane waste suitable for bioenergy production",
      location: "Katugastota, Kandy",
      farmer: "Green Valley Farms",
      date: "May 1, 2026",
    },

    {
      title: "Sugarcane Bagasse",
      weight: "700 kg",
      description: "Organic sugarcane waste suitable for bioenergy production",
      location: "Katugastota, Kandy",
      farmer: "Green Valley Farms",
      date: "May 1, 2026",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto mt-10  grid md:grid-cols-3 gap-10 py-10">
      {wasteData.map((waste, index) => (
        <WasteCard
          key={index}
          title={waste.title}
          weight={waste.weight}
          description={waste.description}
          item1={waste.location}
          item2={waste.farmer}
          item3={waste.date}
        />
      ))}
    </div>
  );
}

export default WasteGrid;
