import mongoose from "mongoose";

const interactionSchema = new mongoose.Schema(
    {
     lead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lead",
        required: true
     },

     type: {
        type: String,
        enum: ["call", "email", "meeting"],
        required: true
     },

     notes: {
        type: String,
        required: true
     },

     createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
     }
    },
    { timestamps: true }
)

export default mongoose.model("Interaction", interactionSchema);