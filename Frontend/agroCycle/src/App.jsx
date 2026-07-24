import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Home from "./Pages/Home";
import Marketplace from "./Pages/Marketplace";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminD from "./Pages/AdminD";
import FarmerD from "./Pages/FarmerD";
import BuyerD from "./Pages/BuyerD";
import AddWaste from "./Pages/AddWaste";
import Messages from "./Pages/Messages";
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
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Page><AdminD /></Page>
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer"
          element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <Page><FarmerD /></Page>
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyer"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <Page><BuyerD /></Page>
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
