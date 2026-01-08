import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
    
        if(!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const existingUser = await User.findOne({ email })

        if(existingUser) {
            return res.status(400).json({ message: "User already exitsts" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    } catch (error) {
        res.status(500).json({ message: "User registration failed" })
    }
}


export const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        if( !email || !password) {
            return res.status(400).json({ message: "Email and password required" })
        }

        const user = await User.findOne({ email, isActive: true }).select("+password")

        if(!user) {
            return res.status(401).json({ message: "Invalid creadentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json({ message: "Invalid creadentials"})
        }

        const token = jwt.sign(
            { id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Login failed" })
    }
    
}

export const getMe = async (req, res) => {
    res.json(req.user);
}