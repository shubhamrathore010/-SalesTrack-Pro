import Task from "../models/Task.js"
import Lead from "../models/Lead.js"

import User from "../models/User.js";
import { sendEmail } from "../utils/email.js";


export const createTask = async (req, res) => {
    try {
        const { lead, dueDate, assignedTo } = req.body;


        if (!lead || !dueDate) {
            return res.status(400).json({ message: "Lead and due date required " })
        }

        const leadDoc = await Lead.findById(lead)
        if (!leadDoc || !leadDoc.isActive) {
            return res.status(404).json({ message: "Lead not found " })
        }

        let assignedUserId = req.user._id;

        if (req.user.role === "admin" && assignedUserId) {
            assignedUserId = assignedTo
        }

        const task = await Task.create({
            lead,
            dueDate,
            assignedTo: assignedUserId,
            createdBy: req.user.id,
            status: "pending",
        })

        const assignedUser = await User.findById(task.assignedTo);

        if (assignedUser?.email) {
            await sendEmail(
                assignedUser.email,
                "New Follow-up Assigned",
                `You have a new follow-up task for lead "${leadDoc.name}". 
Due on ${new Date(task.dueDate).toDateString()}.`
            );
        }

        res.status(201).json(task)
    } catch (error) {
        res.status(500).json({ message: "Failed to create task" })
    }
}

export const getTaskByLead = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Lead id required" })
        }
        const tasks = await Task.find({ lead: id })
            .populate("assignedTo", "name")
            .sort({ dueDate: 1 })


        res.json(tasks)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks" })
    }
}

export const getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            assignedTo: req.user._id,

        })
            .populate("lead", "name status")
            .sort({ dueDate: 1 })

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks " })
    }
}


export const completedTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }

        if (task.assignedTo.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Access denied" })
        }

        task.status = "completed";
        await task.save()

        res.json(task)
    } catch (error) {
        console.error("COMPLETE TASK ERROR:", error);
        res.status(500).json({ message: "Faild to complete task" })
    }
    console.log("Task complete id:", req.params.id);

}


export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        let task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }

        // Ownership check
        if (task.assignedTo.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Access denied" });
        }

        // Allowed updates only
        if (req.body.status) task.status = req.body.status;
        if (req.body.dueDate) task.dueDate = req.body.dueDate;

        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Failes to update task" })
    }
}
