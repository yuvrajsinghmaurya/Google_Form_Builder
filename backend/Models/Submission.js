import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
    formId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Form",
        required: true
    },

    responses: {
        type: Object,   // { fieldName: value }
        required: true
    },

    submittedAt: { type: Date, default: Date.now },

    metadata: {
        ip: String,
        userAgent: String
    }
});

export default mongoose.model("Submission", SubmissionSchema);
