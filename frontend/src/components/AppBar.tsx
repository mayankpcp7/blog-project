import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const AppBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  // Update maxHeight on open/close for smooth height transition
  useEffect(() => {
    if (menuRef.current) {
      if (menuOpen) {
        setMaxHeight(menuRef.current.scrollHeight + "px");
      } else {
        setMaxHeight("0px");
      }
    }
  }, [menuOpen]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/blogs", label: "Blogs" },
    { to: "/myblogs", label: "My Blogs" },
    { to: "/create", label: "Create Post" },
,
  ];

  return (
    <nav className="bg-[#2c003e] text-white border-b border-white/10">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-bold font-nunito drop-shadow-[0_0_10px_#2c003e]">
          🇮🇳 Bharat Defense
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 font-semibold">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className="hover:text-[#39FF14] transition-colors duration-300"
              >
                {label}
              </Link>
            </li>
          ))}

          {/* Signup Button */}
          <li>
            <Link
              to="/signup"
              className="ml-4 px-4 py-2 bg-[#39FF14] text-black font-semibold rounded shadow-[0_0_10px_#39FF1460] hover:bg-green-600 transition-colors duration-300"
            >
              Signup
            </Link>
          </li>
        </ul>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden focus:outline-none transition-colors duration-300 hover:text-[#39FF14]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Animated Mobile Menu */}
      <div
        ref={menuRef}
        style={{ maxHeight }}
        className="md:hidden overflow-hidden transition-[max-height] duration-500 ease-in-out"
      >
        <ul className="flex flex-col px-6 pb-4 space-y-3 font-semibold text-lg opacity-100">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className="block hover:text-[#39FF14] transition-colors duration-300"
                onClick={() => setMenuOpen(false)} // close menu on click
              >
                {label}
              </Link>
            </li>
          ))}

          {/* Signup Button in Mobile */}
          <li>
            <Link
              to="/signup"
              className="block mt-2 px-4 py-2 bg-[#39FF14] text-black font-semibold rounded shadow-[0_0_10px_#39FF1460] hover:bg-green-600 transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AppBar;
