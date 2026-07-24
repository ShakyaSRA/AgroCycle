import RequestCard from "./RequestCard";

function BuyerRequests() {
  return (
    <div className="bg-white rounded-2xl shadow p-8 mt-10">
      <h2 className="text-3xl font-bold mb-8">Recent Buyer Requests</h2>

      <div className="space-y-6">
        <RequestCard
          buyer="Green Recycling Co."
          waste="Rice Husk - 500 kg"
          message="Interested in purchasing for biofuel production."
          date="18/05/2026"
        />

        <RequestCard
          buyer="Eco Products Ltd."
          waste="Wheat Straw - 400 kg"
          message="Need for composting. Can pickup this week."
          date="17/05/2026"
        />
      </div>
    </div>
  );
}

export default BuyerRequests;
