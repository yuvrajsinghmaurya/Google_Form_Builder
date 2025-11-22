import express from "express";
import { ensureAuthentication } from "../Middleware/Auth.js";
import { 
    createForm,
    getAllForms,
    getFormById,
    updateForm,
    deleteForm,
    getFormPublic
} from "../Controllers/FormController.js";

const router = express.Router();

// =================== ADMIN ROUTES ===================

// Create a form
router.post("/", ensureAuthentication, createForm);

// Get all forms (admin)
router.get("/", ensureAuthentication, getAllForms);

// Get single form (admin)
router.get("/admin/:id", ensureAuthentication, getFormById);

// Update form (admin)
router.put("/:id", ensureAuthentication, updateForm);

// Delete form (admin)
router.delete("/:id", ensureAuthentication, deleteForm);
router.get("/:id", ensureAuthentication, getFormById);


// =================== PUBLIC ROUTE ===================

// Load form for user by /form/:id link
router.get("/public/:id", getFormPublic);

export default router;
