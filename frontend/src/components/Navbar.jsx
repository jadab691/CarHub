import { set } from "lodash";
import React, { use, useEffect } from "react";
import { useState } from "react";
import Login from "./Login";
import Search from "./Search";
import About from "./About";
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
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/Cars">Cars</a>
        </li>
        <li>
          <a>Contact</a>
        </li>
        <li>
          <a href="/About">About</a>
        </li>
        {/*buy or sell jofi login thake ?*/}
        <li>
          {login_ache ? (
            <a href="/BuySale">
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
      className={`max-w-screen-2xl w-screen container mx-auto md:px-5 px-4 fixed  top-0 left-0 right-0 duration-400 transition-all ease-in-out z-50
    ${
      sticky
        ? "sticky-navbar shadow-amber-400  bg-[#211951] border-amber-100   duration-400 transition-all ease-in-out"
        : ""
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
          </div>
          <a className=" text-2xl font-bold cursor-pointer ">
            <span className="text-gray-400">Car</span>
            <span className="text-yellow-400 mb-4">Hub</span>
          </a>
        </div>
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

          {/* search button */}
          <Search />

          {/* dark theme controller */}
          <div>
            <label
              className={`swap swap-rotate ${sticky ? "text-[#FF7ED4]" : ""}`}
            >
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller"
                value="synthwave"
              />

              {/* sun icon */}
            </label>
          </div>

          {/* Login button */}
          <div>
            {login_ache ? (
              <button
                className="btn px-4 py-2 rounded-md bg-yellow-800 border-black text-white
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
