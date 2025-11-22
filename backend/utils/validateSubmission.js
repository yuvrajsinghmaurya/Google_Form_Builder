// utils/validateSubmission.js

export const validateSubmission = (fields, responses) => {
    let errors = [];

    fields.forEach(field => {
        const value = responses[field.name];

        // ===========================
        // 1. Handle CONDITIONAL fields
        // ===========================
        if (field.conditional?.parentField) {
            const parentVal = responses[field.conditional.parentField];

            if (parentVal !== field.conditional.showIfValue) {
                return; // do not validate hidden conditional field
            }
        }

        // ===========================
        // 2. Required Validation
        // ===========================
        if (field.required && (value === undefined || value === "")) {
            errors.push({
                field: field.name,
                message: `${field.label} is required`
            });
            return;
        }

        // If no value (and not required), skip type validations
        if (value === undefined || value === "") return;

        // ===========================
        // 3. Type-based validation
        // ===========================
        switch (field.type) {

            case "email":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    errors.push({
                        field: field.name,
                        message: "Invalid email format"
                    });
                }
                break;

            case "number":
                const num = Number(value);
                if (isNaN(num)) {
                    errors.push({ field: field.name, message: "Must be a number" });
                } else {
                    if (field.validation?.min && num < field.validation.min) {
                        errors.push({
                            field: field.name,
                            message: `Value must be at least ${field.validation.min}`
                        });
                    }
                    if (field.validation?.max && num > field.validation.max) {
                        errors.push({
                            field: field.name,
                            message: `Value must not exceed ${field.validation.max}`
                        });
                    }
                }
                break;

            case "text":
            case "textarea":
                if (field.validation?.min && value.length < field.validation.min) {
                    errors.push({
                        field: field.name,
                        message: `Minimum ${field.validation.min} characters required`
                    });
                }
                if (field.validation?.max && value.length > field.validation.max) {
                    errors.push({
                        field: field.name,
                        message: `Maximum ${field.validation.max} characters allowed`
                    });
                }
                if (field.validation?.regex) {
                    const regex = new RegExp(field.validation.regex);
                    if (!regex.test(value)) {
                        errors.push({
                            field: field.name,
                            message: `Invalid format`
                        });
                    }
                }
                break;

            case "select":
            case "radio":
                if (!field.options.includes(value)) {
                    errors.push({
                        field: field.name,
                        message: `${field.label} must be one of the allowed options`
                    });
                }
                break;

            case "checkbox":
                if (!Array.isArray(value)) {
                    errors.push({
                        field: field.name,
                        message: "Invalid checkbox format"
                    });
                }
                break;
        }
    });

    return errors;
};
