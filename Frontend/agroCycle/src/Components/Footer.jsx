import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 px-6 md:px-20 py-14">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
            <span className="text-lg font-semibold text-gray-900">
              AgroCycle
            </span>
          </div>

          <p className="text-gray-500 mt-4 text-sm leading-relaxed">
            Turning agricultural waste into value through a sustainable circular
            economy.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Quick Links
          </h2>

          <ul className="space-y-2.5 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-green-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/marketplace"
                className="hover:text-green-600 transition-colors"
              >
                Marketplace
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="hover:text-green-600 transition-colors"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Resources
          </h2>

          <ul className="space-y-2.5 text-sm text-gray-500">
            <li>
              <a href="#" className="hover:text-green-600 transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition-colors">
                How It Works
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition-colors">
                Support
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Contact</h2>

          <ul className="space-y-3 text-sm text-gray-500">
            <li className="flex gap-2.5">
              <MapPin size={16} className="shrink-0 mt-0.5" />
              <span>39, Uduwawala, Katugastota, Kandy, Sri Lanka</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="shrink-0" />
              <span>+94 76 351 727</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0" />
              <span>support@agrocycle.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 py-6 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>&copy; 2026 AgroCycle. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-600 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
