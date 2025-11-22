export const generateShareLink = (formId) => {
    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
    return `${FRONTEND_URL}/form/${formId}`;
};
