import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
    {
        lead: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        stage: {
            type: String,
            enum: ["proposal", "negotiation", "closed"],
            default: "proposal"
        },

        status: {
            type: String,
            enum: ["open", "won", "lost"],
            default: "open"
        },

        closingData: Date,

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("Deal", dealSchema);