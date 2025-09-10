import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number },
    listPrice: { type: Number },
    images: [String],
    gender: { type: String },
    category: { type: String },
    brand: { type: String },
    tags: [String],
    isPublished: { type: Boolean, default: false },
    avgRating: { type: Number, default: 0 },
    numSales: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    countStock: { type: Number, default: 0 },
    colors: [String],
    sizes: [String],
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: Number,
        comment: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
