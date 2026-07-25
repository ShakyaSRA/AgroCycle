import logo from "../assets/logo.png";
import {
  House,
  ShoppingBag,
  CirclePlus,
  LayoutDashboard,
  Shield,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  const dashboardPath =
    user?.role === "admin" ? "/admin" : user?.role === "farmer" ? "/farmer" : "/buyer";

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 px-6 md:px-20 h-20 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="logo" className="w-14 h-14 object-contain py-0" />
        <h1 className="text-3xl font-bold text-green-700 cursor-pointer">
          AgroCycle
        </h1>
      </Link>

      <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium ">
        <li>
          <Link
            to="/"
            className="group relative hover:text-green-600 cursor-pointer flex justify-center gap-2"
          >
            <House size={20} />
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full" />
          </Link>
        </li>

        <li>
          <Link
            to="/marketplace"
            className="group relative hover:text-green-600 cursor-pointer flex justify-center gap-2"
          >
            <ShoppingBag size={20} />
            Marketplace
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full" />
          </Link>
        </li>

        {user?.role === "farmer" && (
          <li>
            <Link
              to="/addwaste"
              className="group relative hover:text-green-600 cursor-pointer flex justify-center gap-2"
            >
              <CirclePlus size={20} />
              Add Waste
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        )}

        {user && (
          <li>
            <Link
              to={dashboardPath}
              className="group relative hover:text-green-600 flex items-center gap-2"
            >
              {user.role === "admin" ? (
                <Shield size={20} />
              ) : (
                <LayoutDashboard size={20} />
              )}
              Dashboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        )}

        {(user?.role === "farmer" || user?.role === "buyer") && (
          <li>
            <Link
              to="/messages"
              className="group relative hover:text-green-600 flex items-center gap-2"
            >
              <MessageSquare size={20} />
              Messages
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        )}
      </ul>

      <div className="hidden md:flex items-center gap-4 font-semibold">
        {user ? (
          <>
            <span className="text-gray-600">Hi, {user.name.split(" ")[0]}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer transition duration-300"
            >
              <LogOut size={18} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-green-600 cursor-pointer hover:text-green-700 hover:scale-105 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-2 rounded-xl cursor-pointer hover:shadow-lg hover:scale-105 transition duration-300"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
