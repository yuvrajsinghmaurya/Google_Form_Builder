import React, { useEffect, useState } from "react";
import { getAllForms, deleteForm } from "../../api/formApi";
import { Link } from "react-router-dom";
import { handleSuccess, handleError } from "../../utils/utils";
import { ToastContainer } from "react-toastify";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AdminSidebar from "../../components/AdminSidebar";

const FormList = () => {
  const [forms, setForms] = useState([]);
  const token = localStorage.getItem("token");

  const loadForms = async () => {
    const res = await getAllForms(token);

    if (!res.success) {
      return handleError("Failed to load forms");
    }

    setForms(res.forms);
  };

  useEffect(() => {
    loadForms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this form?")) return;

    const result = await deleteForm(id, token);
    if (!result.success) return handleError(result.message);

    handleSuccess("Form deleted!");
    loadForms();
  };

  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
    handleSuccess("Form link copied!");
  };

  return (
    <>
      <Navbar />

      {/* Whole page background */}
      <div className="min-h-screen bg-slate-100 pt-16 flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 md:ml-60 px-4 md:px-8 py-6">
          <div className="max-w-5xl mx-auto">

            {/* Title + Create Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
     <div className="w-full flex justify-center">
  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 text-center">
    All Forms
  </h1>
</div>


              <Link
                to="/admin/create-form"
                className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow"
              >
                + Create New Form
              </Link>
            </div>

            {/* Forms List */}
            {forms.length === 0 ? (
              <p className="text-slate-600 mt-4">
                No forms created yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                {forms.map((form) => (
                  <div
                    key={form._id}
                    className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                  >
                    <h2 className="text-lg font-semibold text-slate-900">
                      {form.title}
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      {form.description}
                    </p>

                    <p className="text-xs text-slate-500 mt-2">
                      <span className="font-medium">Created:</span>{" "}
                      {new Date(form.createdAt).toLocaleString()}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <Link
                        to={`/admin/forms/${form._id}/submissions`}
                        className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium"
                      >
                        Submissions
                      </Link>

                      <Link
                        to={`/admin/forms/${form._id}/edit`}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(form._id)}
                        className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-medium"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => copyLink(form.formLink)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium"
                      >
                        Copy Link
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <ToastContainer />
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default FormList;
