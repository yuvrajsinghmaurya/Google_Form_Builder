import Submission from "../Models/Submission.js";
import Form from "../Models/Form.js";
import { validateSubmission } from "../utils/validateSubmission.js";

// ===============================
// USER: SUBMIT FORM
// ===============================
export const submitForm = async (req, res) => {
    try {
        const { formId } = req.params;
        const responses = req.body;

        // 1. Check form exists
        const form = await Form.findById(formId);
        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Form not found"
            });
        }

        // 2. Validate inputs according to field definitions
        const errors = validateSubmission(form.fields, responses);
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Validation errors",
                errors
            });
        }

        // 3. Save submission
        const submission = new Submission({
            formId,
            responses,
            metadata: {
                ip: req.ip,
                userAgent: req.headers["user-agent"]
            }
        });

        await submission.save();

        return res.status(201).json({
            success: true,
            message: "Form submitted successfully",
            submissionId: submission._id
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error in submitForm"
        });
    }
};

// ===============================
// ADMIN: GET ALL SUBMISSIONS OF A FORM
// ===============================
export const getSubmissionsByForm = async (req, res) => {
    try {
        const { formId } = req.params;

        const submissions = await Submission.find({ formId })
            .sort({ submittedAt: -1 });

        return res.status(200).json({
            success: true,
            submissions
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error in getSubmissionsByForm"
        });
    }
};
