import express from "express";
import authMiddleware, { adminMiddleware } from "../middlewares/authMiddleware.js";
import { getProfile, getAdmin } from "../controllers/userController.js";

const router = express.Router();

router.get("/perfil", authMiddleware, getProfile);

router.get("/admin", authMiddleware, adminMiddleware, getAdmin);

export default router;
