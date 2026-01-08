import jwt from "jsonwebtoken";
import User from "../models/User.js"

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized"});
        }

        const token = authHeader.split(" ")[1];
        const decoded =jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("_id role isActive")

        if (!user || !user.isActive){
            return res.status(401).json({ message: "User not active "})
        }

        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }
}

export default authMiddleware;