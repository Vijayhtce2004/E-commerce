import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        color: { type: String },
        size: { type: String },
      },
    ],
    totalPrice: { type: Number },
    shippingAddress: {
      fullName: String,
      email: String,
      address: String,
      city: String,
      state: String,
      postalCode: String,
    },
    paymentMethod: { type: String },
    status: { type: String, default: "proccessing" },
    // updated fields
    orderId: { type: String },
    paymentId: { type: String },
    signatureId: { type: String },
    paymentStatus: { type: String, default: "Pending" },
    paitAt: {
      type: Date,
      default: Date.now(),
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
