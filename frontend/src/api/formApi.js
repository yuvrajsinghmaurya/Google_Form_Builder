const BASE_URL = "https://google-form-builder.onrender.com";

// Create a new form (ADMIN)
export const createForm = async (formData, token) => {
  try {
    const res = await fetch(`${BASE_URL}/forms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(formData),
    });

    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
};

// Get a specific form (ADMIN)
export const getFormById = async (id, token) => {
  try {
    const res = await fetch(`${BASE_URL}/forms/${id}`, {
      headers: {
        authorization: token,
      },
    });

    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
};

// Get all forms created by admin
export const getAllForms = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/forms`, {
      headers: {
        authorization: token,
      },
    });

    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
};

// Public form (user)
export const getPublicForm = async (formId) => {
  try {
    const res = await fetch(`${BASE_URL}/forms/public/${formId}`);
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
};

// Update form (ADMIN)
export const updateForm = async (formId, data, token) => {
  try {
    const res = await fetch(`${BASE_URL}/forms/${formId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
};

// Delete form (ADMIN)
export const deleteForm = async (formId, token) => {
  try {
    const res = await fetch(`${BASE_URL}/forms/${formId}`, {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    });

    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
};


