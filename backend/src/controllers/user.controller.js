import bcrypt from "bcryptjs"
import User from "../models/User.js"
import { sendEmail } from "../utils/email.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "sales"
    })

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    })



    await sendEmail(
      user.email,
      "Welcome to CRM",
      `Your account has been created.\nRole: ${user.role}\nYou can now log in.`
    );

  } catch (error) {
    res.status(500).json({ message: "Failed to create user" })
  }

}


export const getUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" })
    }
    // const users = await User.find({ isActive: true })
    const users = await User.find()
      .select("_id name email role isActive createdAt")
      .sort({ createdAt: -1 })
    res.json(users);
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch users" })
  }
}



export const updateUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    // Prevent admin disabling themselves
    if (req.params.id === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot change your own status" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user status" });
  }
};

