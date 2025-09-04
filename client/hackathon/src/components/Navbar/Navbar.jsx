import React, { useState } from 'react'
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"
import { FaBars } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import { MdOutlineDarkMode } from "react-icons/md";

const navLinks = [
  { to: "/", text: "Home" },
  { to: "/work", text: "How It Works" },
  { to: "/about", text: "About" },
  { to: "/contact", text: "Contact" }
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="p-3 flex justify-between items-center max-w-[1808px] mx-auto bg-white">
      <Link className="flex items-center flex-1" to="/">
        <img className="object-cover max-w-25 max-h-25" src={logo} alt="Relive Logo" />
        <div>
          <h1 className="text-2xl font-bold">RELIVE</h1>
          <p className="text-sm font-medium text-gray-500">Organ Donor</p>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div id="nav-menu" className="hidden lg:flex gap-12">
        {navLinks.map((link) => (
          <Link 
            key={link.text}
            to={link.to} 
            className="font-medium hover:text-[#3238f2]"
          >
            {link.text}
          </Link>
        ))}
      </div>

      {/* Desktop Actions */}
      <div className="hidden flex-1 lg:flex justify-end gap-4 items-center">
        <MdOutlineDarkMode size={25} className="cursor-pointer" />
        <button className="flex items-center gap-3 border border-gray-400 px-6 py-2 rounded-lg hover:border-gray-600">
          <Link to="/login">Login</Link>
        </button>
        <button className="flex items-center gap-3 border border-gray-400 px-6 py-2 rounded-lg hover:border-gray-600">
          <Link to="/signup">SignUp</Link>
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="p-2 pt-0 lg:hidden" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FaBars size={25} />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div id="nav-dialog" className="fixed bg-white inset-0 p-3 z-10 lg:hidden">
          <div id="nav-bar" className="flex justify-between pl-5">
            <Link to="/" className="flex gap-2 items-center">
              <span className="text-2xl font-bold">RELIVE</span>
            </Link>
            <button 
              className="p-2" 
              onClick={() => setMenuOpen(false)}
            >
              <HiMiniXMark size={35} />
            </button>
          </div>

          <div className="mt-6">
            {navLinks.map((link) => (
              <Link
                key={link.text}
                to={link.to}
                className="font-medium m-3 p-3 hover:bg-gray-50 block"
                onClick={() => setMenuOpen(false)}
              >
                {link.text}
              </Link>
            ))}
          </div>

          <div className="h-[1px] bg-gray-300"></div>
          
          <div className="flex flex-col gap-4 mt-8 px-6">
            <Link 
              to="/login" 
              className="w-full py-2 text-center border rounded-lg hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="w-full py-2 text-center border rounded-lg hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              SignUp
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

export default Navbar