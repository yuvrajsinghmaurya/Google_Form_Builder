import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema({
    label: { type: String, required: true },
    name: { type: String, required: true },  // unique inside a form
    type: {
        type: String,
        enum: [
            "text",
            "textarea",
            "number",
            "email",
            "date",
            "checkbox",
            "radio",
            "select"
        ],
        required: true
    },
    required: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    options: { type: [String], default: [] }, // for select, radio, checkbox

    validation: {
        min: Number,
        max: Number,
        regex: String
    },

    conditional: {
        parentField: String,
        showIfValue: String
    }
});

const FormSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },

    fields: [FieldSchema],

    formLink: { type: String }, // shareable link like /form/:id

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Form", FormSchema);
