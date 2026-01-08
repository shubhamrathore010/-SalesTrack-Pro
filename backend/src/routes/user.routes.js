import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import {
     createUser,
     getUsers,
     
} from "../controllers/user.controller.js";
import {updateUserStatus} from "../controllers/user.controller.js"

const router = express.Router();

router.use(authMiddleware);

router.post("/", createUser);
router.get("/", getUsers);
router.patch("/:id/status", updateUserStatus);


export default router;