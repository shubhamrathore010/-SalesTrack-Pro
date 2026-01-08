import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import {
    addInteraction,
    getInteractionByLead
}from "../controllers/interaction.controller.js"

const router = express.Router()

router.use(authMiddleware)

router.post("/", addInteraction);
router.get("/", getInteractionByLead)


export default router;