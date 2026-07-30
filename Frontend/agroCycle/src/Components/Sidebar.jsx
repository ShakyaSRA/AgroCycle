import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Boxes,
  Inbox,
  CirclePlus,
  MessageSquare,
  LogOut,
  Shield,
  UserCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = {
  admin: [
    { to: "/admin/stats", label: "Stats & Analytics", icon: LayoutDashboard },
    { to: "/admin/requests", label: "Requests", icon: ClipboardList },
    { to: "/admin/users", label: "User Management", icon: Users },
  ],
  farmer: [
    { to: "/farmer", label: "Overview", icon: LayoutDashboard, end: true },
    { to: "/farmer/listings", label: "My Listings", icon: Boxes },
    { to: "/farmer/requests", label: "Buyer Requests", icon: Inbox },
    { to: "/addwaste", label: "Add Waste", icon: CirclePlus },
    { to: "/messages", label: "Messages", icon: MessageSquare },
  ],
  buyer: [
    { to: "/buyer", label: "Overview", icon: LayoutDashboard, end: true },
    { to: "/buyer/requests", label: "My Requests", icon: Inbox },
    { to: "/messages", label: "Messages", icon: MessageSquare },
  ],
};

const COMMON_ITEMS = [{ to: "/profile", label: "Profile", icon: UserCircle }];

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const items = [...COMMON_ITEMS, ...(NAV_ITEMS[user.role] || [])];

  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col justify-between bg-white border-r border-gray-200 sticky top-16 h-[calc(100vh-4rem)] py-6 px-3">
      <div>
        <div className="flex items-center gap-2 px-3 mb-6">
          {user.role === "admin" ? (
            <Shield className="text-green-600" size={16} />
          ) : (
            <LayoutDashboard className="text-green-600" size={16} />
          )}
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {user.role} Panel
          </span>
        </div>

        <nav className="space-y-0.5">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
