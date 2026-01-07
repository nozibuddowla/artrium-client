import React, { useContext, useEffect, useState } from "react";
import MyContainer from "./MyContainer";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        toast.error("Logout failed. Please try again");
      });
  };

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }

    // 2. Save the choice to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-purple-600 font-bold"
              : "font-medium hover:text-purple-600"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/exploreArtworks"
          className={({ isActive }) =>
            isActive
              ? "text-purple-600 font-bold"
              : "font-medium hover:text-purple-600"
          }
        >
          Explore Artworks
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            {" "}
            <NavLink
              to="/add-artwork"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-600 font-bold"
                  : "font-medium hover:text-purple-600"
              }
            >
              Add Artwork
            </NavLink>{" "}
          </li>
          <li>
            {" "}
            <NavLink
              to="/myGallery"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-600 font-bold"
                  : "font-medium hover:text-purple-600"
              }
            >
              My Gallery
            </NavLink>{" "}
          </li>
          <li>
            {" "}
            <NavLink
              to="/my-favorites"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-600 font-bold"
                  : "font-medium hover:text-purple-600"
              }
            >
              My Favorites
            </NavLink>{" "}
          </li>
        </>
      ) : (
        ""
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <MyContainer className="flex items-center justify-between">
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
              className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-10 mt-3 w-56 p-3 shadow-lg border-base-300"
            >
              {links}
            </ul>
          </div>
          <Link
            to="/"
            className="text-2xl font-black bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Artrium
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-4">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              onClick={toggleTheme}
              type="checkbox"
              className="theme-controller"
              value="synthwave"
            />
            {theme === "light" ? (
              <FaMoon className="text-gray-700" />
            ) : (
              <FaSun className="text-yellow-400" />
            )}
          </label>
          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 h-10 rounded-full ring ring-purple-500 ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      user.photoURL ||
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239ca3af'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E"
                    }
                    alt={user.displayName || "User"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-10 mt-3 w-56 p-3 shadow-lg border border-base-300"
              >
                <li className="pointer-events-none">
                  <div className="flex flex-col p-2">
                    <span className="text-base-content text-lg font-semibold">
                      {user.displayName || "User"}
                    </span>
                    <span className="text-base-content/60 text-sm">
                      {user.email}
                    </span>
                  </div>
                </li>
                <div className="divider my-1"></div>
                <li>
                  {" "}
                  <NavLink
                    to="/myProfile"
                    className={({ isActive }) =>
                      isActive
                        ? "text-purple-600 font-bold"
                        : "font-medium hover:text-purple-600"
                    }
                  >
                    My Profile
                  </NavLink>{" "}
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="text-error hover:bg-error/10 flex items-center gap-3"
                  >
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
          {!user && (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="btn bg-linear-to-br px-2 py-1.5 font-semibold leading-5 hidden sm:flex"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn bg-linear-to-br from-[#632ee3] to-[#9f62f2] text-white px-2 py-1.5 font-semibold leading-5"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </MyContainer>
    </div>
  );
};

export default Navbar;
