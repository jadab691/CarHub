import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const [sticky, setSticky] = useState(false);

  const handleLogin = () => {
    navigate("/Login");
  };

  const handleProfile = () => {
    navigate("/Profile");
  };

  const login_ache = name && name.trim() !== "";

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = (
    <>
      <li>
        <a href="/" className="text-slate-700 hover:text-blue-600 font-medium">
          Home
        </a>
      </li>
      <li>
        <a
          href="/Cars"
          className="text-slate-700 hover:text-blue-600 font-medium"
        >
          Cars
        </a>
      </li>
      {login_ache ? (
        <li>
          <a
            href="/BuySale"
            className="text-slate-700 hover:text-blue-600 font-medium"
          >
            Buy & Sell
          </a>
        </li>
      ) : (
        ""
      )}
    </>
  );

  return (
    <div
      className={`w-screen container mx-auto md:px-5 px-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        sticky
          ? "bg-[#fff8e1]/95 shadow-[0_10px_30px_rgba(15,23,42,0.08)] border-b border-[#e9d8a6] backdrop-blur"
          : "bg-[#fff8e1]/90 backdrop-blur"
      }`}
    >
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden border-0 bg-transparent shadow-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-slate-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow-lg border border-slate-200"
            >
              {navItems}
            </ul>
          </div>
          <a
            href="/"
            className="text-2xl font-extrabold tracking-wide text-slate-900"
          >
            <span>Car</span>
            <span className="ml-1 text-blue-600">Hub</span>
          </a>
        </div>

        <div className="navbar-end space-x-4">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-slate-700">
              {navItems}
            </ul>
          </div>

          <div>
            {login_ache ? (
              <button
                className="btn px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-700"
                onClick={handleProfile}
              >
                {name}'s Profile
              </button>
            ) : (
              <button
                className="btn px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleLogin}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
