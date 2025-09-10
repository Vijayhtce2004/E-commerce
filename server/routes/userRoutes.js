import express, { Router } from "express";
import {
  allUserController,
  loginController,
  profileController,
  registerController,
} from "../controllers/userControllers.js";
import { auth } from "../middleware/auth.js";
const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/profile", auth, profileController);
router.get("/all-users", auth, allUserController);

export default router;
