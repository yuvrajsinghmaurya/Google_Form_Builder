import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DynamicField from "../../components/DynamicField";
import { getPublicForm } from "../../api/formApi";
import { submitFormResponse } from "../../api/submissionApi";
import { handleError, handleSuccess } from "../../utils/utils";
import { ToastContainer } from "react-toastify";

const RenderForm = () => {
  const { id } = useParams(); // formId from URL
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch form details on load
  useEffect(() => {
    const fetchForm = async () => {
      const data = await getPublicForm(id);

      if (!data.success) return handleError("Failed to load form");

      setForm(data.form);
      setLoading(false);
    };

    fetchForm();
  }, [id]);

  const handleChange = (fieldName, value) => {
    setResponses({ ...responses, [fieldName]: value });
  };

  const validateFields = () => {
    for (let field of form.fields) {
      const val = responses[field.name];

      // Required validation
      if (field.required && !val) {
        return `${field.label} is required`;
      }

      // Min/max validation (for number or text length)
      if (field.validation) {
        if (field.type === "number") {
          if (field.validation.min && val < field.validation.min) {
            return `${field.label} must be ≥ ${field.validation.min}`;
          }
          if (field.validation.max && val > field.validation.max) {
            return `${field.label} must be ≤ ${field.validation.max}`;
          }
        }

        if (["text", "textarea"].includes(field.type)) {
          if (field.validation.min && val?.length < field.validation.min) {
            return `${field.label} must be at least ${field.validation.min} characters`;
          }
          if (field.validation.max && val?.length > field.validation.max) {
            return `${field.label} must be less than ${field.validation.max} characters`;
          }
        }

        // Regex validation
        if (field.validation.regex) {
          const regex = new RegExp(field.validation.regex);
          if (!regex.test(val)) {
            return `${field.label} is invalid`;
          }
        }
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMsg = validateFields();
    if (errorMsg) return handleError(errorMsg);

    const result = await submitFormResponse(id, responses);

    if (!result.success) return handleError(result.message);

    handleSuccess("Form submitted successfully!");

    setTimeout(() => navigate("/submit-success"), 1500);
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold text-gray-600">
        Loading form...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-2">
        {form.title}
      </h1>

      <p className="text-gray-700 mb-6">{form.description}</p>

      <form onSubmit={handleSubmit}>
        {form.fields.map((field, index) => (
          <DynamicField
            key={index}
            field={field}
            value={responses[field.name]}
            onChange={handleChange}
          />
        ))}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg mt-4 hover:bg-indigo-700"
        >
          Submit Response
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default RenderForm;
