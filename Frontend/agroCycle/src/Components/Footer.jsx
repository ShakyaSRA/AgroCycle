import logo from "../assets/logo.png";
import { MapPin, Phone, Mail } from "lucide-react";
/* import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa"; */

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-3">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-14 h-14 object-contain" />

            <h1 className="text-2xl font-bold">AgroCycle</h1>
          </div>

          <p className="text-gray-400 mt-6 leading-relaxed">
            Turning agricultural waste into value. Building a sustainable future
            through circular economy.
          </p>
          {/* <div className="flex gap-6">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition"
            >
              <FaFacebookF className="text-xl text-white" />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition"
            >
              <FaInstagram className="text-xl text-white" />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition"
            >
              <FaTwitter className="text-xl text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition"
            >
              <FaLinkedinIn className="text-xl text-white" />
            </a>
          </div> */}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Quick Links</h2>

          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="#" className="hover:text-green-400 transition">
                Home
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-green-400 transition">
                Marketplace
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-green-400 transition">
                Add Waste
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-green-400 transition">
                Dashboard
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Resources</h2>

          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="#" className="hover:text-green-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400 transition">
                How It Works
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400 transition">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400 transition">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400 transition">
                Support
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>

          <ul className="space-y-5 text-gray-400">
            <li className="flex gap-3">
              <MapPin size={20} />
              <span>39, Uduwawala, Katugastota, Kandy, Sri Lanka</span>
            </li>

            <li className="flex items-center gap-3">
              <Phone size={18} />
              <span>+94 76351727</span>
            </li>

            <li className="flex items-center gap-3">
              <Mail size={18} />
              <span>support@agrocycle.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-5 pt-6 flex flex-col md:flex-row items-center justify-between text-gray-500 gap-4 mx-65">
        <p>&copy; 2026 AgroCycle. All rights reserved.</p>

        <div className="flex gap-6">
          <a href="#" className="hover:text-green-400 transition">
            Privacy Policy
          </a>

          <a href="#" className="hover:text-green-400 transition">
            Terms of Service
          </a>

          <a href="#" className="hover:text-green-400 transition">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
