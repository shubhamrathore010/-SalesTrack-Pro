import express from "express";
import { login, register, getMe } from "../controllers/auth.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"
import roleMiddleware from "../middleware/role.middleware.js"

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Auth routes are mounted");
});

router.post("/login", login);
router.post("/register", authMiddleware, roleMiddleware("admin"), register);
router.get("/me", authMiddleware, getMe);


export default router;