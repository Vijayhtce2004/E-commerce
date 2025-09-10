import Cart from "../models/Cart.js";

export const createCartController = async (req, res) => {
  //   const {userId, items } = req.body;
  const { items } = req.body;
  try {
    // let cart = await Cart.findOne({ userId });
    let cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      cart.items.push(...items);
    } else {
      cart = new Cart({ userId: req.user._id, items });
    }

    await cart.save();
    res.status(201).json({
      success: true,
      message: "Product added to the cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error in cart",
    });
  }
};
export const getCartDataLoggedUserController = async (req, res) => {
  //   const { userId } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );

    if (!cart) {
      res.status(401).json({
        success: false,
        message: "Cart data not found",
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error in cart",
    });
  }
};
