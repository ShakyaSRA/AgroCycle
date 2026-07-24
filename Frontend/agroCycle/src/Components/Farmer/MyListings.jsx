import ListingRow from "./ListingRow";

function MyListings() {
  return (
    <div className="bg-white rounded-2xl shadow p-8 mt-10">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">My Listings</h2>

        <button className="bg-green-600 text-white px-5 py-2 rounded-xl">
          + Add New
        </button>
      </div>

      <table className="w-full mt-8">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th>Type</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Views</th>
            <th>Requests</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <ListingRow
            type="Rice Husk"
            quantity="500 kg"
            status="Active"
            views="45"
            requests="3"
          />

          <ListingRow
            type="Wheat Straw"
            quantity="800 kg"
            status="Active"
            views="32"
            requests="2"
          />

          <ListingRow
            type="Cotton Stalks"
            quantity="300 kg"
            status="Sold"
            views="67"
            requests="5"
          />
        </tbody>
      </table>
    </div>
  );
}

export default MyListings;
