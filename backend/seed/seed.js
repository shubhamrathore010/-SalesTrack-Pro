import mongoose from "mongoose";
import dotenv from "dotenv";

// import User from "../models/User.js";
// import Lead from "../models/Lead.js";
// import Task from "../models/Task.js";
// import Deal from "../models/Deal.js";
// import Interaction from "../models/Interaction.js";
import User from "../src/models/User.js";
import Lead from "../src/models/Lead.js";
import Task from "../src/models/Task.js";
import Deal from "../src/models/Deal.js";
import Interaction from "../src/models/Interaction.js";


dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");

    // 🔥 CLEAN OLD DATA
    await Promise.all([
      User.deleteMany(),
      Lead.deleteMany(),
      Task.deleteMany(),
      Deal.deleteMany(),
      Interaction.deleteMany()
    ]);

    // 👤 USERS
    const admin = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: "$2b$10$6iVAgW0TQqhM4iKWdYDs3exUeeAdJ2BmKwNWZI48tEmtAOPVuxpqO",
      role: "admin"
    });

    const sales = await User.create({
      name: "Sales Rep",
      email: "sales@test.com",
      password: "$2b$10$6iVAgW0TQqhM4iKWdYDs3exUeeAdJ2BmKwNWZI48tEmtAOPVuxpqO",
      role: "sales"
    });

    // 🧲 LEADS
    const leads = await Lead.insertMany([
      {
        name: "John Doe",
        email: "john@example.com",
        source: "website",
        status: "new",
        assignedTo: sales._id
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        source: "referral",
        status: "qualified",
        assignedTo: sales._id
      }
    ]);

    // 📞 INTERACTIONS
    await Interaction.create({
      lead: leads[1]._id,
      type: "call",
      notes: "Discussed pricing",
      createdBy: sales._id
    });

    // ⏰ TASKS
    await Task.create({
      lead: leads[1]._id,
      assignedTo: sales._id,
      dueDate: new Date(Date.now() - 86400000), // overdue
      status: "pending"
    });

    // 💰 DEAL
    await Deal.create({
      lead: leads[1]._id,
      amount: 25000,
      status: "won",
      createdBy: admin._id
    });

    console.log("✅ Seed data inserted");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed", err);
    process.exit(1);
  }
};

seed();
