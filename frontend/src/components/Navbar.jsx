import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged out");
    setTimeout(() => navigate("/login"), 700);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight text-emerald-400"
        >
          FormBuilder
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-6 text-sm md:text-base">

          <Link
            to="/about"
            className="text-slate-200 hover:text-emerald-400 transition"
          >
            About
          </Link>

          {loggedInUser ? (
            <span className="hidden md:inline text-slate-200">
              Hi,{" "}
              <span className="font-semibold text-emerald-400">
                {loggedInUser}
              </span>
            </span>
          ) : (
            <Link
              to="/login"
              className="text-slate-200 hover:text-emerald-400 transition"
            >
              Login
            </Link>
          )}

          {loggedInUser && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
