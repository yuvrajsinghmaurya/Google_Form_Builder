import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AdminSidebar from "../../components/AdminSidebar";
import { getFormById, updateForm } from "../../api/formApi";
import { handleSuccess, handleError } from "../../utils/utils";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState(null);

  useEffect(() => {
    loadForm();
    // eslint-disable-next-line
  }, []);

  const loadForm = async () => {
    const res = await getFormById(id, token);
    if (!res.success) return handleError("Failed to load form.");
    setForm(res.form);
  };

  const handleSave = async () => {
    const result = await updateForm(id, form, token);

    if (!result.success) return handleError("Failed to update form");

    handleSuccess("Form updated successfully");
    setTimeout(() => navigate("/admin/forms"), 800);
  };

  if (!form) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 flex bg-slate-100">
        <AdminSidebar />

        <main className="flex-1 md:ml-60 p-6">
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

            <h1 className="text-2xl font-bold mb-4">Edit Form</h1>

            <label className="block mb-3">
              <span className="text-gray-700">Title</span>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full mt-1 px-3 py-2 border rounded"
              />
            </label>

            <label className="block mb-3">
              <span className="text-gray-700">Description</span>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 border rounded"
                rows="4"
              />
            </label>

            {/* You can add field editing here */}
            <button
              onClick={handleSave}
              className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
            >
              Save Changes
            </button>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default EditForm;
