import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import roleMiddleware from "../middleware/role.middleware.js"


import {
    leadByStatus,
    leadBySource,
    leadsPerSalesRep,
    monthlyRevenue,
    conversionRate,
    overdueTasks
} from "../controllers/dashboard.controller.js"


const router = express.Router();


// all dashboard routes are ADMIN only
router.use(authMiddleware, roleMiddleware("admin"));


//  Lead analytics
router.get("/leads/status", leadByStatus)
router.get("/leads/source", leadBySource)
router.get("/leads/per-sales-rep", leadsPerSalesRep)


// Revenue analytics
router.get("/revenue/monthly", monthlyRevenue)
router.get("/conversion-rate", conversionRate)

// Productivity Analytics

router.get("/tasks/overdue", overdueTasks);

export default router;





