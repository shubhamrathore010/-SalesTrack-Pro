import Lead from "../models/Lead.js";
import mongoose from "mongoose";

export const createLead = async (req, res) => {
  try {
    const { name, email, phone, source, expectedValue, assignedTo } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Lead name is required" });
    }

    // Prevent duplicate leads by email (optional but smart)
    if (email) {
      const existingLead = await Lead.findOne({ email, isActive: true });
      if (existingLead) {
        return res.status(400).json({ message: "Lead already exists" });
      }
    }

    let owner = assignedTo;

    // Sales rep can only assign to themselves
    if (req.user.role === "sales") {
      owner = req.user._id;
    }

    if (owner && !mongoose.Types.ObjectId.isValid(owner)) {
  return res.status(400).json({ message: "Invalid assignedTo user id" });
}

    const lead = await Lead.create({
      // ...req.body,
      name,
      email,
      phone,
      source,
      expectedValue,
      // assignedTo: owner,
      assignedTo: req.user._id,   // 👈 REQUIRED
      createdBy: req.user._id,
    });

    res.status(201).json(lead);
  } catch (error) {
    console.error("CREATE LEAD ERROR:", error);
    res.status(500).json({ message: "Failed to create lead",
    error: error.message
     });
  }
};
export const getLeads = async (req, res) => {
  try {
    let filter = { isActive: true };

    if (req.user.role === "sales") {
      filter.assignedTo = req.user._id;
    }

    const leads = await Lead.find(filter)
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leads" });
  }
};

export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("assignedTo", "name email");

    if (!lead || !lead.isActive) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lead" });
  }
};

export const updateLead = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "email",
      "phone",
      "source",
      "expectedValue",
      "assignedTo"
    ];

    // const updates = {};
    const { status } = req.body;

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      // updates,
        {status},
      { new: true }
    );

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: "Failed to update lead" });
  }
};
export const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = [
      "new",
      "contacted",
      "qualified",
      "won",
      "lost"
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const lead = await Lead.findById(req.params.id);

    if (!lead || !lead.isActive) {
      return res.status(404).json({ message: "Lead not found" });
    }

    // Prevent reopening closed leads
    if (["won", "lost"].includes(lead.status)) {
      return res.status(400).json({
        message: "Closed leads cannot be updated"
      });
    }

    
    lead.status = status;
    await lead.save();

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};
