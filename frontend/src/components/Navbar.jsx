import React, { use, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/Login");
  };
  const handleProfile = () => {
    navigate("/Profile");
  };
  const name = localStorage.getItem("name");

  let login_ache = 0;
  if (name && name.trim() !== "") {
    login_ache = 1;
  }

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const [sticky, setSticky] = React.useState(false); // State to manage sticky navbar
  useEffect(() => {
    const hadleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", hadleScroll);
    return () => {
      window.removeEventListener("scroll", hadleScroll);
    };
  }, [theme]);

  const navItems = // Navigation items
    (
      <>
        <li>
          <a href="/" className="text-yellow-500">
            Home
          </a>
        </li>
        <li>
          <a href="/Cars" className="text-green-500">
            Cars
          </a>
        </li>
        {/*buy or sell jofi login thake ?*/}
        <li>
          {login_ache ? (
            <a href="/BuySale" className="text-fuchsia-400">
              <div>Buy</div>
              <div>Sale</div>
            </a>
          ) : (
            ""
          )}
        </li>
      </>
    );

  return (
    <div
      className={` w-screen container mx-auto md:px-5 px-4 fixed top-0 left-0 right-0 duration-400 transition-all ease-in-out z-50
    ${
      sticky
        ? "sticky-navbar shadow-[0_0_25px_rgba(255,193,7,0.8)] bg-[#331539]/20 border border-amber-200 backdrop-blur-md transition-all duration-500"
        : "bg-blue-950/20 backdrop-blur-md"
    }`}
    >
      <div className="navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-lg"
            >
              {navItems}
            </ul>

            {/* logo */}
          </div>
          <a
            href="/"
            className="text-2xl font-extrabold cursor-pointer tracking-wide relative group"
          >
            <span className="text-gray-300 group-hover:text-white transition duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
              Car
            </span>
            <span className="text-yellow-400 group-hover:text-yellow-300 ml-1 transition duration-300 drop-shadow-[0_0_10px_rgba(255,230,0,0.8)]">
              Hub
            </span>
            {/* bottom underline animation */}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-gray-400 to-yellow-400 group-hover:w-full transition-all duration-500 rounded-full"></span>
          </a>
        </div>
        {/* logo */}

        <div className="navbar-end space-x-4">
          <div className="navbar-center hidden lg:flex">
            <ul
              className={`menu menu-horizontal px-1 ${
                sticky ? "text-[#FF7ED4]" : ""
              }`}
            >
              {navItems}
            </ul>
          </div>

          {/* Login button */}
          <div className="pl-100">
            {login_ache ? (
              <button
                className="btn px-4 py-2 rounded-md bg-yellow-800 border-black text-shadow-cyan-500
                 hover:bg-blue-800 shadow-md transition duration-200 "
                onClick={handleProfile}
              >
                {name}'s Profile
              </button>
            ) : (
              <a
                className="btn px-4 py-2 rounded-md bg-neutral-800 text-gray-200
                 hover:bg-gray-400 shadow-md transition duration-200 "
                onClick={handleLogin}
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
