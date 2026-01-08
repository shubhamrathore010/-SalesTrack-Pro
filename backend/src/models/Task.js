import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        lead: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
            required: true
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        dueDate: {
            type: Date,
            required: true,
            index: true
        },
        status: {
            type: String,
            enum: ["pending", "completed", "missed"],
            default: "pending"
        },

        reminderSent: {
            type: Boolean,
            default: false
         }
    },
    { timestamps: true }
);

export default mongoose.model("Task", taskSchema);