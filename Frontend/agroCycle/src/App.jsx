import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Home from "./Pages/Home";
import Marketplace from "./Pages/Marketplace";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminStats from "./Pages/Admin/AdminStats";
import AdminRequests from "./Pages/Admin/AdminRequests";
import AdminUsers from "./Pages/Admin/AdminUsers";
import FarmerOverview from "./Pages/Farmer/FarmerOverview";
import FarmerListings from "./Pages/Farmer/FarmerListings";
import FarmerRequests from "./Pages/Farmer/FarmerRequests";
import BuyerOverview from "./Pages/Buyer/BuyerOverview";
import BuyerRequestsPage from "./Pages/Buyer/BuyerRequestsPage";
import AddWaste from "./Pages/AddWaste";
import Messages from "./Pages/Messages";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./Components/ProtectedRoute";
import { pageFade } from "./lib/motion";

function Page({ children }) {
  return (
    <motion.div
      initial={pageFade.initial}
      animate={pageFade.animate}
      exit={pageFade.exit}
      transition={pageFade.transition}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><Home /></Page>} />
        <Route path="/marketplace" element={<Page><Marketplace /></Page>} />
        <Route path="/login" element={<Page><Login /></Page>} />
        <Route path="/register" element={<Page><Register /></Page>} />
        <Route path="/admin" element={<Navigate to="/admin/stats" replace />} />
        <Route
          path="/admin/stats"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Page><AdminStats /></Page>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/requests"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Page><AdminRequests /></Page>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Page><AdminUsers /></Page>
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer"
          element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <Page><FarmerOverview /></Page>
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/listings"
          element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <Page><FarmerListings /></Page>
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/requests"
          element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <Page><FarmerRequests /></Page>
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyer"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <Page><BuyerOverview /></Page>
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyer/requests"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <Page><BuyerRequestsPage /></Page>
            </ProtectedRoute>
          }
        />
        <Route
          path="/addwaste"
          element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <Page><AddWaste /></Page>
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute allowedRoles={["farmer", "buyer"]}>
              <Page><Messages /></Page>
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages/:userId"
          element={
            <ProtectedRoute allowedRoles={["farmer", "buyer"]}>
              <Page><Messages /></Page>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["admin", "farmer", "buyer"]}>
              <Page><Profile /></Page>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
