import cron from "node-cron"
import Task from "../models/Task.js"
// User model not required here
import { sendEmail } from "../utils/email.js"


cron.schedule("* * * * *", async () => {
    // Run every hour
    try {
     
        const overdueTasks = await Task.find({
            dueDate: { $lt: new Date() },
            status: "pending",
            reminderSent: false,
        })
        .populate("assignedTo", "email name")
        .populate("lead", "name");


        for (let task of overdueTasks) {
            if (!task.assignedTo?.email) continue;

            await sendEmail(
                task.assignedTo.email,
                "Overdue Follow-up Reminder",
                `Your follow-up for lead "${task.lead.name}" is overdue. Please take action.`
            );

            task.reminderSent = true;
            await task.save();
        }
    } catch (error) {
        console.log("Cron job failed:", error.message);
    }
});