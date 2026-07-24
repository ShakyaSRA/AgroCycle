import logo from "../assets/logo.png";
import { House, ShoppingBag, CirclePlus, LayoutDashboard } from "lucide-react";
import Marketplace from "../Pages/Marketplace";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-80 h-20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className="w-14 h-14 object-contain py-0" />
        <h1 className="text-3xl font-bold text-green-700 cursor-pointer">
          AgroCycle
        </h1>
      </div>

      <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium ">
        <li>
          <Link
            to="/"
            className="hover:text-green-600 cursor-pointer flex justify-center gap-2 "
          >
            <House size={20} />
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/marketplace"
            className="hover:text-green-600 cursor-pointer flex justify-center gap-2"
          >
            <ShoppingBag size={20} />
            Marketplaces
          </Link>
        </li>
        <li>
          <Link
            to="/addwaste"
            className="hover:text-green-600 cursor-pointer flex justify-center gap-2"
          >
            <CirclePlus size={20} />
            Add Waste
          </Link>
        </li>
        <li>
          <Link
            to="/admin"
            className="hover:text-green-600 flex items-center gap-2"
          >
            <Shield size={20} />
            Admin
          </Link>
          <Link
            to="/farmer"
            className="hover:text-green-600 flex items-center gap-2"
          >
            <LayoutDashboard size={20} />
            Farmer
          </Link>
        </li>
      </ul>

      <div className="hidden md:flex gap-4 font-semibold">
        <button>
          <Link
            to="/login"
            className="text-green-600 cursor-pointer hover:text-green-700 hover:scale-105 transition duration-300"
          >
            Login
          </Link>
        </button>

        <button>
          <Link
            to="/register"
            className="bg-green-600 text-white px-5 py-2 rounded-xl cursor-pointer hover:bg-green-700 hover:scale-105 transition duration-300"
          >
            Register
          </Link>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
