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
import ConfirmDialog from "./ConfirmDialog";
import { useState } from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  function confirmLogout() {
    setLogoutDialogOpen(true);
  }

  function closeLogoutDialog() {
    setLogoutDialogOpen(false);
  }

  const dashboardPath =
    user?.role === "admin"
      ? "/admin/stats"
      : user?.role === "farmer"
        ? "/farmer"
        : "/buyer";

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 md:px-20 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <h1 className="text-lg font-semibold text-gray-900 cursor-pointer tracking-tight">
            AgroCycle
          </h1>
        </Link>

        <ul className="hidden md:flex items-center gap-1 text-sm text-gray-600 font-medium">
          <li>
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <House size={16} />
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/marketplace"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <ShoppingBag size={16} />
              Marketplace
            </Link>
          </li>

          {user?.role === "farmer" && (
            <li>
              <Link
                to="/addwaste"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <CirclePlus size={16} />
                Add Waste
              </Link>
            </li>
          )}

          {user && (
            <li>
              <Link
                to={dashboardPath}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                {user.role === "admin" ? (
                  <Shield size={16} />
                ) : (
                  <LayoutDashboard size={16} />
                )}
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        <div className="hidden md:flex items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="text-gray-500">
                Hi, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={confirmLogout}
                className="flex items-center gap-1.5 text-gray-500 hover:text-red-600 cursor-pointer transition-colors font-medium"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 cursor-pointer hover:text-gray-900 transition-colors font-medium px-3 py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition-colors font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      <ConfirmDialog
        open={logoutDialogOpen}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        icon={LogOut}
        confirmColor="red"
        onConfirm={() => {
          closeLogoutDialog();
          handleLogout();
        }}
        onCancel={closeLogoutDialog}
      />
    </>
  );
}

export default Navbar;
