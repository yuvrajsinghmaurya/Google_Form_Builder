import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Sidebar Toggle (below navbar) */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-20 left-4 z-40 bg-slate-900 text-slate-100 px-3 py-2 rounded-lg border border-slate-700 shadow"
      >
        ☰ Menu
      </button>

      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-14 md:top-16 left-0 h-[calc(100vh-4rem)] 
          w-60 bg-slate-900 border-r border-slate-700 text-slate-100
          z-40 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Close Button (Mobile) */}
        <button
          onClick={() => setOpen(false)}
          className="md:hidden absolute top-3 right-3 text-xl"
        >
          ✕
        </button>

        <div className="px-5 pt-6 pb-4 border-b border-slate-700">
          <h1 className="text-xl font-semibold text-emerald-400">
            Admin Panel
          </h1>
        </div>

        <nav className="px-4 py-4 flex flex-col gap-2 text-sm md:text-base">
          <Link
            to="/admin/forms"
            className="px-3 py-2 rounded-lg hover:bg-slate-800 transition flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            📄 <span>All Forms</span>
          </Link>

          <Link
            to="/admin/create-form"
            className="px-3 py-2 rounded-lg hover:bg-slate-800 transition flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            ➕ <span>Create Form</span>
          </Link>

          <button
            onClick={handleLogout}
            className="mt-6 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition text-sm font-medium"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
