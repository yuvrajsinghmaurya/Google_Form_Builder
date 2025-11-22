const BASE_URL = "https://google-form-builder.onrender.com";

// Submit form response (USER)
export const submitFormResponse = async (formId, responses) => {
  try {
    const res = await fetch(`${BASE_URL}/submissions/${formId}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(responses),
    });

    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
};

// Get submissions for admin
export const getFormSubmissions = async (formId, token) => {
  try {
    const res = await fetch(`${BASE_URL}/submissions/${formId}/all`, {
      headers: {
        authorization: token,
      },
    });

    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error" };
  }
};
