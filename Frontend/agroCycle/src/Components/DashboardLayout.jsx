import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="flex bg-gray-50 min-h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
      <Footer />
    </>
  );
}

export default DashboardLayout;
