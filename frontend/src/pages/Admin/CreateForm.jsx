import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldEditor from "../../components/FieldEditor";
import { createForm } from "../../api/formApi";
import { handleError, handleSuccess } from "../../utils/utils";
import { ToastContainer } from "react-toastify";

// Layout Components
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AdminSidebar from "../../components/AdminSidebar";

const CreateForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState([]);

  const addField = (field) => setFields([...fields, field]);
  const removeField = (index) =>
    setFields(fields.filter((_, i) => i !== index));

  const handleSave = async () => {
    if (!title) return handleError("Form title is required");
    if (fields.length === 0)
      return handleError("Please add at least one field.");

    const token = localStorage.getItem("token");

    const response = await createForm({ title, description, fields }, token);

    if (!response.success) return handleError(response.message);

    handleSuccess("Form created successfully!");

    setTimeout(() => navigate("/admin/forms"), 1500);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Layout Wrapper */}
      <div className="min-h-screen bg-slate-100 flex pt-16">

        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 md:ml-64 px-4 md:px-8 py-6">
          <div className="max-w-3xl mx-auto">

            {/* Title Centered */}
            <div className="w-full flex justify-center">
              <h1 className="text-3xl font-bold text-slate-900 mb-6">
                Create New Form
              </h1>
            </div>

            {/* Content Card */}
            <div className="bg-white shadow-md border border-slate-200 rounded-xl p-6">

              {/* Form Title */}
              <label className="block text-slate-700 font-medium">
                Form Title
              </label>
              <input
                type="text"
                className="w-full border border-slate-300 p-2 rounded mt-1 mb-4"
                placeholder="Enter form title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {/* Description */}
              <label className="block text-slate-700 font-medium">
                Description
              </label>
              <textarea
                className="w-full border border-slate-300 p-2 rounded mt-1 mb-4"
                placeholder="Enter form description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              {/* Field Editor */}
              <FieldEditor addField={addField} />

              {/* Added Fields */}
              <h2 className="text-xl font-semibold mt-6 mb-2 text-slate-800">
                Fields Added:
              </h2>

              {fields.length === 0 ? (
                <p className="text-slate-500">No fields added yet.</p>
              ) : (
                <ul className="space-y-2 mt-2">
                  {fields.map((f, i) => (
                    <li
                      key={i}
                      className="border border-slate-200 bg-gray-50 p-3 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{f.label}</p>
                        <p className="text-sm text-slate-600">{f.type}</p>
                      </div>
                      <button
                        onClick={() => removeField(i)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-lg text-sm font-medium shadow"
              >
                Save Form
              </button>
            </div>

            <ToastContainer />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default CreateForm;
