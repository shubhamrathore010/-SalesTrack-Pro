import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import ownershipMiddleware from "../middleware/ownership.middleware.js"
import {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    updateLeadStatus
} from "../controllers/lead.controller.js"

const router = express.Router();

router.use(authMiddleware);

router.post("/", createLead);
router.get("/", getLeads);

router.get("/:id", getLeadById)

router.put("/:id", ownershipMiddleware("Lead"), updateLead);
router.patch("/:id/status", ownershipMiddleware("Lead"), updateLeadStatus)


export default router;