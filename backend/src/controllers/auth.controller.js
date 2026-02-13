import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.sendStatus(401);

        req.user = user;
        next();
    } catch (err) {
        return res.sendStatus(403);
    }
};

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

        const accessToken = jwt.sign(
            { id: user._id,  role: user.role},
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        )

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

        user.refreshToken = hashedRefreshToken;
        await user.save();


       res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 15 * 60 * 1000
       });

       res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
       });

       res.json({ user })

    } catch (error) {
        res.status(500).json({ message: "Login failed" })
    }
    
}

export const  refresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401)
        
    let decoded;

try{
     decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
} catch (err) {
    return res.sendStatus(403)
}

    const user = await User.findById(decoded.id)
    if (!user || !user.refreshToken) return res.sendStatus(403)


    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isMatch) return res.sendStatus(403)


    const newAccessToken = jwt.sign(
        { id: user._id, role: user.role },
         process.env.JWT_SECRET,
        { expiresIn: "15m" } 
    );

    const newRefreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d"}
    )

    const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 10);
    user.refreshToken = hashedRefreshToken;
    await user.save();

    res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 15 * 60 * 1000
    });

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite:  "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.json({ message: "Token refreshed" })
}


export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;


    if (!refreshToken) {
       res.clearCookie("accessToken")
       res.clearCookie("refreshToken")

       return res.json({ message: "Logged out" })
    }

    let decoded;

      try{
         decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      } catch (err) {
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        return res.json({ message: "Logged out" })
      }

        await User.findByIdAndUpdate(decoded.id, { refreshToken: null });

        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")

        res.json({ message: "Logged out" })
    }

    


export const getMe = async (req, res) => {
    res.json(req.user);
}