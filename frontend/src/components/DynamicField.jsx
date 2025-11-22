import React from "react";

const DynamicField = ({ field, value, onChange }) => {

  // Handle input change
  const handleChange = (e) => {
    const val = field.type === "checkbox" ? e.target.checked : e.target.value;
    onChange(field.name, val);
  };

  // COMMON STYLES
  const inputClass =
    "w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-indigo-500 outline-none";

  return (
    <div className="mb-4">
      <label className="block font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500"> *</span>}
      </label>

      {/* TEXT */}
      {field.type === "text" && (
        <input
          type="text"
          className={inputClass}
          required={field.required}
          value={value || ""}
          onChange={handleChange}
        />
      )}

      {/* TEXTAREA */}
      {field.type === "textarea" && (
        <textarea
          className={inputClass}
          required={field.required}
          value={value || ""}
          onChange={handleChange}
        />
      )}

      {/* EMAIL */}
      {field.type === "email" && (
        <input
          type="email"
          className={inputClass}
          required={field.required}
          value={value || ""}
          onChange={handleChange}
        />
      )}

      {/* NUMBER */}
      {field.type === "number" && (
        <input
          type="number"
          min={field.validation?.min}
          max={field.validation?.max}
          className={inputClass}
          required={field.required}
          value={value || ""}
          onChange={handleChange}
        />
      )}

      {/* DATE */}
      {field.type === "date" && (
        <input
          type="date"
          className={inputClass}
          required={field.required}
          value={value || ""}
          onChange={handleChange}
        />
      )}

      {/* CHECKBOX */}
      {field.type === "checkbox" && (
        <input
          type="checkbox"
          checked={value || false}
          onChange={handleChange}
          className="mt-2"
        />
      )}

      {/* RADIO */}
      {field.type === "radio" && (
        <div className="mt-2">
          {field.options?.map((opt, i) => (
            <label key={i} className="flex items-center gap-2 mb-1">
              <input
                type="radio"
                name={field.name}
                value={opt}
                checked={value === opt}
                onChange={handleChange}
              />
              {opt}
            </label>
          ))}
        </div>
      )}

      {/* SELECT */}
      {field.type === "select" && (
        <select
          className={inputClass}
          value={value || ""}
          required={field.required}
          onChange={handleChange}
        >
          <option value="">-- Select --</option>
          {field.options?.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default DynamicField;
