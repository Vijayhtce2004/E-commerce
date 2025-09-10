import { Router } from "express";
import {
  createCartController,
  getCartDataLoggedUserController,
} from "../controllers/cartControllers.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/create-cart", auth, createCartController);
router.get("/get-cart", auth, getCartDataLoggedUserController);

export default router;
