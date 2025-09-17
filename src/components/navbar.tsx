import React from "react";
import { Link } from "react-router-dom";

interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

const Navbar: React.FC = () => {
  return (
    <nav className=" bg-gradient-to-tr from-gray-900 text-white px-8 py-4 shadow-lg w-screen">
      <div className="flex justify-between items-center max-w-9xl mx-auto">
        {/* Logo */}
        <div className="text-4xl font-extrabold tracking-wide">
          <Link to="/" className="text-teal-400 hover:text-teal-300 transition">
            UNNATI
          </Link>
        </div>

        {/* Links */}
        <ul className="flex space-x-8 text-lg font-medium">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="relative group transition-colors duration-300"
              >
                {item.label}
                {/* Underline hover effect */}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex space-x-4 text-lg font-semibold">
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 shadow-md transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 shadow-md transition duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
