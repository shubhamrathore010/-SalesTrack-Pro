import Interaction from "../models/Interaction.js"
import Lead from "../models/Lead.js"
import Task from "../models/Task.js";

export const addInteraction = async (req, res) => {
    try {
        const { lead, type, notes } = req.body;
        console.log("INTERACTION BODY:", req.body);
        console.log("USER:", req.user);

        if (!lead || !type || !notes) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const leadDoc = await Lead.findById(lead)

        if (!leadDoc || !leadDoc.isActive) {
            return res.status(404).json({ message: "Lead not found " })
        }

        const interaction = await Interaction.create({
            lead: req.body.lead,
            type: req.body.type,
            notes: req.body.notes,
            createdBy: req.user.id,
        })

        res.status(201).json(interaction)
    } catch (error) {
        res.status(500).json({ message: "Failed to add interaction" })
    }
    console.log("Interaction body:", req.body);


    const followUpDays = {
        call: 2,
        email: 3,
        meeting: 7,
    };

    const interaction = await Interaction.create({
        ...req.body,
        createdBy: req.user._id,
    });

    const days = followUpDays[interaction.type];

    if (days) {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + days);

        await Task.create({
            title: `Follow-up after ${interaction.type}`,
            lead: interaction.lead,
            assignedTo: req.user._id,
            dueDate,
            status: "pending",
            createdBy: req.user._id,
        });
    }

    res.status(201).json(interaction);
};




export const getInteractionByLead = async (req, res) => {
    console.log("GET INTERACTIONS QUERY:", req.query);
    try {
        const { lead } = req.query

        if (!lead) {
            return res.status(400).json({ message: "Lead id missing" })
        }

        const interaction = await Interaction.find({ lead })
            .populate("createdBy", "name")
            .sort({ createdAt: -1 })

        console.log("FOUND INTERACTIONS:", interaction.length);

        res.json(interaction)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch interactions" })
    }
}


