import DashboardLayout from "../Components/DashboardLayout";
import AddWasteForm from "../Components/AddWaste/AddWasteForm";

function AddWaste() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <AddWasteForm />
      </div>
    </DashboardLayout>
  );
}

export default AddWaste;
