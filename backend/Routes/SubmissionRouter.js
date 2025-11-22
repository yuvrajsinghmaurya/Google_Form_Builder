import express from "express";
import { ensureAuthentication } from "../Middleware/Auth.js";
import { 
    submitForm,
    getSubmissionsByForm 
} from "../Controllers/SubmissionController.js";

const router = express.Router();


// User submits form
router.post("/:formId/submit", submitForm);

// Admin views all submissions of a form
router.get("/:formId/all", ensureAuthentication, getSubmissionsByForm);

export default router;
