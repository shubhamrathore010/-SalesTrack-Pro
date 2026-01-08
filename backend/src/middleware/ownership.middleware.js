import mongoose from "mongoose";
import Lead from "../models/Lead.js";

const ownershipMiddleware = (modelName) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id;

      //  Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(resourceId)) {
        return res.status(400).json({ message: "Invalid resource id" });
      }

      //  Admin override (early exit)
      if (req.user.role === "admin") {
        return next();
      }

      let resource;

      if (modelName === "Lead") {
        resource = await Lead.findById(resourceId);
      }

      // Resource existence
      if (!resource || !resource.isActive) {
        return res.status(404).json({ message: "Resource not found" });
      }

      // Ownership check (ObjectId-safe)
      if (
        resource.assignedTo &&
        resource.assignedTo.toString() === req.user.id.toString()

      ) {
        return next();
      }

      //  Explicit deny
      return res.status(403).json({ message: "Access denied" });
    } catch (error) {
      console.error("OWNERSHIP MIDDLEWARE ERROR:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
};

export default ownershipMiddleware;
