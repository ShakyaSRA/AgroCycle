import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import FarmerStats from "../Components/Farmer/FarmerStats";
import MyListings from "../Components/Farmer/MyListings";
import BuyerRequests from "../Components/Farmer/BuyerRequests";

function FarmerD() {
  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto p-10">
          <h1 className="text-5xl font-bold">Farmer Dashboard</h1>

          <p className="text-gray-600 mt-2">
            Manage your waste listings and track sales
          </p>

          <FarmerStats />

          <MyListings />

          <BuyerRequests />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default FarmerD;
