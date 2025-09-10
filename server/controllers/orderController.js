// import Razorpay from "razorpay";
// import crypto from "crypto";
// import Order from "../models/Order.js";

// const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// export const getRazorpayKey = async (req, res) => {
//   return res.json({
//     key: process.env.RAZORPAY_KEY_ID,
//   });
// };

// export const orderAndPay = async (req, res) => {
//   try {
//     const { totalPrice } = req.body;
//     const options = {
//       amount: Math.round(totalPrice * 100), // 400 x 100 = 40000 // 400
//       currency: "INR",
//     };
//     const order = await instance.orders.create(options);
//     return res.json({
//       success: true,
//       order,
//     });
//   } catch (error) {
//     return res.json({
//       message: "Something worng with payment",
//     });
//   }
// };

// export const createOrderController = async (req, res) => {
//   // const { items, totalPrice, shippingAddress, paymentMethod } = req.body;
//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     items,
//     totalPrice,
//     shippingAddress,
//     paymentMethod,
//   } = req.body;

//   try {
//     if (
//       !razorpay_order_id ||
//       !razorpay_payment_id ||
//       !razorpay_signature ||
//       !items ||
//       !totalPrice ||
//       !shippingAddress ||
//       !paymentMethod
//     ) {
//       return res.json({
//         success: false,
//         message: "All fields are required",
//       });
//     }
//     const generateSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest("hex");

//     if (!generateSignature !== razorpay_signature) {
//       return res.json({
//         success: false,
//         message: "Payment verification failed",
//       });
//     }
//     const order = new Order({
//       userId: req.user._id,
//       items,
//       totalPrice,
//       shippingAddress,
//       paymentMethod,
//       orderId: razorpay_order_id,
//       paymentId: razorpay_payment_id,
//       signatureId: razorpay_signature,
//       paymentStatus: "Paid",
//       status: "confirmed",
//       isPiad: true,
//     });

//     await order.save();
//     res.status(201).json({
//       success: true,
//       message: "Created Order successully",
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server Error in create order",
//     });
//   }
// };

import Razorpay from "razorpay";
import Order from "../models/Order.js";
import crypto from "crypto";
import "dotenv/config";
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const getRazorpayKey = async (req, res) => {
  return res.json({
    key: process.env.RAZORPAY_KEY_ID,
  });
};
export const orderAndPay = async (req, res) => {
  try {
    const { totalPrice } = req.body;
    const options = {
      amount: Math.round(totalPrice * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    console.log("order :", order);

    return res.json({
      success: true,
      order,
    });
  } catch (error) {
    return res.json({
      message: " something wrong with payment",
    });
  }
};
export const createOrderController = async (req, res) => {
  // const { items, totalPrice, shippingAddress, paymentMethod } = req.body;
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    shippingAddress,
    items,
    totalPrice,
    paymentMethod,
  } = req.body;

  try {
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !items ||
      !totalPrice ||
      !shippingAddress ||
      !paymentMethod
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const order = new Order({
      userId: req.user._id,
      items,
      totalPrice,
      shippingAddress,
      paymentMethod,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signatureId: razorpay_signature,
      status: "confirmed",
      paymentStatus: "Paid",
      isPaid: true,
    });

    await order.save();
    return res.json({
      success: true,
      message: "Payment successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error in create order",
    });
  }
};
export const getAllOrderLoggedInUserController = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate(
      "items.productId"
    );
    if (!orders) {
      res.status(401).json({
        success: false,
        message: "order not found",
      });
    }
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error in orders",
      error,
    });
  }
};
export const getOrderByIdLoggedInUserController = async (req, res) => {
  //   const { orderId } = req.body;
  //   console.log("orderId :", orderId);

  try {
    // const order = await Order.findById({ _id: orderId });
    // const order = await Order.findById({ orderId });
    // if (!order) {
    //   res.status(401).json({
    //     success: false,
    //     message: "Order not found",
    //   });
    // }
    const order = await Order.findById(req.params.orderId).populate(
      "items.productId"
    );
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error in orders",
      error,
    });
  }
};

export const deleteOrder = async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await Order.findById({ _id: orderId });
    if (!order) {
      return res.status(400).json({
        success: false,
        message: "Order not found",
      });
    }
    await Order.findOneAndDelete(order._id);
    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error : " + error,
    });
  }
};
