import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import roleMiddleware from "../middleware/role.middleware.js"
import {
    createDeal,
    getDeals,
    closeDeal
}  from "../controllers/deal.controller.js"

const router = express.Router()

router.use(authMiddleware)

router.post("/", createDeal)
router.get("/", roleMiddleware("admin"), getDeals)
router.patch("/:id/close", roleMiddleware("admin"), closeDeal);

export default router; 