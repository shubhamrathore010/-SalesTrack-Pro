import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            lowercase: true,
            index: true
        },

        phone: String,

        source: {
            type: String,
            enum: ["website", "referral", "ads", "cold-call"],
            default: "website"
        },

        status: {
            type: String,
            enum: ["new", "contacted", "qualified", "won", "lost"],
            default: "new",
            index: true
        },

        expectedValue: {
            type: Number,
            default: 0
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            index: true
        },

        isActive: {
            type: Boolean,
            default: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }

    },
    { timestamps: true }
);


export default mongoose.model("Lead", leadSchema);
