import React, { useState } from "react";
import { handleError, handleSuccess } from "../utils/utils";
import { ToastContainer } from "react-toastify";

const FieldEditor = ({ addField }) => {
  const [fieldData, setFieldData] = useState({
    label: "",
    name: "",
    type: "text",
    required: false,
    options: [],
    validation: {
      min: "",
      max: "",
      regex: ""
    }
  });

  const [optionInput, setOptionInput] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "required") {
      return setFieldData({ ...fieldData, required: checked });
    }

    if (name === "type") {
      // Reset options when changing type
      let updated = { ...fieldData, type: value };
      if (value !== "select" && value !== "radio" && value !== "checkbox") {
        updated.options = [];
      }
      return setFieldData(updated);
    }

    setFieldData({ ...fieldData, [name]: value });
  };

  const handleValidationChange = (e) => {
    const { name, value } = e.target;
    setFieldData({
      ...fieldData,
      validation: { ...fieldData.validation, [name]: value }
    });
  };

  const addOption = () => {
    if (!optionInput.trim())
      return handleError("Option cannot be empty");

    setFieldData({
      ...fieldData,
      options: [...fieldData.options, optionInput.trim()]
    });

    setOptionInput("");
  };

  const removeOption = (i) => {
    const updated = fieldData.options.filter((_, idx) => idx !== i);
    setFieldData({ ...fieldData, options: updated });
  };

  const handleAddField = () => {
    if (!fieldData.label || !fieldData.name) {
      return handleError("Label and Name are required");
    }

    if (["select", "radio"].includes(fieldData.type) && fieldData.options.length === 0) {
      return handleError("Add at least one option for this field type");
    }

    addField(fieldData);
    handleSuccess("Field added!");

    // Reset form
    setFieldData({
      label: "",
      name: "",
      type: "text",
      required: false,
      options: [],
      validation: { min: "", max: "", regex: "" }
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-4">

      <h2 className="text-xl font-semibold mb-4">Add New Field</h2>

      {/* Label */}
      <label className="block font-medium">Field Label</label>
      <input
        name="label"
        type="text"
        value={fieldData.label}
        onChange={handleChange}
        className="w-full border p-2 rounded mt-1 mb-3"
        placeholder="Enter field label"
      />

      {/* Name */}
      <label className="block font-medium">Field Name</label>
      <input
        name="name"
        type="text"
        value={fieldData.name}
        onChange={handleChange}
        className="w-full border p-2 rounded mt-1 mb-3"
        placeholder="Enter field name (unique)"
      />

      {/* Type */}
      <label className="block font-medium">Field Type</label>
      <select
        name="type"
        value={fieldData.type}
        onChange={handleChange}
        className="w-full border p-2 rounded mt-1 mb-3"
      >
        <option value="text">Text</option>
        <option value="textarea">Textarea</option>
        <option value="email">Email</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
        <option value="checkbox">Checkbox</option>
        <option value="radio">Radio</option>
        <option value="select">Select</option>
      </select>

      {/* Required Checkbox */}
      <div className="flex items-center gap-2 mb-3">
        <input
          type="checkbox"
          name="required"
          checked={fieldData.required}
          onChange={handleChange}
        />
        <label>Required</label>
      </div>

      {/* OPTIONS (only for select/radio) */}
      {(fieldData.type === "select" || fieldData.type === "radio") && (
        <div className="mb-3">
          <label className="font-medium">Options</label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              value={optionInput}
              onChange={(e) => setOptionInput(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Option value"
            />
            <button
              onClick={addOption}
              className="bg-indigo-500 text-white px-4 rounded"
            >
              Add
            </button>
          </div>

          <ul className="mt-2">
            {fieldData.options.map((opt, i) => (
              <li key={i} className="flex justify-between bg-white p-2 rounded my-1">
                {opt}
                <button
                  onClick={() => removeOption(i)}
                  className="text-red-500"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* VALIDATION */}
      <div className="mt-3">
        <h3 className="font-medium">Validation Rules</h3>

        <input
          type="number"
          name="min"
          value={fieldData.validation.min}
          onChange={handleValidationChange}
          className="w-full border p-2 rounded mt-1 mb-2"
          placeholder="Minimum value / length"
        />

        <input
          type="number"
          name="max"
          value={fieldData.validation.max}
          onChange={handleValidationChange}
          className="w-full border p-2 rounded mb-2"
          placeholder="Maximum value / length"
        />

        <input
          type="text"
          name="regex"
          value={fieldData.validation.regex}
          onChange={handleValidationChange}
          className="w-full border p-2 rounded mb-2"
          placeholder="Regex pattern (optional)"
        />
      </div>

      {/* ADD FIELD BUTTON */}
      <button
        onClick={handleAddField}
        className="w-full bg-indigo-600 text-white p-3 rounded-lg mt-4 hover:bg-indigo-700"
      >
        Add Field
      </button>

      <ToastContainer />
    </div>
  );
};

export default FieldEditor;
