import Form from "../Models/Form.js";
import { generateShareLink } from "../utils/generateShareLink.js";

// ==============================
// CREATE FORM  (ADMIN)
// ==============================
export const createForm = async (req, res) => {
    try {
        const { title, description, fields } = req.body;

        if (!title) {
            return res.status(400).json({ success: false, message: "Title is required" });
        }

        const form = new Form({
            title,
            description,
            fields,
            createdBy: req.user._id
        });

        // Generate shareable link
        form.formLink = generateShareLink(form._id);

        await form.save();

        return res.status(201).json({
            success: true,
            message: "Form created successfully",
            form
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error in createForm"
        });
    }
};

// ==============================
// GET ALL FORMS (ADMIN)
// ==============================
export const getAllForms = async (req, res) => {
    try {
        const forms = await Form.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            forms
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching forms"
        });
    }
};

// ==============================
// GET SINGLE FORM (ADMIN)
// ==============================
export const getFormById = async (req, res) => {
    try {
        const { id } = req.params;

        const form = await Form.findById(id);
        if (!form) {
            return res.status(404).json({ success: false, message: "Form not found" });
        }

        return res.status(200).json({
            success: true,
            form
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching form"
        });
    }
};

// ==============================
// UPDATE FORM (ADMIN)
// ==============================
export const updateForm = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, fields } = req.body;

        const form = await Form.findById(id);
        if (!form) {
            return res.status(404).json({ success: false, message: "Form not found" });
        }

        form.title = title || form.title;
        form.description = description || form.description;
        form.fields = fields || form.fields;

        await form.save();

        return res.status(200).json({
            success: true,
            message: "Form updated successfully",
            form
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating form"
        });
    }
};

// ==============================
// DELETE FORM (ADMIN)
// ==============================
export const deleteForm = async (req, res) => {
    try {
        const { id } = req.params;

        const form = await Form.findById(id);
        if (!form) {
            return res.status(404).json({ success: false, message: "Form not found" });
        }

        await form.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Form deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting form"
        });
    }
};

// ==============================
// PUBLIC ROUTE: GET FORM FOR USERS
// ==============================
export const getFormPublic = async (req, res) => {
    try {
        const { id } = req.params;

        const form = await Form.findById(id);
        if (!form) {
            return res.status(404).json({ success: false, message: "Form not found" });
        }

        return res.status(200).json({
            success: true,
            form
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error loading public form"
        });
    }
};
