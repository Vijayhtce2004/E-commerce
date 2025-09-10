import { Router } from "express";
import {
  allProductsController,
  createdProductsController,
  grtProductByIdController,
} from "../controllers/productController.js";

const router = Router();

router.post("/create-products", createdProductsController);
router.get("/products", allProductsController);
router.get("/product", grtProductByIdController);

export default router;
