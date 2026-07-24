import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import AddWasteForm from "../Components/AddWaste/AddWasteForm";

function AddWaste() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-10">
        <AddWasteForm />
      </div>

      <Footer />
    </>
  );
}

export default AddWaste;
