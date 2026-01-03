import React, { useContext } from "react";
import MyContainer from "./MyContainer";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

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
      <li>
        {" "}
        <NavLink
          to="/addArtwork"
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
          to="/myFavorites"
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
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
        <div className="navbar-end">
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-3 shadow-lg"
              >
                <li className="pointer-events-none">
                  <div className="flex flex-col p-2">
                    <span className="text-[#001931] text-sm font-semibold">
                      {user.displayName || "User"}
                    </span>
                    <span className="text-gray-500 text-xs">{user.email}</span>
                  </div>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="text-red-600 hover:bg-red-50 flex items-center gap-3"
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
