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
    <nav className=" bg-gradient-to-tr from-gray-900 text-white px-8 py-4 shadow-lg w-screen ">
      <div className="flex justify-between items-center max-w-9xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img src="../assets/icon1.jpg" alt="Logo" className="h-13 w-36 mx-5 bg-white" />
          <img src="../assets/icon2.jpg" alt="Logo" className="h-13 w-36" />
        </div>
        <div className="text-4xl font-extrabold tracking-wide px-6 ">
          <Link to="/" className="text-teal-400 hover:text-teal-300 transition">
            UNNATI
          </Link>
        </div>
       
      </div>
    </nav>
  );  
};

export default Navbar;