
import dotenv from "dotenv"
dotenv.config();

import express from "express"
import mongoose  from "mongoose"
import cors from "cors"


// routes 
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import leadRoutes from "./routes/lead.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js"
import interactionRoutes from "./routes/interaction.routes.js";
import taskRoutes from "./routes/task.routes.js"

const app =  express();

// middleware 
app.use(cors());
app.use(express.json());

// import testRoutes from "./routes/test.routes.js"

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leads", leadRoutes)
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/interactions", interactionRoutes);
app.use("/api/tasks", taskRoutes);


import "./cron/followup.cron.js";


app.get("/", (_, res) => res.send("Backend is Running"));

// db + server
const PORT = process.env.PORT || 5000;

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, ()=>
    console.log(`Server running on port ${PORT}`))
    ;
})
.catch((err) => {
    console.error("DB connection faild", err);
    
})