import { Router } from "express";
import {
  createOrderController,
  deleteOrder,
  getAllOrderLoggedInUserController,
  getOrderByIdLoggedInUserController,
  getRazorpayKey,
  orderAndPay,
} from "../controllers/orderController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/get-razorpay-key", auth, getRazorpayKey);
router.post("/orders-pay", auth, orderAndPay);
router.post("/create-order", auth, createOrderController);
router.get("/get-myorders", auth, getAllOrderLoggedInUserController);
// updated added orderId in params
router.get("/get-order-id/:orderId", auth, getOrderByIdLoggedInUserController);
router.delete("/order-id", auth, deleteOrder);

export default router;
