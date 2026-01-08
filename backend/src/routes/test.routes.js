import express from "express";
import { sendEmail } from "../utils/email.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/test-email", authMiddleware, async (req, res) => {
  await sendEmail(
    req.user.email,
    "Test Email",
    "If you received this, email is working."
  );

  res.json({ message: "Test email sent" });
});

export default router;
