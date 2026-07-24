import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Marketplace from "./Pages/Marketplace";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminD from "./Pages/AdminD";
import FarmerD from "./Pages/FarmerD";
import AddWaste from "./Pages/AddWaste";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminD />} />
        <Route path="/farmer" element={<FarmerD />} />
        <Route path="/addwaste" element={<AddWaste />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
