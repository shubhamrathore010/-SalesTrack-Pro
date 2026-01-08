
import express from "express";
import authMiddleware from "../middleware/auth.middleware.js"

import {
    createTask,
    getTaskByLead,
    getMyTasks,
    completedTask,
    updateTask
  
} from "../controllers/task.controller.js"



const router = express.Router();

router.use(authMiddleware)


// Create task 
router.post("/",createTask)

// Get tasks assigned to logged-in user 
router.get("/", getMyTasks)

// Get tasks for a lead 
router.get("/lead/:id", getTaskByLead);

router.patch("/:id/complete", completedTask);


// update task (status, duedata)
router.patch("/:id", updateTask);



export default router;