import Product from "../models/Product.js";
import { products } from "../products.js";

export const createdProductsController = async (req, res) => {
  try {
    await Product.deleteMany();
    const allProducts = await Product.insertMany(products);
    res.json({
      success: true,
      products: allProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error in created products",
      error,
    });
  }
};
export const allProductsController = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error in all products",
      error,
    });
  }
};
export const grtProductByIdController = async (req, res) => {
  //   const { productId } = req.body;
  const { slug } = req.query;
  try {
    // const product = await Product.findById({ _id: productId });
    const product = await Product.findOne({ slug });
    if (!product) {
      res.status(401).json({
        success: false,
        message: "Product not found",
      });
    }
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error in all products",
      error,
    });
  }
};
